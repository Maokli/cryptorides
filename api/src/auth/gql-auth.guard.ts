/* eslint-disable prettier/prettier */
import { GqlExecutionContext } from "@nestjs/graphql";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
  constructor() {
    super();
  }
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
       const request = ctx.getContext();
       request.body = ctx.getArgs().loginUserInput;
         return request;
    }
}