import { User } from "src/typeorm";

export type UserDetails = {
    login: string;
    firstName: string;
    lastName: string,
    intraId: string;
    img_url: string;
    status: number;
    friends: number[];
}

export type GameDetails = {
  winnerId: number;
  loserId: number;
  winnerScore: number,
  loserScore: number;
  duration: number;
}

export interface CustomRequest extends Request {
    session: any;
    user: User;
  }

export type Done = (err: Error, user: User) => void;