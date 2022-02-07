import { Controller, Sse } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';
import { StatusService } from './status.service';

export interface MessageEvent {
    data: string | object;
    id?: string;
    type?: string;
    retry?: number;
  }

@Controller('status')
export class StatusController {
    constructor(private readonly userService: StatusService) {}

    @Sse('/user')
    sse(): Observable<MessageEvent> {
        return interval(2000).pipe(map((_) => ({ data: { status: Math.floor(Math.random() * 4) } })));
    }
}

