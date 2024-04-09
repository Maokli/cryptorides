/* eslint-disable prettier/prettier */
import { Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { LoginResponse } from "./dto/login-response";
import { LoginUserInput } from "./dto/login-user.input";
import { Args } from "@nestjs/graphql";
import { User } from "src/shared/entities/user.entity";
import { SignUpUserInput } from "./dto/sign-up-user";
@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  login(@Args("loginUserInput") loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }

  @Mutation(() => User)
  signup(@Args("SignUpUserInput") SignUpUserInput: SignUpUserInput) {
    return this.authService.signup(SignUpUserInput);
  }
}
