import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { Notification } from './entities/notification.entity';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}


  async createNotification( createNotificationInput: CreateNotificationInput):Promise<void> {
    return this.notificationService.create(createNotificationInput);
  }
  
  @Query(() => [Notification], { name: 'notification' })
  findAll() {
    return this.notificationService.findAll();
  }

 
  @Mutation(() => String)
  async updateNotification(@Args('updateNotificationInput') updateNotificationInput: UpdateNotificationInput): Promise<string> {
    await this.notificationService.update(updateNotificationInput);
    return "Success: All Notifications Status are now seen";
  }
  


}
