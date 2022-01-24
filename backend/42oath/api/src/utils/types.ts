import { User } from "src/typeorm";

export type UserDetails = {
    login: string;
    firstName: string;
    lastName: string,
    intraId: string;
    img_url: string;
}

export type Done = (err: Error, user: User) => void;