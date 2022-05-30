import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { request } from 'http';
import { UserDto } from 'src/dto/user.dto';
import { ImagesService } from 'src/images/images.service';
import { Channel, Game, User } from 'src/typeorm';
import { Repository } from 'typeorm';

export class UserRelationsPicker {
    withChannels?: boolean;
    withBlocked?: boolean;
    withStats?: boolean;
    withGames?: boolean;
	withFriends?: boolean;
}


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>, private imageService: ImagesService){}

    public async getOne(userId: number, relationsPicker?:UserRelationsPicker): Promise<User|null> {
        try {
            let relations: string[] = [];
            if (relationsPicker) {
                relationsPicker.withGames && relations.push('games') && relations.push('games.players');
                relationsPicker.withFriends && relations.push('friends');
                relationsPicker.withStats && relations.push('stats');
                relationsPicker.withChannels && relations.push('joinedChannels');
                relationsPicker.withBlocked && relations.push('blockedUsers');
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
    public async getUserByLogin(login: string, relationsPicker?:UserRelationsPicker): Promise<User|null> {
        try {
            let relations: string[] = [];
            if (relationsPicker) {
                relationsPicker.withGames && relations.push('games') && relations.push('games.players');
                relationsPicker.withFriends && relations.push('friends');
                relationsPicker.withStats && relations.push('stats')
            }
            const user: User = await this.userRepository.findOneOrFail({
                relations,
                where: {
                    login: login
                }
            });
            return user;
        }
        catch (e) {
            console.log(e)
            return null;
        }
    }

    public async getOneBySocket(socketId: string): Promise<User|null> {
        try {
            let billy : User;
            let users: User[] = await this.userRepository.find({
            });
            users.forEach(user => {
                
                if(user.socketIdTab[user.socketIdTab.indexOf(socketId)] === socketId)
                    billy = user;
            });
          return billy;
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

    public async getChannels(userId: number): Promise<Channel[]|null> {
        const user: User|null = await this.getOne(userId, {withChannels: true});
        if (user)
            return user.joinedChannels;
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

    public async setUserRStatus(userId: number, status: number): Promise<boolean> {
        const user: User|null = await this.getOne(userId);
        if (!user)
            return false;
        user.rStatus = status;
        await this.userRepository.save(user);
        return true;
    }

    public async setUserRoom(userId: number, roomId: number): Promise<boolean> {
        const user: User|null = await this.getOne(userId);
        if (!user)
            return false;
        user.roomId = roomId;
        await this.userRepository.save(user);
        return true;
    }

    public async setUserSocket(userId: number, socket: string): Promise<boolean> {
        const user: User|null = await this.getOne(userId);
        if (!user.socketIdTab)
            user.socketIdTab = [];
        if (user.socketIdTab.includes(socket) === false)
            user.socketIdTab.push(socket);
        await this.userRepository.save(user);
        return true;
    }

    public async getUserImage(userId: number): Promise<string|null> {
        const user: User|null = await this.getOne(userId);
        if (user)
            return user.avatar ;
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
        results = results.filter( ( el ) => {
            return !friends.some((friend) => {return friend.id == el.id}) && el.id != userId});

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
                return false
            const friendToAdd: User = await this.getOne(friendToAddId);
            if (!friendToAdd || friendToAdd.id == userId)
                return false
            user.friends.push(friendToAdd);
        })
        await this.userRepository.save(user);
        return true;
    }

    public async removeFriends(userId: number, friendsToRemoveIds: number[]) {
        const user: User|null = await this.getOne(userId, {withFriends: true});
        if (!user.friends)
            user.friends = [];      
        user.friends = user.friends.filter((friend) => {
            return !friendsToRemoveIds.includes(friend.id)
        })
        await this.userRepository.save(user);
        return true;
    }

    public async updateImage(userId: number, image: string) {
        const user: User|null = await this.getOne(userId);
        if (user.avatar.startsWith(process.env.IMAGES_PATH_URL))
            this.imageService.removeImage(user.avatar);
        user.avatar = image;
        await this.userRepository.save(user);
    }

    public async firstLogged(user: User) {
        user.firstLog = true;
        await this.userRepository.save(user);
    }

    public async updateLogin(userId: number, login: string) : Promise<number> {
        const user: User|null = await this.getOne(userId);
        if (!user.firstLog)
            this.firstLogged(user);
        if (user.login == login)
            return 0;
        if (! await this.login_available(login))
            return 1;
        user.login = login;
        await this.userRepository.save(user);
        return 0;
    }

    public async updateColor(userId: number, color: string) : Promise<number> {
        const user: User|null = await this.getOne(userId);
        user.color = color;
        await this.userRepository.save(user);
        return 0;
    }

    public async addBlockedUser(userId: number, blockedUser : number) {
        const user: User|null = await this.getOne(userId, {withBlocked: true});
        if (!user || !user.blockedUsers)
            return false;
        if (user.blockedUsers.some((user) => user.id == blockedUser) || userId == blockedUser)
            return false
        user.blockedUsers.push(await this.getOne(blockedUser)); 
        await this.userRepository.save(user);
        return true;
    }

    public async removeBlockedUser(userId: number, blockedUser : number) {
        const user: User|null = await this.getOne(userId, {withBlocked: true});
        if (!user || !user.blockedUsers)
        return false;
        if (!user.blockedUsers.some((user) => user.id == blockedUser) || userId == blockedUser)
            return false
        user.blockedUsers = user.blockedUsers.filter((user) => {return user.id != blockedUser}) 
        await this.userRepository.save(user);
        return true;
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

    public async userIsInChannel(userId: number, channelId: number): Promise<boolean> {
        const channels: Channel [] = await (await this.getOne(userId, {withChannels: true})).joinedChannels;

        if (!channels)
            return false;
        const ret = channels.some((channel) => {return channel.id == channelId});
        return ret;
    }

    public async findUsers(search: string, userId: number): Promise<UserDto[]|null> {
        const user: User|null = await this.getOne(userId, {withFriends:true });
        let results = await this.userRepository
        .createQueryBuilder().select()
        .where('login ILIKE :searchQuery', {searchQuery: `%${search}%`})
        .getMany()

        results = results.filter((user) => {return user.id != userId})
        if (!results)
            return null;

        const ret: UserDto[] = results.map((friend) => {
            return new UserDto(friend);
        })
        return ret; 
    }
}