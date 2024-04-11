import { Injectable, NotFoundException } from '@nestjs/common';
import { CarFilter } from './dto/car.filter';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../car/entities/car.entity';
import { Repository } from 'typeorm';
import { Rentalcar } from './entities/rentalcar.entity';
import { CreateRentalcarInput } from './dto/create-rentalcar.input';
import { CarService } from '../car/car.service';


@Injectable()
export class RentalCarService {
   
  constructor(
    @InjectRepository(Car)
    private readonly carrepository: Repository<Car>,
    @InjectRepository(Rentalcar)
    private readonly rentalcarrepository : Repository<Rentalcar>,
    private readonly carService : CarService 
    ){}
 
    async create(input: CreateRentalcarInput): Promise<Rentalcar> {
      try {
        const { carId, ...rentalData } = input;
        const car = await this.carService.findOneById(carId);
        if (!car) {
          throw new NotFoundException(`Owner with ID ${carId} not found`);
        }
  
        const rentalcar = this.rentalcarrepository.create({
          ...rentalData,
          car,
        });
  
        return this.rentalcarrepository.save(rentalcar);
      } catch (error) {
        throw error;
      }
    }

  async filterCars(filter: CarFilter): Promise<Car[]>{
    
    let query=this.carrepository.createQueryBuilder('car');
    
      if (filter.minPrice) {
        query = query.andWhere('car.rentalPrice >= :minPrice', { minPrice: filter.minPrice });
      }
  
      if (filter.maxPrice) {
        query = query.andWhere('car.rentalPrice <= :maxPrice', { maxPrice: filter.maxPrice });
      }
  
      if (filter.minDownPayment) {
        query = query.andWhere('car.downPayment >= :minDownPayment', { minDownPayment: filter.minDownPayment });
      }
  
      if (filter.maxDownPayment) {
        query = query.andWhere('car.downPayment <= :maxDownPayment', { maxDownPayment: filter.maxDownPayment });
      }
      
      //on cherche les cars disponibles 
      if(filter.availabilityFrom && filter.availabilityTo){
        const availablecarids=await this.rentalcarrepository.createQueryBuilder("rentalcar")
        .select('Distinct rentalcar.car.id')
        .where(':availabilityFrom NOT BETWEEN rentalcar.reservedfrom AND rentalcar.reservedto',
         { availabilityFrom: filter.availabilityFrom })
        .andWhere(':availabilityTo NOT BETWEEN rentalcar.reservedfrom AND rentalcar.reservedto',
        { availabilityTo: filter.availabilityTo })
        .getRawMany();

        //si il ya des voitures disponibles
        if(availablecarids.length>0){

          const availableCarIdList = availablecarids.map(item => item.id);
          query = query.andWhere('car.id IN (:...availableCarIdList)', { availableCarIdList });     
        }
       else{
          return[];
        }


      }
      return query.getMany();
    }

    async searchCars(searchInput: string): Promise<Car[]> {

      const searchinputlowercase= searchInput.toLowerCase();

      let query= await this.carrepository.createQueryBuilder('car');

      return await query

          .where('LOWER(car.brand) LIKE :searchInput', { searchInput: `%${searchinputlowercase}%` })
          .orWhere('LOWER(car.color) LIKE :searchInput', { searchInput: `%${searchinputlowercase}%` })
          .orWhere('LOWER(car.location) LIKE :searchInput', { searchInput: `%${searchinputlowercase}%` })
          .orWhere('LOWER(car.title) LIKE :searchInput',  { searchInput: `%${searchinputlowercase}%` })
          .getMany();
  }
    
    

}



  

