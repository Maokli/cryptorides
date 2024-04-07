import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './shared/entities/user.entity';
import { Car } from './shared/entities/car.entity';
import { FileAssignment } from './shared/entities/fileAssignment.entity';
import { CarsModule } from './cars/cars.module';
import { FileAssignementService } from './file-assignement/file-assignement.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql',
      synchronize: true,
      entities: [User, Car, FileAssignment],
    }),
    SharedModule,
    CarsModule
  ],
  controllers: [AppController],
  providers: [AppService, FileAssignementService],
})
export class AppModule {}
