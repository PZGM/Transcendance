import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { GameDto } from 'src/dto/game.dto';
import { UsersService } from 'src/users/users.service';
import { CustomRequest } from 'src/utils/types';
import { HistoryService } from './history.service';
import { Logger } from '@nestjs/common';

@ApiTags('History')
@Controller('history')
export class HistoryController {

    constructor(private readonly historyService: HistoryService, private userService: UsersService) {}
	private logger = new Logger("HistoryController")

    @Get()
    @UseGuards(FullyAuthentificatedGuard)
    public async getHistory(@Req() request: CustomRequest) {
        this.logger.log("getHistory");
        const hist = await this.historyService.getHistory(request.user.id);
        let ret: GameDto[] = [];
        hist.forEach((game) => {
            ret.push(new GameDto(game));
        })
        return ret;
    }
}