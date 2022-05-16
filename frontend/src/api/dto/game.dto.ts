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

export interface BallDto {
    x: number;
    y: number;
    dx: number;
    dy: number;
    speed: number;
    color: string;
    diameter: number;
    acceleration: number;
}

export interface PlayerDTO {
    x: number;
    y: number;
    height: number;
    user: UserDto;
	score: number;
}

export interface RoomDto {
	roomId: string;
	status: number;
	playerOne: PlayerDTO;
	playerTwo: PlayerDTO;
	ball: BallDto;
	startingTime: number;
	updateTime: number;
    duration?: number;
	lastGoal?: PlayerDTO;
	winner?: UserDto;
	loser?: UserDto;
}