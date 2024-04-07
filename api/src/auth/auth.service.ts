/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/shared/entities/user.entity';
import { JwtService } from '@nestjs/jwt'; 
import * as bcrypt from 'bcrypt';

import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService // Correct capitalization for JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
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

    async login(user: User): Promise<User | any> { // Ensure Promise<any> return type
        return {
            access_token: this.jwtService.sign({ username: user.username, sub: user.id } , {expiresIn : '60s' , secret : process.env.JWT_SECRET}),
            user,
        };
    }

    async signup(loginUserInput: LoginUserInput): Promise<User> { // Ensure Promise<User> return type
        const existingUser = await this.usersService.findOne(loginUserInput.username);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(loginUserInput.password, 10);
        return this.usersService.create({
            username: loginUserInput.username,
            passwordHash: hashedPassword, 
            // Add other properties if necessary
        });
    }
}
