import { UserDto } from "src/dto/user.dto";
import { statusEnum } from "src/status/status.service";


export default class Queue {
    private queue: UserDto[] = [];

    constructor() {}

    addToQueue(user: UserDto): UserDto {
        user.status = statusEnum.inQueue;
        this.queue.push(user);
        return user
    }
    getOneUser(): UserDto | undefined {
        return this.queue.shift();
    }
    size(): number {
        return this.queue.length;
    }

    find(user: UserDto): boolean {
        return (this.queue.find(resu => resu.login === user.login) !== undefined);
    }

    rmToQueue(user: UserDto): UserDto {
        if (this.find(user)) {
            this.queue.splice(this.queue.findIndex(resu => resu.login === user.login), 1);
            user.status = statusEnum.connected;
            return user;
        }
        return null;
    }
}
