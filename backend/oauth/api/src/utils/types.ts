import { User } from "src/typeorm";

export type UserDetails = {
    username: string;
    discriminator: string;
    discordId: string;
    avatar: string;
}

export type Done = (err: Error, user: User) => void;