import { Body, Controller, Get, Param, Put, Sse, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { StatusService } from './status.service';
import { Logger } from '@nestjs/common';

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
    private logger = new Logger("StatusController")

    @Sse('users/:id')
    @UseGuards(FullyAuthentificatedGuard)
    public getUserStatus(@Param('id') id: number): Observable<MessageEvent> {
        //this.logger.log("getUserStatus : users/:id");
        return this.statusService.getStatusObservable(id);
    }

    @Put('/users/:id')
    @UseGuards(FullyAuthentificatedGuard)
    public async updateStatus(@Param('id') id: number, @Body() updateStatusRequest: {status: number}) {
        //this.logger.log("updateStatus : /users/:id");
        this.statusService.updateStatus(id, updateStatusRequest.status);
        this.statusService.reportActivity(id);
        return true;
    }

    @Get('/users/activity/:id')
    @UseGuards(FullyAuthentificatedGuard)
    public async reportActivity(@Param('id') id: number) {
        this.logger.log("reportActivity : /users/activity/:id");
        this.statusService.reportActivity(id);
    }

    @Get('/users/inactivity/:id')
    @UseGuards(FullyAuthentificatedGuard)
    public async reportInactivity(@Param('id') id: number) {
        this.logger.log("reportInactivity : /users/activity/:id");
        this.statusService.reportInactivity(id);
    }


}