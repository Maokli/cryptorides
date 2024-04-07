/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor() {
        super();
    }
    getRequest(context: GqlExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
       return ctx.getContext().req;
    }
}