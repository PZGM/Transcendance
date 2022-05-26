import { Length } from "class-validator";
import { User } from "src/typeorm/entities/user";
import { Stats } from "src/typeorm/entities/stats";
import { Channel } from "src/typeorm";

export class UserDto {

    constructor(user?: User) {
        if (user){
            this.id = user.id;
            this.login = user.login;
            this.avatar = user.avatar;
            this.status = user.status;
            this.blockedUsers = user.blockedUsers;
            this.adminChannels = user.adminChannels;
            this.color = user.color;
            this.stats = user.stats;
            this.firstLog = user.firstLog;
            this.roomId = user.roomId;
            this.socketIdTab = user.socketIdTab;
        }
    }
    id: number;
    roomId? : number;
    socketIdTab? : string[];
    login: string;
    avatar: string;
    status?: number; 
    blockedUsers?: User[];
    adminChannels?: Channel[];
    color: string;
    stats: Stats;
    firstLog: boolean;
}

export class UpdateImageRequestDto{
    image: string;
}

export class UpdateLoginRequestDto{
    @Length(3, 10)
    login: string
}