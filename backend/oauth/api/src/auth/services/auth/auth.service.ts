import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { UserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { AuthentificationProvider } from './auth';

@Injectable()
export class AuthService implements AuthentificationProvider {

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>
    ) {}

    async validateUser(details: UserDetails) {
        //ca serait googd practice de faire un service mais osef
        const { discordId } = details;
        const user = await this.userRepo.findOne({ discordId });
        console.log(user);
        if (user) return user;
        return this.createUser(details);
    }
    
    async createUser(details: UserDetails) {
        console.log('tkt bro je te fait un user, tkt meme pas');
        const user = this.userRepo.create(details);
        return this.userRepo.save(user);
    }

    findUser(discordId: string) : Promise<User | undefined>{
        return this.userRepo.findOne({ discordId });
    }

    
}
