import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { Notification } from './entities/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from 'src/car/car.module';
import { Car } from 'src/car/entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification,Car])], 

  providers: [NotificationResolver, NotificationService],
  exports: [NotificationService],

})
export class NotificationModule {


}


