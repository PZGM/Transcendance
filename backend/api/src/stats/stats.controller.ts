import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { CustomRequest } from 'src/utils/types';
import { UsersService } from 'src/users/users.service';
import { Stats } from 'src/typeorm/entities/stats';
import { User } from 'src/typeorm/entities/user';
import { StatsService } from './stats.service';

@ApiTags('stats')
@Controller('stats')
export class StatsController {

    constructor(private readonly userService: UsersService, private readonly statsService: StatsService) {}

    @Get()
    @UseGuards(FullyAuthentificatedGuard)
    public async getStats(@Req() request: CustomRequest) {
        return this.statsService.getStats(request.user.id);
    }

    @Get('with-user')
    @UseGuards(FullyAuthentificatedGuard)
    public async getUserWithStats(@Req() request: CustomRequest) {
        return this.statsService.getUserWithStats(request.user.id);
    }

}
