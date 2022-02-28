import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/typeorm/entities/user";
import { Done } from "src/utils/types";
import { AuthentificationProvider } from "../services/auth/auth";
export declare class SessionSerializer extends PassportSerializer {
    private readonly authservice;
    constructor(authservice: AuthentificationProvider);
    serializeUser(user: User, done: Done): void;
    deserializeUser(user: User, done: Done): Promise<void>;
}
