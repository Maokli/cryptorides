import { Injectable } from '@nestjs/common';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import{Notification} from './entities/notification.entity'
import { Car } from 'src/car/entities/car.entity';

@Injectable()
export class NotificationService {

 constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    @InjectRepository(Car)
    private readonly carrepository: Repository<Car>,
  ) {}

 
  async create(createNotificationInput: CreateNotificationInput) : Promise<void>
  {
    const { car} = createNotificationInput;
    const message = `Car "${car.title}" is requested for rent`;
    const carWithOwner = await this.carrepository.findOne({ where: { id: car.id }, relations: ['owner'] });
   console.log(carWithOwner);

    const newNotification = new Notification();
    newNotification.owner = carWithOwner.owner;
    console.log(carWithOwner.owner);
    newNotification.message=message;

    await this.notificationRepository.save(newNotification);

  }

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationInput: UpdateNotificationInput) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
