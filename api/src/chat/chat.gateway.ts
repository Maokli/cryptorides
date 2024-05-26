/* eslint-disable prettier/prettier */
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { AddMessageDto } from './dto/add-message.dto';
import * as jwt from 'jsonwebtoken';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  private logger = new Logger('ChatGateway');
  private userSocketMap: Map<string, string> = new Map(); // Map to store user ID and socket ID
  private readonly JWT_SECRET = process.env.JWT_SECRET; // Load JWT secret from environment variables
  
  constructor(private userService: UsersService) {} // Inject the UserService

  @SubscribeMessage('chat')
  handleMessage(@MessageBody() payload: AddMessageDto): AddMessageDto {
    this.logger.log(`Message received: ${payload.author} - ${payload.body}`);
    this.server.emit('chat', payload);
    return payload;
  }

  @SubscribeMessage('privateMessage')
  async handlePrivateMessage(@MessageBody() payload: AddMessageDto, @ConnectedSocket() socket: Socket): Promise<void> {
    const { body, recipientId } = payload;

    this.logger.log(`Private message: ${body}, Recipient ID: ${recipientId}`);

    const recipientSocketId = this.userSocketMap.get(recipientId);

    // Extract author's ID from the token
    const token = socket.handshake.headers.authorization?.split(' ')[1];
    if (!token) {
      this.logger.error('No token provided');
      return;
    }

    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as { sub: string };
      const authorId = decoded.sub;

      if (recipientSocketId) {
        try {
          const author = await this.userService.findOneById(parseInt(authorId, 10)); // Fetch author's information from the UserService
          const authorName = author ? author.FamilyName : 'Unknown'; // Use author's username if available, otherwise use "Unknown"
          this.server.to(recipientSocketId).emit('privateMessage', { author: { id: authorId, username: authorName }, body });
          this.logger.log(`Private message sent to ${recipientId} from ${authorId}`);
        } catch (error) {
          this.logger.error(`Error fetching author's information: ${error.message}`);
          this.server.to(recipientSocketId).emit('privateMessage', { author: { id: authorId }, body }); // Send message without username if fetching fails
        }
      } else {
        this.logger.warn(`User with ID ${recipientId} is not connected`);
      }
    } catch (err) {
      this.logger.error('Invalid token');
      socket.disconnect(true); // Disconnect the socket if the token is invalid
    }
  }

  async handleConnection(socket: Socket) {
    const token = socket.handshake.headers.authorization?.split(' ')[1];
    if (!token) {
      this.logger.error('No token provided');
      socket.disconnect(true);
      return;
    }
    try {
      if (!this.JWT_SECRET) {
        this.logger.error('JWT_SECRET is not defined');
        socket.disconnect(true);
        return;
      }

      const decoded = jwt.verify(token, this.JWT_SECRET) as { sub: string };
      this.logger.log(`Decoded token: ${JSON.stringify(decoded)}`);
      const userId = decoded.sub;
      this.userSocketMap.set(userId, socket.id);
      this.logger.log(`Socket connected: ${socket.id} (User ID: ${userId})`);

      // Log current userSocketMap state for debugging
      this.logger.log(`Current userSocketMap: ${JSON.stringify(Array.from(this.userSocketMap.entries()))}`);

    } catch (err) {
      this.logger.error('Invalid token');
      socket.disconnect(true); // Disconnect the socket if the token is invalid
    }
  }

  handleDisconnect(socket: Socket) {
    const userId = Array.from(this.userSocketMap.entries()).find(([, value]) => value === socket.id)?.[0];
    if (userId) {
      this.userSocketMap.delete(userId);
      this.logger.log(`Socket disconnected: ${socket.id} (User ID: ${userId})`);
    } else {
      this.logger.log(`Socket disconnected: ${socket.id}`);
    }

    // Log current userSocketMap state for debugging
    this.logger.log(`Current userSocketMap: ${JSON.stringify(Array.from(this.userSocketMap.entries()))}`);
  }
}
