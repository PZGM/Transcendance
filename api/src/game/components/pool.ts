import { UserDto } from "src/dto/user.dto";
import { statusEnum } from "src/status/status.service";


export default class Pool {
    private pool: UserDto[] = [];

    constructor() {}

    addToPool(user: UserDto): void {
        user.status = statusEnum.connected;
        this.pool.push(user);
    }

    changeStatus(status : number, user: UserDto) : void {
        this.pool[this.pool.findIndex(resu => resu.login === user.login)].status = status;
    }

    size(): number {
        return this.pool.length;
    }

    findById(userId: number) : UserDto {
        return this.pool.find(resu => resu.id === userId) ?
            this.pool.find(resu => resu.id=== userId) : null;
    }

    find(user: UserDto): UserDto {
        return this.pool.find(resu => resu.login === user.login) ?
            this.pool.find(resu => resu.login === user.login) : null;
    }

    rmToPool(user: UserDto): void {
        if (this.find(user))
            this.pool.splice(this.pool.findIndex(resu => resu.login === user.login), 1);
    }
}
