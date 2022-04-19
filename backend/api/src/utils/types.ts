import { IsPositive } from "class-validator";
import { User } from "src/typeorm";

export type UserDetails = {
    login: string;
    firstName: string;
    lastName: string,
    intraId: string;
    avatar: string;
    status: number;
    friends: User[];
}

export class GameDetails {
  @IsPositive()
  winnerId: number;

  @IsPositive()
  loserId: number;

  @IsPositive()
  winnerScore: number;

  @IsPositive()
  loserScore: number;

  @IsPositive()
  duration: number;
}

export interface CustomRequest extends Request {
    isAuthenticated(): boolean;
    session: any;
    user: User;
  }

export type Done = (err: Error, user: User) => void;