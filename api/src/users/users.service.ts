/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/create-user.input";
import { User } from "src/shared/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Car } from "src/car/entities/car.entity";
import { CarWithImages } from "src/shared/dto/get-car-withImage-dto";
import { CarService } from '../car/car.service';
import { Image } from "../shared/dto/image.model";
import { FileAssignment } from "src/file-assignment/entities/file-assignment.entity";
import { entityType } from "src/shared/enum/entityType.enum";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(FileAssignment)
    private readonly fileAssignmentRepository: Repository<FileAssignment>,
    @InjectRepository(Car)
    private readonly carRepository: Repository<Car>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { name, FamilyName, email, phoneNumber, password } = createUserInput;

    const newUser = this.userRepository.create({
      name,
      FamilyName,
      email,
      phoneNumber,
      passwordHash: password,
    });

    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User | null> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
 
  async getNameById(id: number): Promise<string | null> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      return user.name;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getLikedCarsByUserId(id: number): Promise<CarWithImages[] | null> {
    try {
      const user = await this.userRepository.findOne({where:{ id },relations: ["carsLikedByUser", "carsLikedByUser.owner"]});
      if (!user) {
        throw new Error("User not found");
      }
      user.carsLikedByUser = user.carsLikedByUser || [];
      const carsWithoutImages = user.carsLikedByUser ; 
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
          images: images,
          ownerId: car.owner.id
        }
  
        carsWithImages.push(carWithImages);
      }
      return carsWithImages;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async addLikedCarToUser(userId: number, carId: number): Promise<Car[] | null> {
    try {
      const user = await this.userRepository.findOne({where: { id: userId },relations: ["carsLikedByUser"]});
      const car = await this.carRepository.findOne({where :  { id: carId },relations: ["likedByUsers"]});
  
      if (!user) {
        console.error(`User with id ${userId} not found`);
        return null;
      }
  
      if (!car) {
        console.error(`Car with id ${carId} not found`);
        return null;
      }
  
      user.carsLikedByUser = user.carsLikedByUser || [];
      car.likedByUsers = car.likedByUsers || [];
  
      user.carsLikedByUser.push(car);
      car.likedByUsers.push(user);
      
      await this.userRepository.save(user);
  
      await this.carRepository.save(car);
      
      return user.carsLikedByUser;
    } catch (error) {
      console.error('Error in addLikedCarToUser:', error);
      return null;
    }
  }

  async removeLikedCarFromUser(userId: number, carId: number): Promise<Car[] | null> {
    try {
      const user = await this.userRepository.findOne({where: { id: userId },relations: ["carsLikedByUser"]});
      const car = await this.carRepository.findOne({where :  { id: carId },relations: ["likedByUsers"]});

      try {
        if (!user || !car) {
          throw new Error("User or car not found");
        }
      } catch (error) {console.error(error); return null;}

      user.carsLikedByUser = user.carsLikedByUser || [];
      car.likedByUsers = car.likedByUsers || [];

      user.carsLikedByUser = user.carsLikedByUser.filter((car) => car.id !== carId);
      car.likedByUsers = car.likedByUsers.filter((user) => user.id !== userId);

      await this.userRepository.save(user);

      await this.carRepository.save(car);
      
      return user.carsLikedByUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getLikedState(userId: number, carId: number): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({where: { id: userId },relations: ["carsLikedByUser"]});

      if (!user) {
        console.error("User not found");
        return false;
      }

      user.carsLikedByUser = user.carsLikedByUser || [];

      return user.carsLikedByUser.some((car) => car.id === carId);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  private async getCarPictures(carId: number) {
    return await this.fileAssignmentRepository.find({where: {elementId: carId, elementType: entityType.Car}}) ;
  }
 

  /*** /
  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    const updatedUser = Object.assign(user, updateUserInput);
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    await this.userRepository.remove(user);
  }
  /** */
}
