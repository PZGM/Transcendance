import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm';
import { UserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { AuthentificationProvider } from './auth';

@Injectable()
export class AuthService implements AuthentificationProvider {

    constructor(
        @InjectRepository(User) private userRepo: Repository<User>,
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
        return this.userRepo.save(user);
    }

    findUser(intraId: string) : Promise<User | undefined>{
        return this.userRepo.findOne({ intraId });
    }

    
}
