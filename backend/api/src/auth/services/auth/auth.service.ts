import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Stats } from 'src/typeorm/entities/stats';
import { UserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { AuthentificationProvider } from './auth';

@Injectable()
export class AuthService implements AuthentificationProvider {

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>, private statsRepo: Repository<Stats>,
    ) {

    }

    async validateUser(details: UserDetails) {
        const { intraId } = details;
        let user = await this.userRepo.findOne({ intraId });
        if (!user) 
            user = await this.createUser(details);
        return user;
    }
    
    async createUser(details: UserDetails) {
        const user = this.userRepo.create(details);
        user.friends = [];
        const stats = this.statsRepo.create({
            games: 0,
            gameWins: 0,
            gameLosses: 0,
            victoryRate: 0,
            durationMin: 0,
            durationMax: 0,
            durationAverage: 0,
            greaterAvantage: 0,
            greaterDisavantage: 0,
            averageScore: 0,
            averageOponnentScore: 0,
            shots: 0,
            shotsFailed: 0,
            shotsSucceed: 0,
            accuracy: undefined,
            launchs: 0,
            eloScore: 400,
            rank: 0
        })
        user.stats = stats;
        return this.userRepo.save(user);
    }

    findUser(intraId: string) : Promise<User | undefined>{
        return this.userRepo.findOne({ intraId });
    }
}
