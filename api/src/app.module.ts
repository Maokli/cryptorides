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
    SharedModule,
    UsersModule,
    CarModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}