/* eslint-disable prettier/prettier */
import { Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './gql-auth.guard';
import { LoginUserInput } from './dto/login-user.input';
import { Args, Context } from '@nestjs/graphql';
import { User } from 'src/shared/entities/user.entity';
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput, @Context() context) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  signup(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.signup(loginUserInput);
  }
}
