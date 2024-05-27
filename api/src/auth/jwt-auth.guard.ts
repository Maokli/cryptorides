/* eslint-disable prettier/prettier */

import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor() {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    
    const authHeader = request.headers['authorization'] as string;
    if (!authHeader) {
      throw new UnauthorizedException();
    }

    const token = authHeader.split(' ')[1];
  
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const decodedToken = jwt.verify(token,process.env.JWT_SECRET)as { userId: number };
  
      request['user'] = decodedToken;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
