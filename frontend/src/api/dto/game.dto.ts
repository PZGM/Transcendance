import { UserDto } from "./user.dto";

export enum roomEnum {
    waiting,
    playing,
    goal,
    end
}

export interface GameDto {
    roomId: string,
    duration: number,
    winnerId: number,
    loserId: number,
    winnerScore: number,
    loserScore: number,
    players: UserDto[],
    createdDate: Date,
}

export enum Difficulty {
    Easy,
    Medium,
    Hard
}

export interface Room {
	roomId: string;
	status: number;
    pOne: UserDto;
    ballX: number;
    ballY: number;
    ballR: number;
    ballColor: string;
	pOneX: number;
    pOneY: number;
    pOneSize: number;
    pOneScore: number;
    pTwo: UserDto;
    pTwoX: number;
    pTwoY: number;
    pTwoSize: number;
    pTwoScore: number;
}