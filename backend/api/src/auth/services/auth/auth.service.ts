import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { Stats } from 'src/typeorm/entities/stats';
import { UserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { AuthentificationProvider } from './auth';
import { ChannelsService } from 'src/chat/channel/channels.service';
import { ChannelDto } from 'src/dto/chat.dto';
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
        const chan : Channel | null = await this.chanService.getOneByName('root','General')
        if (user.id === 1 && !chan) {
            //universal Channel
                let channel: Channel = new Channel();
                channel.admin = []; channel.name = "General"; channel.visibility = "public";
                channel.users = []; channel.mute = []; channel.chats = []; channel.id = 0; channel.visibility = 'public'
                this.chanService.create(new ChannelDto(channel));
        }
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
            winRow: 0,
            actualWinRow: 0,
            under3min: 0,
            golden: 0,
            // greaterAvantage: 0,
            // greaterDisavantage: 0,
            // averageScore: 0,
            // averageOponnentScore: 0,
            eloScore: 400,
            rank: 0
        });
        user.stats = stats;
        await this.statsRepo.save(stats);
        return await this.userRepo.save(user);
    }

    findUser(intraId: string) : Promise<User | undefined>{
        return this.userRepo.findOne({ intraId });
    }
}
