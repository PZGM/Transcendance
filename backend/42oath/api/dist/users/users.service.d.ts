import { UserDTO } from 'src/dto/user.dto';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getOne(userId: number): Promise<UserDTO | null>;
    getUserLogin(userId: number): Promise<string | null>;
    getUserImage(userId: number): Promise<string | null>;
    private entityToDTO;
}
