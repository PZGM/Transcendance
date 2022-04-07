import { User } from "src/typeorm/entities/user";
import { Channel } from "src/typeorm";

export class UserDto {

    constructor(user?: User) {
        if (user){
            this.id = user.id;
            this.login = user.login;
            this.img_url = user.img_url;
            this.status = user.status;
            this.blockedUsers = user.blockedUsers;
            this.adminChannels = user.adminChannels;
        }
    }
    id: number;
    login: string;
    img_url: string;
    status: number;
    blockedUsers?: User[];
    adminChannels?: Channel[]; 
}