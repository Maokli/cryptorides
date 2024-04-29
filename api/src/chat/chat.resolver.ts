/* eslint-disable prettier/prettier */
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { Message } from './entities/message.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GqlExecutionContext } from '@nestjs/graphql';

@Resolver()
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}

  @Mutation(() => Message)
  @UseGuards(JwtAuthGuard)
  async createMessage(
    @Args('content') content: string,
    @Context() context: any, // Retrieve the context object
  ) {
    // Extract the token from the context
    const token = this.extractTokenFromContext(context);

    // Call the createMessage method of the ChatService and pass the content and token
    return this.chatService.createMessage(content, token);
  }

  private extractTokenFromContext(context: any): string {
    // Get the request object from the context
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    // Extract the token from the request headers
    const token = req.headers.authorization.split(' ')[1]; // Assuming the token is in the 'Authorization' header

    return token;
  }
}
