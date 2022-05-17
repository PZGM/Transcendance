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

export interface Setting {
    readonly color: string;
    width: number;
    readonly speed: number;
    readonly acceleration : number;
}

export interface CoorI {
    x: number;
    y: number;
    dx: number;
    dy: number;
    speed?: number;
    color: string;
    difficulty: Difficulty;
    setting: Setting;
}

export interface BallDto {
    coor: CoorI;
    r : number;
}

export interface PlayerDTO {
    user: UserDto;
    coor: CoorI;
	goal: number;
}

export interface RoomDto {
	roomId: string;
	status: number;
	playerOne: PlayerDTO;
	playerTwo: PlayerDTO;
	ball: BallDto;
	startingTime: number;
	updateTime: number;
    duration: number;
	lastGoal?: PlayerDTO;
	winner?: UserDto;
	loser?: UserDto;
}