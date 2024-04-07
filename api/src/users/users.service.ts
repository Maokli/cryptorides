/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from 'src/shared/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { username, passwordHash } = createUserInput; // Destructure username and passwordHash from input
  
    const newUser = this.userRepository.create({ // Create a new User entity object with the required fields
      username,
      passwordHash,
      // Add other necessary fields if any
    });
  
    return await this.userRepository.save(newUser); // Save the new user entity to the database
  }
  

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { username } });
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
