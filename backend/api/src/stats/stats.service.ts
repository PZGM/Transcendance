import { Injectable, NotFoundException } from '@nestjs/common';
import { Stats } from 'src/typeorm/entities/stats';
import { User } from 'src/typeorm/entities/user';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from 'src/dto/user.dto';

interface LastGame {
    won: boolean,
    duration: number,
    score: number,
    opponentScore: number,
    eloScore: number,
    opponentEloScore: number,
}

@Injectable()
export class StatsService {
    constructor(private readonly userService: UsersService, @InjectRepository(Stats) private statsRepo: Repository<Stats>,) {}

    public async getStats(userId: number) {
        const user: User = await this.userService.getOne(userId, {withStats: true});
        if (user)
            return user.stats;
        throw new NotFoundException();
    }

    public async getUserWithStats(userId: number) {
        const user: User = await this.userService.getOne(userId, {withStats: true});
        if (user)
            return new UserDto(user);
        throw new NotFoundException();
    }

    public async setStats(userId: number, lastGame: LastGame){
        let user: User = await this.userService.getOne(userId, {withStats: true});
        let stats: Stats = user.stats;
        
        stats.games += 1;
        stats.gameWins += (lastGame.won) ? 1 : 0;
        stats.gameLosses += (lastGame.won) ? 0 : 1;
        stats.victoryRate = stats.gameWins / stats.games * 100;
        if (lastGame.duration < stats.durationMin || stats.durationMin == 0)
            stats.durationMin = lastGame.duration;
        if (lastGame.duration > stats.durationMax)
            stats.durationMax = lastGame.duration
        stats.durationAverage = (stats.durationAverage * (stats.games - 1) + lastGame.duration) / stats.games;
        if (lastGame.won && lastGame.score - lastGame.opponentScore > stats.greaterAvantage)
            stats.greaterAvantage = lastGame.score - lastGame.opponentScore;
        if (!lastGame.won && lastGame.opponentScore - lastGame.score > stats.greaterDisavantage)
            stats.greaterDisavantage = lastGame.opponentScore - lastGame.score;
        stats.averageScore = (stats.averageScore * (stats.games - 1) + lastGame.score) / stats.games;
        stats.averageOponnentScore = (stats.averageOponnentScore * (stats.games - 1) + lastGame.opponentScore) / stats.games;
        
        const expectedScore = 1 / (1 + Math.pow(10, (lastGame.opponentEloScore - lastGame.eloScore) / 400))
        let K = 40 - stats.games;
        if (K < 20)
            K = 20;
        console.log('--------------------')
        console.log(`old elo : ${user.stats.eloScore}`);
        const score = 0.3*(lastGame.won ? 1:0) + 0.7*(lastGame.score / (lastGame.score + lastGame.opponentScore));
        stats.eloScore = Math.round(stats.eloScore + K * (score - expectedScore));
        stats.rank = 1;
        user.stats = stats;
        console.log(`expected score : ${expectedScore}`);
        console.log(`score : ${score}`);
        console.log(`new elo : ${stats.eloScore}`);
        this.statsRepo.save(stats);
    }

}

