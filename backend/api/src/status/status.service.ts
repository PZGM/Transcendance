import { Injectable } from '@nestjs/common';
import {fromEvent, Observable} from "rxjs";
import {EventEmitter} from "events";
import { UsersService } from 'src/users/users.service';

enum statusEnum {
    unknow,
    disconected,
    idle,
    connected,
    playing
}

@Injectable()
export class StatusService {

    private activeUsers = new Map<number, number>();
    private readonly emitter = new EventEmitter();

    constructor(private readonly usersService: UsersService) {
        setInterval(this.checkUsersActivity.bind(this), 1000);
    }

    reportActivity(id: number) : void {
        this.activeUsers.set(id, Date.now());
    }

    checkUsersActivity() : void {
        let now: number = Date.now();
        this.activeUsers.forEach((date: number, id: number) => {
            if (now - date > (+ process.env.TIME_BEFORE_DISC as number)) {
                this.updateStatus(id, statusEnum.disconected);
                this.activeUsers.delete(id);
            }
        })
    }

    getStatusObservable(id: number) : Observable<any> {
        return fromEvent(this.emitter, `status_${id}`);
    }

    async updateStatus(id: number, status: statusEnum) {
        this.emitter.emit(`status_${id}`, {data: {status: status}});
        this.usersService.setUserStatus(id, status);
    }
}