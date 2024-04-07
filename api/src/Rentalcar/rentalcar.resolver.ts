import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RentalCarService } from './rentalcar.service';
import { Rentalcar } from './entities/rentalcar.entity';
import { CarFilter } from './car.filter';
import { Car } from '../shared/entities/car.entity';

@Resolver(() => Rentalcar)
export class RentalcarResolver {


  constructor(private readonly rentalcarService: RentalCarService) {}

  
  
  @Query( ()=> [Car] )
  async filteredCars(@Args('filter', { nullable: true }) filter: CarFilter){

    
       return await this.rentalcarService.filterCars(filter);
 }

 @Query(()=> [Car])
 async searchCars(@Args('searchInput') searchInput: string,
 ): Promise<Car[]> {
     return await this.rentalcarService.searchCars(searchInput);
 }
 

  
 
  
}
