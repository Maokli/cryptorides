import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { RentalCarService } from "./rentalcar.service";
import { Rentalcar } from "./entities/rentalcar.entity";
import { CarFilter } from "./dto/car.filter";
import { Car } from "../car/entities/car.entity";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateRentalcarInput } from "./dto/create-rentalcar.input";
import { JwtModule } from "@nestjs/jwt";
import { rentalRequestInput } from "./dto/rentalRequest.input";
import { rentalRequest } from "./entities/rentalRequest.entity";

@Resolver(() => Rentalcar)
export class RentalcarResolver {
  constructor(private readonly rentalcarService: RentalCarService) { }

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
  ///just for testing
  @Query(() => Boolean)
  async TestAvailibilty(@Args("request") request: rentalRequestInput): Promise<boolean> {
    return await this.rentalcarService.testavailibilityCar(request);
  }

  @Query(() => rentalRequest)
  async validateRentalrequest(@Args("request") request: rentalRequestInput): Promise<rentalRequest> {
    return await this.rentalcarService.validateRentalRequest(request);
  }
  @Query(() => [rentalRequest])
  async getAllRentalsRequests(): Promise<rentalRequest[]> {
    return this.rentalcarService.getAll();
  }
  @Query(() => rentalRequest)
  async getRentalRequests(@Args("requestid") requestid: number): Promise<rentalRequest> {
    return this.rentalcarService.getRentalRequestsById(requestid);
  }


  @Mutation(() => String)
  async updateStatusRentalRequest(@Args("requestid") requestid: number): Promise<string> {
    try {
      await this.rentalcarService.updateRentalRequests(requestid);
      return `Le statut de la demande de location avec l'ID ${requestid} a été mis à jour à "Paid".`;
    } catch (error) {
      throw new Error(`Une erreur est survenue lors de la mise à jour de la demande de location : ${error.message}`);
    }
  }

  
    @Query( ()=> String)
    async payProcess(@Args("request")requestid:number):Promise<String>{
      return this.rentalcarService.pay(requestid);
    }
  


}
