import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Stats } from 'src/typeorm/entities/stats';
import { UserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { AuthentificationProvider } from './auth';
import { ChannelsService } from 'src/chat/channel/channels.service';
import { Channel } from 'src/typeorm';

@Injectable()
export class AuthService implements AuthentificationProvider {

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>, @InjectRepository(Stats) private statsRepo: Repository<Stats>, private readonly chanService: ChannelsService
    ) {

    }

    async validateUser(details: UserDetails) {
        const { intraId } = details;
        let user = await this.userRepo.findOne({ intraId });
        if (!user) 
            user = await this.createUser(details);
        const chan : Channel | null = await this.chanService.getOneByName('general')
        return user;
    }
    
    async createUser(details: UserDetails) {
        const user = this.userRepo.create(details);
        user.friends = [];
        user.blockedUsers = [];
        const stats = this.statsRepo.create({
            games: 0,
            gameWins: 0,
            gameLosses: 0,
            victoryRate: 0,
            durationMin: 0,
            durationMax: 0,
            durationAverage: 0,
            winRow: 0,
            actualWinRow: 0,
            under3min: 0,
            golden: 0,
            eloScore: 400,
            rank: 0
        });
        user.stats = stats;
        await this.statsRepo.save(stats);
        const ret = await this.userRepo.save(user);
        this.chanService.join(user.id, 1);
        return ret;
    }

    findUser(intraId: string) : Promise<User | undefined>{
        return this.userRepo.findOne({ intraId });
    }
}
