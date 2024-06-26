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
import { CarWithImages } from "src/shared/dto/get-car-withImage-dto";
import { Image } from "src/shared/dto/image.model";
import { request } from "http";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "src/shared/entities/user.entity";

@Injectable()
export class RentalCarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Rentalcar)
    private readonly rentalcarRepository: Repository<Rentalcar>,

    @InjectRepository(rentalRequest)
    private readonly rentalRequestRepository: Repository<rentalRequest>,

    @InjectRepository(FileAssignment)
    private readonly fileAssignmentRepository: Repository<FileAssignment>,

    private readonly carService: CarService,
    private readonly notificationService: NotificationService,
    private readonly eventEmitter: EventEmitter2
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
      const car = await this.carRepository.findOne({ where: { id: input.carId }, relations: ["owner"] });
      const owner = car.owner;
      const newRentalRequest = await this.createRentalRequest(input, car);

      const createNotificationInput: CreateNotificationInput = {
        owner: owner,
        message: `You have a new rental request for ${car.title}.`,
        rentalRequest: newRentalRequest
      };
      const notification = await this.notificationService.create(createNotificationInput);

      this.eventEmitter.emit('notifications', {
        userId: owner.id,
        notification: {
          id: notification.id,
 
          message: notification.message,
          
          status: notification.status,
          
          rentalRequestId: notification.rentalRequest.id
        }
      });

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
      return [];
    return rentalRequests.map(rentalRequest => this.mapRentalRequestToDto(rentalRequest))
  }

  private async callPaymentEngine(requestid:number): Promise<boolean> {
    const rentalrequestFromDB = await this.rentalRequestRepository.findOne({where: { id: requestid },
      relations: ["car", "car.owner"]
    });

    /*
    const ownerWallet = "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1";
    const renterWallet = "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0";
    
    const car = rentalrequest.car;
  
    const downPayment = car.downPayment;
    const rentalPrice = car.rentalPrice;
  
    const rentalPeriod = Math.floor((rentalrequest.todate.getTime() - rentalrequest.fromdate.getTime()) / (1000 * 60 * 60 * 24));
  
    const response = await fetch('http://127.0.0.1:5000/rent', {
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
        secret: "66687104b6c27da56e1fbacd5636a9e6",
      }),
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  
    if (!response==true) {
      console.error('Error calling payment engine:', response.statusText);
      return false;
    }
    */
    const createNotificationInput: CreateNotificationInput = {
      owner: rentalrequestFromDB.car.owner,
      message: `You received a payment for ${rentalrequestFromDB.car.title}`,
      rentalRequest: rentalrequestFromDB
    }
    const notification = await this.notificationService.create(createNotificationInput);

    this.eventEmitter.emit('notifications', {
      userId: rentalrequestFromDB.car.owner.id,
      notification: {
        id: notification.id,

        message: notification.message,
        
        status: notification.status,
        
        rentalRequestId: notification.rentalRequest.id
      }
    });

    return true;
  }

  async getRentalRequestsById(requestid): Promise<rentalRequestDto> {
    const rentalrequest = await this.rentalRequestRepository.findOne({
      where: { id: requestid },
      relations: ["car"]
    });

    return this.mapRentalRequestToDto(rentalrequest);
  }

  async updateRentalRequests(requestid, input: UpdateRentalRequestInput, user): Promise<void> {
    const rentalrequestFromDb = await this.rentalRequestRepository.findOne({where: {id: requestid}, relations: ["car", "car.owner"]});
    if (rentalrequestFromDb.ownerId == user) {
      rentalrequestFromDb.status = input.newStatus;
      await this.rentalRequestRepository.save(rentalrequestFromDb);
      if(input.newStatus == statusRequest.Approved)
      {
        const notificationOwner = await this.userRepository.findOne({where: {id: rentalrequestFromDb.renterId as unknown as number}})
        const createNotificationInput: CreateNotificationInput = {
          owner: notificationOwner,
          message: `Your request for ${rentalrequestFromDb.car.title} was approved.`,
          rentalRequest: rentalrequestFromDb,
        }
        
        const notification = await this.notificationService.create(createNotificationInput);
    
        this.eventEmitter.emit('notifications', {
          userId: rentalrequestFromDb.car.owner.id,
          notification: {
            id: notification.id,
    
            message: notification.message,
            
            status: notification.status,
            
            rentalRequestId: notification.rentalRequest.id
          }
        });
      }
      else if(input.newStatus == statusRequest.Cancelled)
      {
        const notificationOwner = await this.userRepository.findOne({where: {id: rentalrequestFromDb.renterId as unknown as number}})
        const createNotificationInput: CreateNotificationInput = {
          owner: notificationOwner,
          message: `Your request for ${rentalrequestFromDb.car.title} was cancelled.`,
          rentalRequest: rentalrequestFromDb,
        }

        const notification = await this.notificationService.create(createNotificationInput);
    
        this.eventEmitter.emit('notifications', {
          userId: rentalrequestFromDb.car.owner.id,
          notification: {
            id: notification.id,
    
            message: notification.message,
            
            status: notification.status,
            
            rentalRequestId: notification.rentalRequest.id
          }
        });
      }
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
