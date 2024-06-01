import { Controller, Get, Sse, MessageEvent } from "@nestjs/common";
import { AppService } from "./app.service";
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, fromEvent, map } from 'rxjs';

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

  @Sse('/sse')
  async sse(): Promise<Observable<MessageEvent>> {
    return fromEvent(this.eventEmitter, 'sse.event').pipe(
      map((payload) => ({
        data: JSON.stringify(payload),
      })),
    );
  }
}
