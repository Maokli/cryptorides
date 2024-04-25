/* eslint-disable prettier/prettier */
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";

import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly clients: Map<string, Socket> = new Map();

  @WebSocketServer() io: Server;

  afterInit() {
    console.log("Chat gateway initialized");
  }

  handleConnection(client: Socket ) {
    console.log(`Client id: ${client.id} connected`);
    this.clients.set(client.id, client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client id: ${client.id} disconnected`);
    this.clients.delete(client.id);
  }

  @SubscribeMessage("chat")
  handleChat(client: Socket, message: any) {
    const senderId = client.id;
    const { recipientId, text } = message;

    if (recipientId && this.clients.has(recipientId)) {
      const recipient = this.clients.get(recipientId);
      recipient.emit("chat", { senderId, text });
    } else {
      console.warn(`Recipient ${recipientId} not found or not connected`);
    }
  }

  broadcastMessage(message: any): void {
    this.io.emit("chat", message);
  }
}
