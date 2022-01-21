import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/typeorm/entities/user";
import { Done } from "src/utils/types";
import { AuthentificationProvider } from "../services/auth/auth";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject('AUTH_SERVICE')
        private readonly authservice: AuthentificationProvider,
    ) {
        super();
    }

    serializeUser(user: User, done: Done) {
        done(null, user);
    }

    async deserializeUser(user: User, done: Done) {
        const userDb = await this.authservice.findUser(user.discordId);
        return userDb ? done(null, userDb) : done(null, null);
    }

} 