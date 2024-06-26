/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SharedModule } from "./shared/shared.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarModule } from "./car/car.module";
import { GraphQLModule } from "@nestjs/graphql";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ConfigModule } from "@nestjs/config";
import { FileAssignmentModule } from "./file-assignment/file-assignment.module";
import { FileAssignmentController } from "./file-assignment/file-assignment.controller";
import { RentalcarModule } from "./Rentalcar/rentalcar.module";
import { ChatGateway } from './chat/chat.gateway';
import { NotificationModule } from './notification/notification.module';
import { EventEmitterModule } from "@nestjs/event-emitter";
import { User } from "./shared/entities/user.entity";
import { AuthGuard } from "@nestjs/passport";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: "db/sql",
      synchronize: true, // Sync entities with the database schema
      entities: [__dirname + "/**/*.entity{.ts,.js}"], // Look for all entities
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: "./schema.gql",
      sortSchema: true,
      driver: ApolloDriver,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    SharedModule,
    RentalcarModule,
    UsersModule,
    CarModule,
    FileAssignmentModule,
    AuthModule,
    NotificationModule,
  ],
  controllers: [AppController, FileAssignmentController],
  providers: [AppService , ChatGateway ],
})
export class AppModule {}