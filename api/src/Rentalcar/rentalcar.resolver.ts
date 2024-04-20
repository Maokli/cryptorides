import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { RentalCarService } from "./rentalcar.service";
import { Rentalcar } from "./entities/rentalcar.entity";
import { CarFilter } from "./dto/car.filter";
import { Car } from "../car/entities/car.entity";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateRentalcarInput } from "./dto/create-rentalcar.input";
import { JwtModule } from "@nestjs/jwt";

@Resolver(() => Rentalcar)
export class RentalcarResolver {
  constructor(private readonly rentalcarService: RentalCarService) {}

  @Mutation(() => Rentalcar)
  @UseGuards(JwtModule)
  async createRentalcar(
    @Args("input") input: CreateRentalcarInput,
  ): Promise<Rentalcar> {
    return this.rentalcarService.create(input);
  }

  @Query(() => [Rentalcar], { name: "rentalHistoryByCarId" })
  async findRentalHistoryByCarId(
    @Args("carId", { type: () => Int }) carId: number,
  ): Promise<Rentalcar[]> {
    return this.rentalcarService.findRentalHistoryByCarId(carId);
  }

  @Mutation(() => String)
  async deleteRentalcarByCarId(@Args("carId") carId: number): Promise<string> {
    await this.rentalcarService.deleteRentalcarByCarId(carId);
    return `Removed car rentals for the carId ${carId}`;
  }

  @Query(() => [Car])
  @UseGuards(JwtAuthGuard)
  async filteredCars(@Args("filter", { nullable: true }) filter: CarFilter) {
    return await this.rentalcarService.filterCars(filter);
  }

  @Query(() => [Car])
  @UseGuards(JwtAuthGuard)
  async searchCars(@Args("searchInput") searchInput: string): Promise<Car[]> {
    return await this.rentalcarService.searchCars(searchInput);
  }
}
