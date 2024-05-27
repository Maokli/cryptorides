/* eslint-disable prettier/prettier */
/*
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { Message } from './entities/message.entity';
import { JwtService } from '@nestjs/jwt';
//import { User } from 'src/shared/entities/user.entity'; // Import the User entity

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly jwtService: JwtService,
  ) {}
/*
  async createMessage(content: string, token: string): Promise<Message> {
    const  userId = this.getUserIdFromToken(token);

    const message = new Message();
    message.content = content;
    message.author  = userId; // Assign the user ID as the sender ID
    message.createdAt = new Date(); // Add timestamp

    return this.messageRepository.save(message);
  }

  async getAllMessages(): Promise<Message[]> {
    return await this.messageRepository.find({ relations: ['sender', 'receiver'] });
  }

  private getUserIdFromToken(token: string): string {
    const decodedToken = this.jwtService.decode(token);
    const userId = decodedToken.sub; // Assuming your token includes the user ID as 'sub'
    return userId;
  }
}*/