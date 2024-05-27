import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CarFilter } from "./dto/car.filter";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "../car/entities/car.entity";
import { Between, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { Rentalcar } from "./entities/rentalcar.entity";
import { CreateRentalcarInput } from "./dto/create-rentalcar.input";
import { CarService } from "../car/car.service";
import { rentalRequestInput } from "./dto/rentalRequest.input";
import { rentalRequest } from "./entities/rentalRequest.entity";
import { NotificationService } from "src/notification/notification.service";
import { CreateNotificationInput } from "src/notification/dto/create-notification.input";
import { statusRequest } from "./enum/statusRequest.enum";
import { UpdateRentalRequestInput } from "./dto/updateRentalRequest.input";
import { getRentalRequestInput } from "./dto/getRentalRequest.input";
import { rentalRequestDto } from "./dto/rental-request.dto";
import { FileAssignment } from "src/file-assignment/entities/file-assignment.entity";
import { entityType } from "src/shared/enum/entityType.enum";
import { CarWithImages } from "src/car/dto/get-car-withImage-dto";
import { Image } from "src/car/dto/image.model";
import { request } from "http";

@Injectable()
export class RentalCarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,

    @InjectRepository(Rentalcar)
    private readonly rentalcarRepository: Repository<Rentalcar>,

    @InjectRepository(rentalRequest)
    private readonly rentalRequestRepository: Repository<rentalRequest>,

    @InjectRepository(FileAssignment)
    private readonly fileAssignmentRepository: Repository<FileAssignment>,

    private readonly carService: CarService,
    private readonly notificationService: NotificationService
  ) { }

  async create(input: CreateRentalcarInput): Promise<Rentalcar> {
    try {
      const { carId, reservedfrom, reservedto } = input;
      // Vérifier si la voiture existe
      const car = await this.carService.findOneById(carId);
      if (!car) {
        throw new NotFoundException(`Car with ID ${carId} not found`);
      }
      // Vérifier si la date de début est antérieure à la date de fin
      if (reservedfrom >= reservedto) {
        throw new BadRequestException(
          "The start date must be before the end date",
        );
      }
      // Vérifier si la voiture est déjà réservée pour la période spécifiée
      const existingReservations = await this.rentalcarRepository.find({
        where: {
          car: { id: carId },
          reservedfrom: LessThanOrEqual(reservedto),
          reservedto: MoreThanOrEqual(reservedfrom),
        },
      });
      if (existingReservations.length > 0) {
        throw new ConflictException(
          `Car with ID ${carId} is already paid for the specified period`,
        );
      }
      const rentalcar = this.rentalcarRepository.create({
        reservedfrom,
        reservedto,
        car,
      });
      return this.rentalcarRepository.save(rentalcar);
    } catch (error) {
      throw error;
    }
  }

  async findRentalHistoryByCarId(carId: number): Promise<Rentalcar[]> {
    try {
      // Vérifier si la voiture existe
      const car = await this.carService.findOneById(carId);
      if (!car) {
        throw new NotFoundException(`Car with ID ${carId} not found`);
      }
      // Recherche de l'historique de location pour la voiture spécifiée
      const rentalHistory = await this.rentalcarRepository.find({
        where: { car: { id: carId } },
      });
      if (rentalHistory.length === 0) {
        throw new NotFoundException(
          `No rental history found for car with ID ${carId}`,
        );
      }
      return rentalHistory;
    } catch (error) {
      throw error;
    }
  }
  async deleteRentalcarByCarId(carId: number): Promise<void> {
    try {
      const car = await this.carService.findOneById(carId);
      if (!car) {
        throw new NotFoundException(`Car with ID ${carId} not found`);
      }
      const rentalcar = await this.rentalcarRepository.find({
        where: { car: { id: carId } },
      });
      if (rentalcar.length === 0) {
        throw new NotFoundException(`Car with ID ${carId} is not rented yet`);
      }
      await this.rentalcarRepository.delete({ car: { id: carId } });
    } catch (error) {
      throw error;
    }
  }

  async filterCars(filter: CarFilter): Promise<Car[]> {
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

    // Filtrer les voitures déjà réservées pour la période spécifiée
    if (filter.availabilityFrom && filter.availabilityTo) {
      const reservedCarIds = await this.rentalcarRepository
        .createQueryBuilder("rentalcar")
        .select("DISTINCT rentalcar.carId")
        .where(
          "((:availabilityFrom BETWEEN rentalcar.reservedfrom AND rentalcar.reservedto) OR " +
          "(:availabilityTo BETWEEN rentalcar.reservedfrom AND rentalcar.reservedto) OR " +
          "(rentalcar.reservedfrom BETWEEN :availabilityFrom AND :availabilityTo) OR " +
          "(rentalcar.reservedto BETWEEN :availabilityFrom AND :availabilityTo))",
          {
            availabilityFrom: filter.availabilityFrom,
            availabilityTo: filter.availabilityTo,
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

    return query.getMany();
  }

  async searchCars(searchInput: string): Promise<Car[]> {
    const searchKeywords = searchInput.trim().toLowerCase().split(" ");

    const query = this.carRepository.createQueryBuilder("car");
    let searchQuery = query;

    for (const keyword of searchKeywords) {
      searchQuery = searchQuery
        .orWhere("LOWER(car.brand) LIKE :keyword", { keyword: `%${keyword}%` })
        .orWhere("LOWER(car.color) LIKE :keyword", { keyword: `%${keyword}%` })
        .orWhere("LOWER(car.location) LIKE :keyword", {
          keyword: `%${keyword}%`,
        })
        .orWhere("LOWER(car.title) LIKE :keyword", { keyword: `%${keyword}%` })
        .orWhere("LOWER(car.fuelType) LIKE :keyword", {
          keyword: `%${keyword}%`,
        });
    }

    const results = await searchQuery.getMany();
    return results;
  }

  async testavailibilityCar(input: rentalRequestInput): Promise<boolean> {

    const { carId, availabilityFrom, availabilityTo } = input;

    if (availabilityFrom >= availabilityTo) {
      throw new Error("The start date must be before the end date");
    }
    try {
      // Rechercher les locations qui chevauchent les dates mises par user
      const existingrentals = await this.rentalcarRepository
        .createQueryBuilder('rental')
        .where('(rental.carId = :carId)', { carId })
        .andWhere('(rental.reservedfrom <= :availabilityTo AND rental.reservedto >= :availabilityFrom)', { availabilityFrom, availabilityTo })
        .getCount();

      // Si aucune location ne chevauche les dates spécifiées, la voiture est disponible
      if (existingrentals === 0) {
        return true;
      }

      return false;

    } catch (error) {
      throw error
    }
  }

  async createRentalRequest(input: rentalRequestInput, car: Car): Promise<rentalRequest> {

    const newrentalRequest = new rentalRequest();
    newrentalRequest.fromdate = input.availabilityFrom;
    newrentalRequest.todate = input.availabilityTo;
    newrentalRequest.car = car;
    newrentalRequest.ownerId = input.ownerId;
    newrentalRequest.renterId = input.renterId;
    return await this.rentalRequestRepository.save(newrentalRequest);
  }

  async validateRentalRequest(input: rentalRequestInput): Promise<rentalRequest> {

    let available = await this.testavailibilityCar(input);
    if (available == true) {
      //trouver car
      const car = await this.carRepository.findOne({ where: { id: input.carId } });
      const owner = car.owner;
      const newRentalRequest = await this.createRentalRequest(input, car);
      const createNotificationInput: CreateNotificationInput = {
        car: car
      };
      await this.notificationService.create(createNotificationInput);
      return newRentalRequest;
    }
    else {
      throw new NotFoundException('Car with ID ${input.carId} not Available');
    }

  }

  //to discuss
  async getAll(input: getRentalRequestInput): Promise<rentalRequestDto[]> {
    let rentalRequests;
    if (input.userRole === 'owner') {
      rentalRequests = await this.rentalRequestRepository.find({
        where: {
          ownerId: input.userId
        },
        relations: ["car"]
      });
    } else if (input.userRole === 'renter') {
      rentalRequests = await this.rentalRequestRepository.find({
        where: {
          renterId: input.userId
        },
        relations: ["car"]
      });
    } else {
      throw new Error('Invalid userRole');
    }
    if(!rentalRequests || rentalRequests.length === 0)
      return []

    console.log(rentalRequests)
    return rentalRequests.map(rentalRequest => this.mapRentalRequestToDto(rentalRequest))
  }

  private async callPaymentEngine(requestid:number): Promise<boolean> {
    const rentalrequest = await this.rentalRequestRepository.findOne({where: { id: requestid },
      relations: ["car"]
    });

    const ownerWallet = "0xACa94ef8bD5ffEE41947b4585a84BdA5a3d3DA6E";
    const renterWallet = "0x1dF62f291b2E969fB0849d99D9Ce41e2F137006e";
    
    const car = rentalrequest.car;
  
    const downPayment = car.downPayment;
    const rentalPrice = car.rentalPrice;
  
    const differenceInDays = (rentalrequest.todate.getTime() - rentalrequest.fromdate.getTime()) / (1000 * 60 * 60 * 24);
    const rentalPeriod = Math.floor((rentalrequest.todate.getTime() - rentalrequest.fromdate.getTime()) / (1000 * 60 * 60 * 24));
  
    const response = await fetch('localhost:5000/rental', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        renter: renterWallet,
        owner: ownerWallet,
        rentalPeriod: rentalPeriod,
        downPaymentAmount: downPayment,
        rentAmount: rentalPrice,
      }),
    });
  
    if (!response.ok) {
      console.error('Error calling payment engine:', response.statusText);
      return false;
    }
    
    return true;
  }

  async getRentalRequestsById(requestid): Promise<rentalRequest> {
    const rentalrequest = await this.rentalRequestRepository.findOne({
      where: { id: requestid },
      relations: ["car"]
    });

    return rentalrequest;
  }

  async updateRentalRequests(requestid, input: UpdateRentalRequestInput, user): Promise<void> {
    const rentalrequest = await this.getRentalRequestsById(requestid);
    if (rentalrequest.ownerId == user) {
      rentalrequest.status = input.newStatus;
      await this.rentalRequestRepository.save(rentalrequest);
    }
    else {
      throw new Error("You are not allowed to update the status of this rental request")
    }
    
  }

  async pay(requestid: number): Promise<string> {
    const payment = await this.callPaymentEngine(requestid);
    if (payment) {
      const input: UpdateRentalRequestInput = {
        newStatus: statusRequest.Paid,
      };
      const rentalRequest = await this.getRentalRequestsById(requestid);
      const ownerid = rentalRequest.ownerId;
      await this.updateRentalRequests(requestid, input, ownerid);
      const rentalrequest = await this.getRentalRequestsById(requestid);
      const car = rentalrequest.car
      console.log(car)
      const rentalCarInput: CreateRentalcarInput = {
        reservedfrom: rentalrequest.fromdate,
        reservedto: rentalrequest.todate,
        carId: car.id,
      };
      await this.create(rentalCarInput);
      return 'Payment successful. Rental request is now paid, and car rental and smart contract are created.';
    } else {
      throw new Error('Payment failed. Please try again.');
    }
  }

  private async getCarPictures(carId: number) {
    return await this.fileAssignmentRepository.find({where: {elementId: carId, elementType: entityType.Car}}) ;
  }

  private async mapRentalRequestToDto(rentalRequest: rentalRequest): Promise<rentalRequestDto> {
    const carFileAssignments = await this.getCarPictures(rentalRequest.car.id);
      const images: Image[] = carFileAssignments.map(fa => {
        return {
          url: fa.fileUrl
        }
      })

      const carWithImages: CarWithImages = {
        id: rentalRequest.car.id,
        ownerId: rentalRequest.ownerId as number,
        location: rentalRequest.car.location,
        brand: rentalRequest.car.brand,
        color: rentalRequest.car.color,
        title: rentalRequest.car.title,
        rentalPrice: rentalRequest.car.rentalPrice,
        downPayment: rentalRequest.car.downPayment,
        seatsNumber: rentalRequest.car.seatsNumber,
        fuelType: rentalRequest.car.fuelType,
        images: images
      }

      return {...rentalRequest, car: carWithImages}
  }

}
