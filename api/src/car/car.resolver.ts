import { Resolver, Query, Mutation, Args, Int, Context } from "@nestjs/graphql";
import { CarService } from "./car.service";
import { Car } from "./entities/car.entity";
import { CreateCarInput } from "./dto/create-car.input";
import { UpdateCarInput } from "./dto/update-car.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CarFilter } from "src/Rentalcar/dto/car.filter";

@Resolver(() => Car)
export class CarResolver {
  constructor(private readonly carService: CarService) {}

  @Mutation(() => Car)
  @UseGuards(JwtAuthGuard)
  async createCar(
    @Args("createCarInput") createCarInput: CreateCarInput,
  ): Promise<Car> {
    return await this.carService.create(createCarInput);
  }

  @Query(() => [Car], { name: "cars" })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.carService.findAll();
  }
  @Query(() => [Car], { name: "carsById" })
  @UseGuards(JwtAuthGuard)
  async findAllById(@Args("id", { type: () => Int }) id: number) {
    return await this.carService.findAllById(id);
  }

  @Query(() => Car, { name: "car" })
  @UseGuards(JwtAuthGuard)
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.carService.findOne(id);
  }

  @Mutation(() => Car)
  @UseGuards(JwtAuthGuard)
  updateCar(@Args("updateCarInput") updateCarInput: UpdateCarInput) {
    return this.carService.update(updateCarInput.id, updateCarInput);
  }

  @Mutation(() => Car)
  @UseGuards(JwtAuthGuard)
  removeCar(@Args("id", { type: () => Int }) id: number) {
    return this.carService.remove(id);
  }
  @Query(() => [Car]!, { name: "userCars" })
  @UseGuards(JwtAuthGuard)
  async findUserCars(@Context() context){
    const { req } = context;
    const id = await this.carService.idFromRequest(req) ;
    const Cars = await this.carService.findAllCarsById(id); 
    return Cars; 
  }

  @Query(() => [Car])
  @UseGuards(JwtAuthGuard)
  async filteredCars(@Args("filter", { nullable: true }) filter: CarFilter) {
    return await this.carService.filterCars(filter);
  }
}
