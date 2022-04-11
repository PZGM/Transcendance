import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomInt } from 'crypto';
import { truncate } from 'fs/promises';
import { networkInterfaces } from 'os';
import { StatsService } from 'src/stats/stats.service';
import { Game, User } from 'src/typeorm';
import { UsersService } from 'src/users/users.service';
import { GameDetails } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryService {

    constructor(@InjectRepository(Game) private gameRepository: Repository<Game>, private userService: UsersService, private statsService: StatsService){}

    async createGameHistory(details: GameDetails) {
        const winner: User = await this.userService.getOne(details.winnerId, {withStats: true});
        const loser: User = await this.userService.getOne(details.loserId, {withStats: true});
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
        this.statsService.setStats(
            game.winnerId,
            {
                won: true,
                duration: details.duration,
                score: details.winnerScore,
                opponentScore: details.loserScore,
                eloScore: winner.stats.eloScore,
                opponentEloScore: loser.stats.eloScore
            }
        );
        this.statsService.setStats(
            game.loserId,
            {
                won: false,
                duration: details.duration,
                score: details.loserScore,
                opponentScore: details.winnerScore,
                eloScore: loser.stats.eloScore,
                opponentEloScore: winner.stats.eloScore
            }
        )
    }

    async getHistory(userId: number): Promise<Game[]> {
        const user: User = await this.userService.getOne(userId, {withGames: true});
        return user.games;
    }

}
