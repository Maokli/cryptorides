import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayload } from 'jsonwebtoken'; // Adjust this import to match your JWT payload type

export const GetCurrentUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const request = gqlContext.getContext().req;
    console.log('Request:', request); // Add this line
    const user = request.user as JwtPayload; // Type assertion to match your payload type
    
    return user.sub;
  },
);