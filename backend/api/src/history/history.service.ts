import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import { networkInterfaces } from 'os';
import { Game, User } from 'src/typeorm';
import { UsersService } from 'src/users/users.service';
import { GameDetails } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryService {

    constructor(@InjectRepository(Game) private gameRepository: Repository<Game>, private userService: UsersService){}

    async createGameHistory(details: GameDetails) {
        const winner: User = await this.userService.getOne({userId: details.winnerId});
        const loser: User = await this.userService.getOne({userId: details.loserId});
        if (!winner || !loser)
            throw new NotFoundException();
        let game: Game = this.gameRepository.create();
        game.duration = details.duration
        game.players = [winner, loser]
        game.winnerId = details.winnerId;
        game.loserId = details.loserId;
        game.winnerScore = details.winnerScore;
        game.loserScore = details.loserScore;
        await this.gameRepository.save(game);
        this.userService.addGame(game.winnerId, game);
        this.userService.addGame(game.loserId, game);
    }

    async getHistory(userId: number): Promise<Game[]> {
        const user: User = await this.userService.getOne({userId});
        return user.games;
    }

}
