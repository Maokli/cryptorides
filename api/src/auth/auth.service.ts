/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { User } from "src/shared/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { SignUpUserInput } from "./dto/sign-up-user";
import { LoginUserInput } from "./dto/login-user.input";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService, // Correct capitalization for JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (valid) {
      // Remove password from the return object
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(LoginUserInput: LoginUserInput): Promise<User | any> {
    const user = await this.validateUser(
      LoginUserInput.email,
      LoginUserInput.password,
    );
    if (!user) {
      throw new BadRequestException("Invalid credentials");
    }
    return {
      access_token: this.jwtService.sign(
        { email: user.email, sub: user.id },
        { expiresIn: "1d", secret: process.env.JWT_SECRET },
      ),
      user,
    };
  }

  async signup(SignUpUserInput: SignUpUserInput): Promise<User> {
    // Ensure Promise<User> return type
    const existingUser = await this.usersService.findByEmail(
      SignUpUserInput.email,
    );
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(SignUpUserInput.password, 10);
    return this.usersService.create({
      email: SignUpUserInput.email,
      password: hashedPassword,
      name: SignUpUserInput.name,
      FamilyName: SignUpUserInput.familyName,
      phoneNumber: SignUpUserInput.phoneNumber,
    });
  }
}
