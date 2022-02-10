import { Body, Controller, HttpException, HttpStatus, Param, Put, Req, Sse, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable, interval, map } from 'rxjs';
import { AuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { CustomRequest } from 'src/utils/types';
import { StatusService } from './status.service';

export interface MessageEvent {
    data: string | object;
    id?: string;
    type?: string;
    retry?: number;
  }

@ApiTags('Status')
@Controller('status')
export class StatusController {
    constructor(private readonly statusService: StatusService) {}
    
    @Sse('users/:id')
    @UseGuards(AuthentificatedGuard)
    public getUserStatus(@Param('id') id: number): Observable<MessageEvent> {
        return this.statusService.getStatusObservable(id);
    }

    @Put('/users/:id')
    // @UseGuards(AuthentificatedGuard)
    public async updateLogin(@Param('id') id: number, @Body() updateStatusRequest: {status: number}) {
        this.statusService.updateStatus(id, updateStatusRequest.status);
        this.statusService.reportActivity(id);
    }


}