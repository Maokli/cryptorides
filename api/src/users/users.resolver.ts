import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "src/shared/entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  /**
   *
   * Not recommended to use !!!
   * Causes problems with next requests
   * Use signup instead
   */
  @Mutation(() => User)
  createUser(@Args("createUserInput") createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

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
  /*@Query(() => User, { name: "userProfile" })
  @UseGuards(JwtAuthGuard)
  async userProfile(@Context() context) {
    const userEmail = context.user.email; // Assuming we have the email stored in the user context
    return this.usersService.findByEmail(userEmail);
  }*/
  @Query(() => User, { name: "userProfile" })
  @UseGuards(JwtAuthGuard)
  async userProfile(@Args('id') id: number) {
    return this.usersService.findOneById(id);
  }
  @Mutation(() => User, { name: "updateUserProfile" })
  @UseGuards(JwtAuthGuard)
  async updateUserProfile(
    @Args('id') id: number,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }
}
