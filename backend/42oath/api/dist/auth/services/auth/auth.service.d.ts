import { User } from 'src/typeorm';
import { UserDetails } from 'src/utils/types';
import { Repository } from 'typeorm';
import { AuthentificationProvider } from './auth';
export declare class AuthService implements AuthentificationProvider {
    private userRepo;
    constructor(userRepo: Repository<User>);
    validateUser(details: UserDetails): Promise<User>;
    createUser(details: UserDetails): Promise<User>;
    findUser(intraId: string): Promise<User | undefined>;
}
