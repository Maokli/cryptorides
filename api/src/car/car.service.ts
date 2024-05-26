import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCarInput } from "./dto/create-car.input";
import { UpdateCarInput } from "./dto/update-car.input";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "./entities/car.entity";
import { Brackets, Repository, SelectQueryBuilder } from "typeorm";
import { UsersService } from "src/users/users.service";
import { jwtDecode } from "jwt-decode";
import { Request } from 'express';
import { Rentalcar } from "src/Rentalcar/entities/rentalcar.entity";
import { CarFilter } from "src/Rentalcar/dto/car.filter";
import { FilterOptions } from "./dto/filterOptions";
import { FileAssignment } from "src/file-assignment/entities/file-assignment.entity";
import { entityType } from "src/shared/enum/entityType.enum";
import { CarWithImages } from "./dto/get-car-withImage-dto";
import { fuelType } from "./enum/fuelType.enum";
import { Image } from "./dto/image.model";

@Injectable()
export class CarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
    @InjectRepository(Rentalcar)
    private readonly rentalcarRepository: Repository<Rentalcar>,
    @InjectRepository(FileAssignment)
    private readonly fileAssignmentRepository: Repository<FileAssignment>,
    private readonly usersService: UsersService,
  
  ) {}

  async create(createCarInput: CreateCarInput): Promise<Car> {
    try {
      const { ownerId, ...carData } = createCarInput;
      const owner = await this.usersService.findOneById(ownerId);
      if (!owner) {
        throw new NotFoundException(`Owner with ID ${ownerId} not found`);
      }

      const car = this.carRepository.create({
        ...carData,
        owner,
      });

      return this.carRepository.save(car);
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      return await this.carRepository.find({ where: {}, relations: ["owner"] });
    } catch (error) {
      throw error;
    }
  }



  async findOne(id: number) {
    try {
      const car = await this.carRepository.findOne({
        where: { id },
        relations: ["owner"],
      });
      if (!car) {
        throw new NotFoundException(`Car with ID ${id} not found`);
      }

      return car;
    } catch (error) {
      throw error;
    }
  }
  async findOneById(id: number): Promise<CarWithImages | null> {
    try {
      const car = await this.carRepository.findOneBy({ id });
      const carFileAssignments = await this.getCarPictures(car.id);
      const images: Image[] = carFileAssignments.map(fa => {
        return {
          url: fa.fileUrl
        }
      })

      const carWithImages: CarWithImages = {
        id: car.id,
        location: car.location,
        brand: car.brand,
        color: car.color,
        title: car.title,
        rentalPrice: car.rentalPrice,
        downPayment: car.downPayment,
        seatsNumber: car.seatsNumber,
        fuelType: car.fuelType,
        images: images
      }
      return carWithImages;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async findAllById(id: number): Promise<Car[] | null> {
    try {
      const cars = await this.carRepository.find({
        where: { owner: { id: id } },
        relations: ["owner"]
      });
      console.log(cars) ;
      return cars ;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async idFromRequest(request: Request): Promise <null | number>  {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (!(type === 'Bearer') ){
        return null ; 
    }else{
        const payload = jwtDecode(token) ;
        const id = parseInt(payload.sub) ; 
        return id ; 
    }
  }
  async findAllCarsById(id : number) : Promise< Car[] | null>{
    return this.findAllById(id) ; 
  }


  async update(id: number, updateCarInput: UpdateCarInput) {
    try {
      const carToUpdate = await this.findOne(id);
      if (!carToUpdate) {
        throw new NotFoundException(`Car with ID ${id} not found`);
      }

      await this.carRepository.update(id, updateCarInput);

      const updatedCar = await this.carRepository.findOne({
        where: { id },
        relations: ["owner"],
      });

      return updatedCar;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const carToRemove = await this.carRepository.findOne({
        where: { id },
        relations: ["owner"],
      });
      if (!carToRemove) {
        throw new NotFoundException(`Car with ID ${id} not found`);
      }

      await this.carRepository.delete(id);

      return carToRemove;
    } catch (error) {
      throw error;
    }
  }

  async filterCars(filter: CarFilter): Promise<CarWithImages[]> {
    let query = this.carRepository.createQueryBuilder("car");

    if (filter.minPrice) {
      query = query.andWhere("car.rentalPrice >= :minPrice", {
        minPrice: filter.minPrice,
      });
    }

    if (filter.maxPrice) {
      query = query.andWhere("car.rentalPrice <= :maxPrice", {
        maxPrice: filter.maxPrice,
      });
    }

    if (filter.minDownPayment) {
      query = query.andWhere("car.downPayment >= :minDownPayment", {
        minDownPayment: filter.minDownPayment,
      });
    }

    if (filter.maxDownPayment) {
      query = query.andWhere("car.downPayment <= :maxDownPayment", {
        maxDownPayment: filter.maxDownPayment,
      });
    }

    if(filter.brand) {
      query = query.andWhere("car.brand = :brand", {
        brand: filter.brand,
      });
    }

    if(filter.color) {
      query = query.andWhere("car.color = :color", {
        color: filter.color,
      });
    }

    if(filter.location) {
      query = query.andWhere("car.location = :location", {
        location: filter.location,
      });
    }

    // Filtrer les voitures déjà réservées pour la période spécifiée
    if (filter.availabilityFrom && filter.availabilityTo) {
      this.addSearchByAvailability(filter.availabilityFrom, filter.availabilityTo, query);
    }

    if(filter.search) {
      await this.addSearchToQuery(filter.search, query);
    }
    console.log(query.getQuery());
    const carsWithoutImages = await query.getMany();
    const carsWithImages: CarWithImages[] = [];

    for (let i = 0; i<carsWithoutImages.length; i++) {
      const car = carsWithoutImages[i];
      const carFileAssignments = await this.getCarPictures(car.id);
      const images: Image[] = carFileAssignments.map(fa => {
        return {
          url: fa.fileUrl
        }
      })

      const carWithImages: CarWithImages = {
        id: car.id,
        location: car.location,
        brand: car.brand,
        color: car.color,
        title: car.title,
        rentalPrice: car.rentalPrice,
        downPayment: car.downPayment,
        seatsNumber: car.seatsNumber,
        fuelType: car.fuelType,
        images: images
      }

      carsWithImages.push(carWithImages);
      console.log(carWithImages)

    }

    console.log(carsWithImages)
    // Add images
    return carsWithImages;
  }

  async getFilterOptions(): Promise<FilterOptions> {
    const carsInDb = await this.findAll();

    const filterOptions = new FilterOptions();

    // Fill in with unique existing values for each filter option
    filterOptions.brands = [...new Set(carsInDb.map(c => c.brand))]
    filterOptions.colors = [...new Set(carsInDb.map(c => c.color))]
    filterOptions.locations = [...new Set(carsInDb.map(c => c.location))]
    filterOptions.maxDailyRentalPrice = Math.max(...carsInDb.map(c => c.rentalPrice));
    filterOptions.maxDownPayment = Math.max(...carsInDb.map(c => c.downPayment));

    return filterOptions;
  }

  private addSearchToQuery(searchInput: string, query: SelectQueryBuilder<Car>): void {
    const searchKeywords = searchInput.trim().toLowerCase().split(" ");

    for (const keyword of searchKeywords) {
      query = query.andWhere(new Brackets(qb => {

        qb = qb.orWhere("LOWER(car.brand) LIKE :keyword", { keyword: `%${keyword}%` })
        .orWhere("LOWER(car.color) LIKE :keyword", { keyword: `%${keyword}%` })
        .orWhere("LOWER(car.location) LIKE :keyword", {
          keyword: `%${keyword}%`,
        })
        .orWhere("LOWER(car.title) LIKE :keyword", { keyword: `%${keyword}%` })
        .orWhere("LOWER(car.fuelType) LIKE :keyword", {
          keyword: `%${keyword}%`,
        });
      }))
    }
  }

  private async addSearchByAvailability(availabilityFrom: Date, availabilityTo:Date, query: SelectQueryBuilder<Car>): Promise<void> {
    const reservedCarIds = await this.rentalcarRepository
        .createQueryBuilder("rentalcar")
        .select("DISTINCT rentalcar.carId")
        .where(
          "((:availabilityFrom BETWEEN rentalcar.reservedfrom AND rentalcar.reservedto) OR " +
            "(:availabilityTo BETWEEN rentalcar.reservedfrom AND rentalcar.reservedto) OR " +
            "(rentalcar.reservedfrom BETWEEN :availabilityFrom AND :availabilityTo) OR " +
            "(rentalcar.reservedto BETWEEN :availabilityFrom AND :availabilityTo))",
          {
            availabilityFrom: availabilityFrom,
            availabilityTo: availabilityTo,
          },
        )
        .getRawMany();

      if (reservedCarIds.length > 0) {
        const reservedCarIdList = reservedCarIds.map((item) => item.carId);
        query = query.andWhere("car.id NOT IN (:...reservedCarIdList)", {
          reservedCarIdList,
        });
      }
  }

  private async getCarPictures(carId: number) {
    return await this.fileAssignmentRepository.find({where: {elementId: carId, elementType: entityType.Car}}) ;
  }
}
