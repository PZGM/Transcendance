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


    // async getUserRank(userId: number) {

    //     console.log('getUserStats')

    //     let stats: Stats[] = await this.statsRepo.find({ 
    //         order: {
    //             eloScore: "DESC"
    //         }
    //     })

    //     console.log(stats)

    //     if (stats)
    //     {
    //         for (let i: number = 0; i < stats.length; i++)
    //         {
    //             console.log(`userId = ${userId}`)
    //             console.log(`stats.id = ${stats[i].id}`)
    //             if (stats[i].id = userId)
    //                 return i + 1;
    //         }
    //         return 1
    //     }
    //     throw new NotFoundException();
    // }

    public async setStats(userId: number, lastGame: LastGame)
    {
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
        stats.actualWinRow = (lastGame.won) ? stats.actualWinRow + 1 : 0;
        stats.winRow = (stats.actualWinRow > stats.winRow) ? stats.actualWinRow : stats.winRow;
        stats.under3min = (lastGame.won && lastGame.duration <= 3) ? stats.under3min + 1 : stats.under3min;
        stats.golden = (lastGame.opponentScore == 0) ? stats.golden + 1 : stats.golden;
        const expectedScore = 1 / (1 + Math.pow(10, (lastGame.opponentEloScore - lastGame.eloScore) / 400))
        let K = 40 - stats.games;
        if (K < 20)
            K = 20;
        const score = 0.3 * (lastGame.won ? 1 : 0) + 0.7 * (lastGame.score / (lastGame.score + lastGame.opponentScore));
        stats.eloScore = Math.round(stats.eloScore + K * (score - expectedScore));
        user.stats = stats;
        this.statsRepo.save(stats);
        stats.rank = 1;
        user.stats = stats;
        this.statsRepo.save(stats);
    }

}

