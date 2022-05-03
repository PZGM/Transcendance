import { Min, IsPositive } from "class-validator";
import { User } from "src/typeorm";

export type UserDetails = {
    login: string;
    firstName: string;
    lastName: string,
    intraId: string;
    avatar: string;
    status: number;
    friends: User[];
    color: string;
}

export class GameDetails {
  @Min(0)
  winnerId: number;

  @Min(0)
  loserId: number;

  @Min(0)
  winnerScore: number;

  @Min(0)
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