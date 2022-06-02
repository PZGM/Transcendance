import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { CustomRequest } from 'src/utils/types';
import { UsersService } from 'src/users/users.service';
import { StatsService } from './stats.service';
import { Logger } from '@nestjs/common';

@ApiTags('stats')
@Controller('stats')
export class StatsController {

    constructor(private readonly userService: UsersService, private readonly statsService: StatsService) {}
	private logger = new Logger("StatsController")

    @Get()
    @UseGuards(FullyAuthentificatedGuard)
    public async getStats(@Req() request: CustomRequest) {
        this.logger.log("getStats : ");
        return this.statsService.getStats(request.user.id);
    }

    @Get('with-user')
    @UseGuards(FullyAuthentificatedGuard)
    public async getUserWithStats(@Req() request: CustomRequest) {
        this.logger.log("getUsersWithStats : with-user");
        return this.statsService.getUserWithStats(request.user.id);
    }

}
