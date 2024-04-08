import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { CarModule } from './car/car.module';
import { Car } from './car/entities/car.entity';
import { FileAssignmentModule } from './file-assignment/file-assignment.module';
import { FileAssignment } from './file-assignment/entities/file-assignment.entity';
import { User } from './shared/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql',
      synchronize: true,
      entities: [User, Car, FileAssignment],
    }),
    SharedModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: './schema.gql',
      sortSchema: true,
      driver: ApolloDriver,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CarModule,
    FileAssignmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}