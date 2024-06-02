import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NotificationService } from './notification.service';
import { Notification } from './entities/notification.entity';
import { CreateNotificationInput } from './dto/create-notification.input';
import { UpdateNotificationInput } from './dto/update-notification.input';
import { GetCurrentUserId } from 'src/decorators/getCurrentUserId.decorator';
import { NotificationDto } from './dto/notification.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}
  
  @UseGuards(JwtAuthGuard)
  @Query(() => [NotificationDto], { name: 'notification' })
  async findAllByOwnerId(@GetCurrentUserId() ownerId: number) {
    return await this.notificationService.findAllByOwnerId(ownerId);
  }
 

  @UseGuards(JwtAuthGuard)
  @Mutation(() => String)
  async updateNotification(@Args('updateNotificationInput') updateNotificationInput: UpdateNotificationInput, @GetCurrentUserId() userId): Promise<NotificationDto[]> {
    return await this.notificationService.update(updateNotificationInput, userId);
  }
  


}
