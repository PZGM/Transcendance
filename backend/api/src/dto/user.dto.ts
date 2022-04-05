import { User } from "src/typeorm/entities/user";

export class UserDto {

    constructor(user?: User) {
        if (user){
            this.id = user.id;
            this.login = user.login;
            this.img_url = user.img_url;
            this.status = user.status;
        }
    }

    id: number;
    login: string;
    img_url: string;
    status: number;
}