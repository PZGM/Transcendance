import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game, User } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>){}

    public async getOne(userId: number): Promise<User|null> {
        try {
            const user: User = await this.userRepository.findOneOrFail({
                // relations: ['games', 'games.players'],
                where: {
                    id: userId
                }
            });
            return user;
        }
        catch (e) {
            return null;
        }
    }

    public async getOneWithGames(userId: number): Promise<User|null> {
        try {
            const user: User = await this.userRepository.findOneOrFail({
                relations: ['games', 'games.players'],
                where: {
                    id: userId
                }
            });
            return user;
        }
        catch (e) {
            console.log('--error');
            console.log(e);
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

    public async getFriends(userId: number): Promise<number[]|null> {
        const user: User|null = await this.getOne(userId);
        if (user)
            return user.friends ;
        return null; 
    }

    public async findFriends(search: string, userId: number): Promise<number[]|null> {
        const user: User|null = await this.getOne(userId);
        let results = await this.userRepository
        .createQueryBuilder().select()
        .where('login ILIKE :searchQuery', {searchQuery: `%${search}%`})
        .getMany()

        let friends = user.friends;
        let resultsId = results.map(item => item.id);
        resultsId = resultsId.filter( ( el ) => !friends.includes( el ) );


        if (resultsId)
            return resultsId ;
        return null; 
    }

    public async updateFriends(userId: number, friends: number[]) {
        const user: User|null = await this.getOne(userId);
        user.friends = friends;
        await this.userRepository.save(user);
    }

    public async updateImage(userId: number, image: string) {
        const user: User|null = await this.getOne(userId);
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