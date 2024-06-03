import { Controller, Get, Sse, MessageEvent, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, filter, fromEvent, map } from 'rxjs';
import { GetCurrentUserId } from "./decorators/getCurrentUserId.decorator";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('/sse/notifications')
  async sseNotifications(): Promise<Observable<MessageEvent>> {
    return fromEvent(this.eventEmitter, 'notifications').pipe(
      filter((payload: any) => {
        console.log(payload);
        return true;
      }),
      map((payload: any) => ({
        data: JSON.stringify(payload),
      })),
    );
  }
}
