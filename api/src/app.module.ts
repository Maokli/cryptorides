import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './shared/entities/user.entity';
import { Car } from './shared/entities/car.entity';
import { FileAssignment } from './shared/entities/fileAssignment.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RentalcarModule } from './Rentalcar/rentalcar.module';


@Module({
  imports: [ GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    //zid pathhhh
    autoSchemaFile: true,

  }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql',
      synchronize: true,
      entities: ["dist/**/*.entity{.ts,.js}"],
    }),
    SharedModule,
    RentalcarModule  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
