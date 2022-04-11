import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { GameDto } from 'src/dto/game.dto';
import { UsersService } from 'src/users/users.service';
import { CustomRequest, GameDetails } from 'src/utils/types';
import { HistoryService } from './history.service';

@ApiTags('History')
@Controller('history')
export class HistoryController {

    constructor(private readonly historyService: HistoryService, private userService: UsersService) {}

    @Get()
    @UseGuards(FullyAuthentificatedGuard)
    public async getHistory(@Req() request: CustomRequest) {
        const hist = await this.historyService.getHistory(request.user.id);
        let ret: GameDto[] = [];
        hist.forEach((game) => {
            ret.push(new GameDto(game));
        })
        return ret;
    }

    @Put('/new')
    @UseGuards(FullyAuthentificatedGuard)
    public async newGame(@Body() newGameRequest: GameDetails) {
        await this.historyService.createGameHistory(newGameRequest);
    }
}
