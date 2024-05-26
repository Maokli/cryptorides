import { Resolver, Query, Mutation, Args, Int, Context } from "@nestjs/graphql";
import { CarService } from "./car.service";
import { Car } from "./entities/car.entity";
import { CreateCarInput } from "./dto/create-car.input";
import { UpdateCarInput } from "./dto/update-car.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CarFilter } from "src/Rentalcar/dto/car.filter";
import { FilterOptions } from "./dto/filterOptions";
import { CarWithImages } from "./dto/get-car-withImage-dto";
import { UserIdFromToken } from "src/helpers/token.helpers";

@Resolver(() => Car)
export class CarResolver {
  constructor(
    private readonly carService: CarService , 
  ) {}

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
    return await this.carService.findAllByOwnerId(id);
  }
  @Query(() => CarWithImages, { name: "car" })
  @UseGuards(JwtAuthGuard)
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.carService.findOneById(id);
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
  @Query(() => [CarWithImages]!, { name: "userCars" })
  @UseGuards(JwtAuthGuard)
  async findUserCars(@Context() context){
    const { req } = context;
    const id = await UserIdFromToken(req.headers['authorization']) ;
    const Cars = await this.carService.findAllByOwnerId(id); 
    return Cars; 
  }

  @Query(() => [CarWithImages])
  @UseGuards(JwtAuthGuard)
  async filteredCars(@Args("filter", { nullable: true }) filter: CarFilter) {
    return await this.carService.filterCars(filter);
  }

  @Query(() => FilterOptions, {name: "availableFilters"})
  @UseGuards(JwtAuthGuard)
  async getAvailableFilterOptions() {
    return await this.carService.getFilterOptions();
  }
}
