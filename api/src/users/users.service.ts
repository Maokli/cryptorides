/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { User } from "src/shared/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const { name, FamilyName, email, phoneNumber, password } = createUserInput;

    const newUser = this.userRepository.create({
      name,
      FamilyName,
      email,
      phoneNumber,
      passwordHash: password,
      WalletID:null
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
 
  async GetNameById(id: number): Promise<string | null> {
    try {
      const user = await this.userRepository.findOneBy({ id });
      return user.name;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async getUserById(id: string): Promise< User| null>  {
    const userId = Number(id);  // Convert the string ID to a number
  if (isNaN(userId)) {
    return null;  // Return null if the conversion failed
  }
  try{
    return this.userRepository.findOne({ where: { id: userId } });
  }
  catch (error) {
    console.error(error);
    return null;
  }
  }

  
  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const userId = Number(id);  // Convert the string ID to a number
  if (isNaN(userId)) {
    return null;  // Return null if the conversion failed
  }
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    const updatedUser = Object.assign(user, updateUserInput);
    return await this.userRepository.save(updatedUser);
  }
  /*** /
  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    await this.userRepository.remove(user);
  }
  /** */
}
