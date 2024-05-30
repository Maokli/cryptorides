/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "src/shared/entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { GetCurrentUserId } from "src/decorators/getCurrentUserId.decorator";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}


  @Query(() => [User], { name: "users" })
  @UseGuards(JwtAuthGuard)
  findAll(@Context() context) {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: "user" })
  @UseGuards(JwtAuthGuard)
  findOne(@Args("email", { type: () => String }) email: string) {
    return this.usersService.findByEmail(email);
  }

  @Query(() => User)
  //@UseGuards(JwtAuthGuard)
  user(@Args('id', { type: () => String }) id: string) {
    return this.usersService.getUserById(id);
  }

  @Mutation(() => User)
  //@UseGuards(JwtAuthGuard)
  async updateUserProfile(
    @Args("Input") updateUserInput: UpdateUserInput,
    @Args('id') userId: number
    //@GetCurrentUserId()  userId: number
  ): Promise<User> {
    //console.log(userId)
    return await this.usersService.update(userId, updateUserInput);
  }
}
