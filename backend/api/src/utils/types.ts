import { User } from "src/typeorm";

export type UserDetails = {
    login: string;
    firstName: string;
    lastName: string,
    intraId: string;
    img_url: string;
    status: number;
}

export interface CustomRequest extends Request {

    user: User;
  }

export type Done = (err: Error, user: User) => void;