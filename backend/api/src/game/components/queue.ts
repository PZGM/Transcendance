import { User } from "src/typeorm";

export default class Queue {
    private queue: User[] = [];

    constructor() {}

    addToQueue(user: User): void {
        this.queue.push(user);
    }
    getUser(): User | undefined {
        return this.queue.shift();
    }
    size(): number {
        return this.queue.length;
    }

    find(user: User): boolean {
        return (this.queue.find(resu => resu.login === user.login) !== undefined);
    }

    rmToQueue(user: User): void {
        if (this.find(user))
            this.queue.splice(this.queue.findIndex(resu => resu.login === user.login), 1);
    }
}
