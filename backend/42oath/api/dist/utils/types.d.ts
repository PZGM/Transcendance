import { User } from "src/typeorm";
export declare type UserDetails = {
    login: string;
    firstName: string;
    lastName: string;
    intraId: string;
    img_url: string;
};
export declare type Done = (err: Error, user: User) => void;
