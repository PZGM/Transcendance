import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDTO } from 'src/dto/user.dto';
import { User } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    public async getOne(userId: number): Promise<UserDTO|null> {
        try {
            const user: User = await this.userRepository.findOneOrFail(userId);
            return this.entityToDTO(user);
        }
        catch (e) {
            return null;
        }
    }

    public async getUserLogin(userId: number): Promise<string|null> {
        const userDTO: UserDTO|null = await this.getOne(userId);
        if (userDTO)
            return userDTO.login;
        return null;
    }

    public async getUserImage(userId: number): Promise<string|null> {
        const userDTO: UserDTO|null = await this.getOne(userId);
        if (userDTO)
            return userDTO.img_url ;
        return null; 
    }

private entityToDTO(user: User): UserDTO {
    const userDTO = new UserDTO();
    userDTO.id = user.id;
    userDTO.intraID  = user.intraId;
    userDTO.login = user.login;
    userDTO.firstName = user.firstName;
    userDTO.lastName = user.lastName;
    userDTO.img_url = user.img_url;

    return userDTO;
}
}