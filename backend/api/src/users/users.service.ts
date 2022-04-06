import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import path from 'path/posix';
import { UserDto } from 'src/dto/user.dto';
import { ImagesService } from 'src/images/images.service';
import { Game, User } from 'src/typeorm';
import { Repository } from 'typeorm';

interface RelationsPicker {
    withGames?: boolean,
    withFriends?: boolean,
}

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, private imageService: ImagesService){}

    public async getOne(userId: number, relationsPicker?:RelationsPicker): Promise<User|null> {
        try {
            let relations: string[] = [];
            if (relationsPicker) {
                relations.push('games') && relations.push('games.players');
                relationsPicker.withFriends && relations.push('friends');
            }
            const user: User = await this.userRepository.findOneOrFail({
                relations,
                where: {
                    id: userId
                }
            });
            return user;
        }
        catch (e) {
            console.log(e)
            return null;
        }
    }

    public async getUserLogin(userId: number): Promise<string|null> {
        const user: User|null = await this.getOne(userId);
        if (user)
            return user.login;
        return null;
    }

    public async getUserStatus(userId: number): Promise<number|null> {
        const user: User|null = await this.getOne(userId);
        if (user)
            return user.status;
        return null;
    }

    public async setUserStatus(userId: number, status: number): Promise<boolean> {
        const user: User|null = await this.getOne(userId);
        if (!user)
            return false;
        user.status = status;
        await this.userRepository.save(user);
        return true;
    }

    public async getUserImage(userId: number): Promise<string|null> {
        const user: User|null = await this.getOne(userId);
        if (user)
            return user.img_url ;
        return null; 
    }

    public async getFriends(userId: number): Promise<UserDto[]|null> {
        const user: User|null = await this.getOne(userId, {withFriends: true});
        if (!user)
            return null; 
        if (!user.friends)
            return [];
        const ret: UserDto[] = user.friends.map((friend) => {
            return new UserDto(friend);
        })
        return ret;
    }

    public async findFriends(search: string, userId: number): Promise<UserDto[]|null> {
        const user: User|null = await this.getOne(userId, {withFriends:true });
        let results = await this.userRepository
        .createQueryBuilder().select()
        .where('login ILIKE :searchQuery', {searchQuery: `%${search}%`})
        .getMany()

        const friends: User[] = user.friends || [];
        results = results.filter( ( el ) => !friends.some((friend) => {return friend.id == el.id}));

        if (!results)
            return null;

        const ret: UserDto[] = results.map((friend) => {
            return new UserDto(friend);
        })
        return ret; 
    }

    public async addFriends(userId: number, friendsToAddIds: number[]) {
        const user: User|null = await this.getOne(userId, {withFriends: true});
        if (!user.friends)
            user.friends = [];
        friendsToAddIds.forEach(async (friendToAddId) => {
            if (user.friends.some((user) => user.id == friendToAddId))
                return ConflictException;
            const friendToAdd: User = await this.getOne(friendToAddId);
            if (!friendToAdd)
                return NotFoundException;
            user.friends.push(friendToAdd);
        })
        await this.userRepository.save(user);
    }

    public async removeFriends(userId: number, friendsToRemoveIds: number[]) {
        const user: User|null = await this.getOne(userId, {withFriends: true});
        if (!user.friends)
            user.friends = [];
        user.friends = user.friends.filter((friend) => {
            !friendsToRemoveIds.includes(friend.id)
        })
        await this.userRepository.save(user);
    }

    public async updateImage(userId: number, image: string) {
        const user: User|null = await this.getOne(userId);
        if (user.img_url.startsWith(process.env.IMAGES_PATH_URL))
            this.imageService.removeImage(user.img_url);
        user.img_url = image;
        await this.userRepository.save(user);
    }

    public async updateLogin(userId: number, login: string) : Promise<number> {
        if (! await this.login_available(login))
            return 1;
        const user: User|null = await this.getOne(userId);
        user.login = login;
        await this.userRepository.save(user);
        return 0;
    }

    public async updateSecret(userId: number, secret: string) {
        const user: User|null = await this.getOne(userId);
        user.twofa = false;
        user.twofaSecret = secret;
        await this.userRepository.save(user);
    }

    public async addGame(userId: number, game: Game) {
        const usr = await this.userRepository.findOne({
            relations: ['games'],
            where: {
                id: userId
            }
        })
        if (!usr.games)
            usr.games = [];
        usr.games.push(game);
        await this.userRepository.save(usr);
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
            return user.twofa;
        }
        catch (e) {
            return null;
        }
    }
}