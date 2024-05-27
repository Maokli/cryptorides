import { Resolver, Query, Mutation, Args, Int, Context } from "@nestjs/graphql";
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
import { UpdateRentalRequestInput } from "./dto/updateRentalRequest.input";
import { getRentalRequestInput } from "./dto/getRentalRequest.input";
import { rentalRequestDto } from "./dto/rental-request.dto";

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
  @UseGuards(JwtAuthGuard)
  async validateRentalrequest(@Args("request") request: rentalRequestInput): Promise<rentalRequest> {
    return await this.rentalcarService.validateRentalRequest(request);
  }
  @Query(() => [rentalRequestDto])
  async getAllRentalsRequests(@Args("getRentalRequestInput") getRentalRequest: getRentalRequestInput): Promise<rentalRequestDto[]> {
    return this.rentalcarService.getAll(getRentalRequest);
  }
  @Query(() => rentalRequest)
  async getRentalRequests(@Args("requestid") requestid: number): Promise<rentalRequest> {
    return this.rentalcarService.getRentalRequestsById(requestid);
  }


  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async updateStatusRentalRequest(@Args("requestid") requestid: number, @Args("input") input: UpdateRentalRequestInput,
    @Context() context: any,
  ): Promise<string> {
    try {
      const userId = context.req.user.userId;
      console.log(userId)
      await this.rentalcarService.updateRentalRequests(requestid, input, userId);
      return `Le statut de la demande de location avec l'ID ${requestid} a été mis à jour à ${input.newStatus}`;
    } catch (error) {
      throw new Error(`Une erreur est survenue lors de la mise à jour de la demande de location : ${error.message}`);
    }
  }


  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async payProcess(@Args("request") requestid: number): Promise<String> {
    return this.rentalcarService.pay(requestid);
  }



}
