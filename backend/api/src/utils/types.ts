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
  winner: User;
  loser: User;
  winner_score: number,
  loser_score: number;
  duration: number;
}

export interface CustomRequest extends Request {
    session: any;
    user: User;
  }

export type Done = (err: Error, user: User) => void;