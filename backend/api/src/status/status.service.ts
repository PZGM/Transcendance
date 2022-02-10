import { Injectable } from '@nestjs/common';
import {fromEvent, Observable} from "rxjs";
import {EventEmitter} from "events";
import { UsersService } from 'src/users/users.service';

@Injectable()
export class StatusService {
    constructor(private readonly usersService: UsersService) {}

    private readonly emitter = new EventEmitter();

    getStatusObservable(id: number) : Observable<any> {
        return fromEvent(this.emitter, `status_${id}`);
    }

    async updateStatus(id: number, status: number) {
        this.emitter.emit(`status_${id}`, {data: {status: status}});
        this.usersService.setUserStatus(id, status);
    }
}
