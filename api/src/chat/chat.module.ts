/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
//import { TypeOrmModule } from '@nestjs/typeorm';
//import { ChatResolver } from './chat.resolver';
//import { ChatService } from './chat.service';
//import { Message } from './entities/message.entity'; // Import the Message entity

@Module({
 // imports: [TypeOrmModule.forFeature([Message])], // Import the Message entity into the module
 // providers: [ChatResolver, ChatService], // Add ChatResolver and ChatService as providers
})
export class ChatModule {}
