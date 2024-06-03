/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "src/shared/entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Car } from "src/car/entities/car.entity";
import { GetCurrentUserId } from "src/decorators/getCurrentUserId.decorator";
import { CarWithImages } from "src/shared/dto/get-car-withImage-dto";

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

  @Query(() => [CarWithImages], { name: "LikedCars" })
  @UseGuards(JwtAuthGuard)
  async GetLikedCarsByUserId(@GetCurrentUserId() userId: number) {
    return await this.usersService.getLikedCarsByUserId(userId);
  }

  @Mutation(() => User, { name: "AddLikedCar" })
  @UseGuards(JwtAuthGuard)
  AddLikedCar(@GetCurrentUserId() userId: number, @Args("carId", { type: () => Number }) carId: number) {
    return this.usersService.addLikedCarToUser(userId, carId);
  }

  @Mutation(() => User, { name: "RemoveLikedCar" })
  @UseGuards(JwtAuthGuard)
  RemoveLikedCar(@GetCurrentUserId() userId: number, @Args("carId", { type: () => Number }) carId: number) {
    return this.usersService.removeLikedCarFromUser(userId, carId);
  }

  @Query(() => Boolean,{ name: "LikedState" })
  @UseGuards(JwtAuthGuard)
  LikedState(@GetCurrentUserId() userId: number, @Args("carId", { type: () => Number }) carId: number) {
    return this.usersService.getLikedState(userId, carId);
  }
}
