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

@Injectable()
export class RentalCarService {
  constructor(
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,

    @InjectRepository(Rentalcar)
    private readonly rentalcarRepository: Repository<Rentalcar>,

    @InjectRepository(rentalRequest)
    private readonly rentalRequestRepository: Repository<rentalRequest>,

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
          `Car with ID ${carId} is already reserved for the specified period`,
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
    console.log(car);
    newrentalRequest.ownerId = input.ownerId;

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



  async getAll(): Promise<rentalRequest[]> {
    return this.rentalRequestRepository.find({
      relations: ["car"]
    });
  }


  private async callPaymentEngine(): Promise<boolean> {
    return true;
  }



  async getRentalRequestsById(requestid): Promise<rentalRequest> {
    const rentalrequest = await this.rentalRequestRepository.findOne({
      where: { id: requestid },
      relations: ["car"]
    });

    return rentalrequest;
  }



  async updateRentalRequests(requestid,input:UpdateRentalRequestInput): Promise<void> {
    const rentalrequest = await this.getRentalRequestsById(requestid);
    rentalrequest.status = input.newStatus;
    await this.rentalRequestRepository.save(rentalrequest);

  }

  async pay(requestid: number): Promise<string> {
    const payment = await this.callPaymentEngine();

    if (payment) {

      const input: UpdateRentalRequestInput = {
        newStatus: statusRequest.Paid,
    };

      await this.updateRentalRequests(requestid,input);
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

}
