import { User } from "src/typeorm/entities/user";

export class UserDto {

    constructor(user?: User) {
        if (user){
            this.id = user.id;
            this.login = user.login;
            this.avatar = user.avatar;
            this.status = user.status;
        }
    }

    id: number;
    login: string;
    avatar: string;
    status: number;
}