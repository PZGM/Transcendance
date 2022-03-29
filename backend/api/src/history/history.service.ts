import { Injectable } from '@nestjs/common';
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
        let game: Game = new Game();
        game.duration = details.duration
        game.players = [details.winner, details.loser]
        game.winnerId = details.winner.id;
        game.loserId = details.loser.id;
        game.winnerScore = details.winner_score;
        game.loserScore = details.loser_score;
        await this.gameRepository.save(game);
        this.userService.addGame(game.winnerId, game);
        this.userService.addGame(game.loserId, game);
    }

}
