import { Controller, Get, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { UsersService } from 'src/users/users.service';
import { GameDetails } from 'src/utils/types';
import { HistoryService } from './history.service';

@ApiTags('History')
@Controller('history')
export class HistoryController {

    constructor(private readonly historyService: HistoryService, private userService: UsersService) {}

    @Get('/test')
    @UseGuards(FullyAuthentificatedGuard)
    public async test() {
        const details= {
            winner : await this.userService.getOne(1),
            loser : await this.userService.getOne(2),
            loser_score : 2,
            winner_score : 3,
            duration : 86,
        }
        if (!details.winner || !details.loser)
            throw new NotFoundException();
        await this.historyService.createGameHistory(details);
        return details;
    }
}
