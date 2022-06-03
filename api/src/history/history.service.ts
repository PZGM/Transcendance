import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameDto } from 'src/dto/game.dto';
import { StatsService } from 'src/stats/stats.service';
import { Game, User } from 'src/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class HistoryService {

    constructor(@InjectRepository(Game) private gameRepository: Repository<Game>, private userService: UsersService, private statsService: StatsService){}

    async createGameHistory(details: GameDto) {
        const winner: User = await this.userService.getOne(details.winnerId, {withStats: true});
        const loser: User = await this.userService.getOne(details.loserId, {withStats: true});
        if (!winner || !loser)
            throw new NotFoundException();
        const game: Game = this.gameRepository.create(details);
        await this.userService.addGame(game.winnerId, game);
        await this.userService.addGame(game.loserId, game);
        await this.statsService.setStats(
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
        await this.statsService.setStats(
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
        await this.gameRepository.save(game);
    }

    async getHistory(userId: number): Promise<Game[]> {
        const user: User = await this.userService.getOne(userId, {withGames: true});
        return user.games;
    }

}
