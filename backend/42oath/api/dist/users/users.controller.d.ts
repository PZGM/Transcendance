import { Request } from 'express';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    getSelf(request: Request): Promise<import("../dto/user.dto").UserDTO>;
    getOne(userId: number): Promise<import("../dto/user.dto").UserDTO>;
    getLogin(userId: number): Promise<string>;
    getImage(userId: number): Promise<string>;
}
