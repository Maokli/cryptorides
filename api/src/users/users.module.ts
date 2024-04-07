/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity'; // Import User entity from its correct location

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Provide User entity using TypeOrmModule
    // Other modules if necessary
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
