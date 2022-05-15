import { UserDto } from "src/dto/user.dto";
import { statusEnum } from "src/status/status.service";
import { Difficulty } from "./coor";


export default class Queue {
    private easy: UserDto[] = [];
    private medium: UserDto[] = [];
    private hard: UserDto[] = [];

    constructor() {}

    addToQueue(user: UserDto, difficulty: Difficulty): UserDto {
        user.status = statusEnum.inQueue;
        if(difficulty === Difficulty.Easy)
            this.easy.push(user);
        if(difficulty === Difficulty.Medium)
            this.medium.push(user);
        if(difficulty === Difficulty.Hard)
            this.hard.push(user);
        return user
    }
    getOneUser(difficulty: Difficulty): UserDto | undefined {
        if (difficulty === Difficulty.Easy)
            return this.easy.shift();
        if (difficulty === Difficulty.Medium)
            return this.medium.shift();
        if (difficulty === Difficulty.Hard)
            return this.hard.shift();
       
    }
    sizeEasy(): number {
        return this.easy.length;
    }

    sizeMedium(): number {
        return this.medium.length;
    }

    sizeHard(): number {
        return this.hard.length;
    }

    getTwoBydifficulty(){

    }

    find(user: UserDto): Difficulty {
        if(this.easy.find(resu => resu.login === user.login) !== undefined)
            return Difficulty.Easy;
        if(this.medium.find(resu => resu.login === user.login) !== undefined)
            return Difficulty.Medium;
        if(this.hard.find(resu => resu.login === user.login) !== undefined)
            return Difficulty.Hard;
        return 0;

        
    }

    rmToQueue(user: UserDto): UserDto {
        if(this.find(user) === 0)
            return null;
        if (this.find(user) === Difficulty.Easy)
            this.easy.splice(this.easy.findIndex(resu => resu.login === user.login), 1);
        if (this.find(user) === Difficulty.Medium)
                this.medium.splice(this.easy.findIndex(resu => resu.login === user.login), 1);
        if (this.find(user) === Difficulty.Hard)
                this.hard.splice(this.easy.findIndex(resu => resu.login === user.login), 1);
        user.status = statusEnum.connected;
        return user;
    }
}
