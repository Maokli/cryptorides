import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationResolver } from './notification.resolver';
import { Notification } from './entities/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from 'src/car/car.module';
import { Car } from 'src/car/entities/car.entity';
import { User } from 'src/shared/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification,Car, User])], 

  providers: [NotificationResolver, NotificationService],
  exports: [NotificationService],

})
export class NotificationModule {


}


