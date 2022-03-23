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

    public async getUserStatus(userId: number): Promise<number|null> {
        const userDTO: UserDTO|null = await this.getOne(userId);
        if (userDTO)
            return userDTO.status;
        return null;
    }

    public async setUserStatus(userId: number, status: number): Promise<boolean> {
        const userDTO: UserDTO|null = await this.getOne(userId);
        if (!userDTO)
            return false;
        userDTO.status = status;
        const user: User = this.DTOToEntity(userDTO);
        await this.userRepository.save(user);
        return true;
    }

    public async getUserImage(userId: number): Promise<string|null> {
        const userDTO: UserDTO|null = await this.getOne(userId);
        if (userDTO)
            return userDTO.img_url ;
        return null; 
    }

    public async getFriends(userId: number): Promise<number[]|null> {
        const userDTO: UserDTO|null = await this.getOne(userId);
        if (userDTO)
            return userDTO.friends ;
        return null; 
    }

    public async findFriends(search: string, userId: number): Promise<number[]|null> {
        const userDTO: UserDTO|null = await this.getOne(userId);
        let results = await this.userRepository
        .createQueryBuilder().select()
        .where('login ILIKE :searchQuery', {searchQuery: `%${search}%`})
        .getMany()

        let friends = userDTO.friends;
        let resultsId = results.map(item => item.id);
        resultsId = resultsId.filter( ( el ) => !friends.includes( el ) );


        if (resultsId)
            return resultsId ;
        return null; 
    }

    public async updateFriends(userId: number, friends: number[]) {
        const userDTO: UserDTO|null = await this.getOne(userId);
        userDTO.friends = friends;
        const user: User = this.DTOToEntity(userDTO);
        await this.userRepository.save(user);
    }

    public async updateImage(userId: number, image: string) {
        const userDTO: UserDTO|null = await this.getOne(userId);
        userDTO.img_url = image;
        const user: User = this.DTOToEntity(userDTO);
        await this.userRepository.save(user);
    }

    public async updateLogin(userId: number, login: string) : Promise<number> {
        if (! await this.login_available(login))
            return 1;
        const userDTO: UserDTO|null = await this.getOne(userId);
        userDTO.login = login;
        const user: User = this.DTOToEntity(userDTO);
        await this.userRepository.save(user);
        return 0;
    }

    public async updateSecret(userId: number, secret: string) {
        const userDTO: UserDTO|null = await this.getOne(userId);
        userDTO.twofa = false;
        userDTO.twofaSecret = secret;
        const user: User = this.DTOToEntity(userDTO);
        await this.userRepository.save(user);
    }

    private entityToDTO(user: User): UserDTO {
        const userDTO = new UserDTO();
        userDTO.id = user.id;
        userDTO.intraID  = user.intraId;
        userDTO.login = user.login;
        userDTO.firstName = user.firstName;
        userDTO.lastName = user.lastName;
        userDTO.img_url = user.img_url;
        userDTO.status = user.status;
        userDTO.friends = user.friends;
        userDTO.twofaSecret = user.twofaSecret;
        userDTO.twofa = user.twofa;
        userDTO.ownedChannels = user.ownedChannels;
        userDTO.joinedChannels = user.joinedChannels;

        return userDTO;
    }

    private DTOToEntity(userDTO: UserDTO): User {
        const user = new User();
        user.id = userDTO.id;
        user.intraId  = userDTO.intraID;
        user.login = userDTO.login;
        user.firstName = userDTO.firstName;
        user.lastName = userDTO.lastName;
        user.img_url = userDTO.img_url;
        user.status = userDTO.status;
        user.friends = userDTO.friends;
        user.twofa = userDTO.twofa;
        user.twofaSecret = userDTO.twofaSecret;
        user.ownedChannels = userDTO.ownedChannels;
        user.joinedChannels = userDTO.joinedChannels;

        return user;
    }

    private async login_available(login: string) : Promise<number> {
        if ( (await this.userRepository.count({login: login})) != 0)
            return 0;
        return 1;
    }

    async turnOnTwofa(userId: number) {
        return this.userRepository.update(userId, {
          twofa: true
        });
      }

      async turnOffTwofa(userId: number) {
        return this.userRepository.update(userId, {
          twofa: false,
          twofaSecret: null
        });
      }

      public async isTwofaEnabled(userId: number): Promise<boolean|null> {
        try {
            const user: User = await this.userRepository.findOneOrFail(userId);
            return this.entityToDTO(user).twofa;
        }
        catch (e) {
            return null;
        }
    }
}