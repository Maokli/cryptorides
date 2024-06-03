import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import{Notification} from './entities/notification.entity'
import { Car } from 'src/car/entities/car.entity';
import { statusNotification } from './enum/statusNotification.enum';
import { NotificationDto } from './dto/notification.dto';
import { rentalRequest } from 'src/Rentalcar/entities/rentalRequest.entity';

@Injectable()
export class NotificationService {

 constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(Car)
    private readonly carrepository: Repository<Car>,
  ) {}

 
  async create(createNotificationInput: CreateNotificationInput) : Promise<Notification>
  {
    const { owner , message, rentalRequest} = createNotificationInput;

    const newNotification = new Notification();
    newNotification.owner = owner;
    newNotification.message = message;
    newNotification.rentalRequest = rentalRequest;
    newNotification.status = statusNotification.NEW;

    const createdNotification = await this.notificationRepository.save(newNotification);

    return createdNotification;
  }

  async findAllByOwnerId(ownerId: number): Promise<NotificationDto[]> {
    const notificationsFromDb = await this.notificationRepository
      .find({where: {owner: {id: ownerId}}, relations: ["rentalRequest"]});
    return notificationsFromDb
      .map(notification => {
        return {id: notification.id, 
          message: notification.message, 
          status: notification.status,
          rentalRequestId: notification.rentalRequest.id
        }
      })
      .sort((a,b) => {
        if(a.status === statusNotification.NEW && b.status === statusNotification.NEW)
          return 0;

        // New notifs should appear fitst
        if(a.status === statusNotification.NEW)
          return -1;

        return 1;
      })
  }

  async update(updateNotificationInput: UpdateNotificationInput, userId: number):Promise<NotificationDto[]>{
    const { ids } = updateNotificationInput;
    const updatedNotifications: NotificationDto[] = [];

    for (const id of ids) {
      const notification = await this.notificationRepository.findOne({
        where: { id: id, owner: {id: userId} },
        relations: ["rentalRequest"]
      });
      if (!notification) {
        throw new NotFoundException(`Notification with ID ${id} not found`);
      }

      notification.status = statusNotification.SEEN;
      await this.notificationRepository.save(notification);
      
      updatedNotifications.push({
        id: notification.id,
        message: notification.message,
        status: notification.status,
        rentalRequestId: notification.rentalRequest.id
      });
    }

    return updatedNotifications

  }
}

