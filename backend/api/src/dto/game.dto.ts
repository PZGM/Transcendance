import { Game } from '../typeorm/entities/game'
import { UserDto } from './user.dto'
import { CoorI } from 'src/game/components/coor';
import { User } from 'src/typeorm';
import { Player } from 'src/game/components/player';
import { Ball } from 'src/game/components/ball';


export enum roomEnum {
    waiting,
    playing,
    goal,
    end
}

export class GameDto {

    constructor(game?: Game) {
        if (game){
            this.roomId = game.roomId;
            this.duration = game.duration;
            this.winnerId = game.winnerId;
            this.loserId = game.loserId;
            this.winnerScore = game.winnerScore;
            this.loserScore = game.loserScore;
            this.createdDate = game.createdDate;
            this.players = [];
            game.players.forEach(player => {
                this.players.push(new UserDto(player));
            });
        }
    }

    roomId: string;
    duration: number;
    winnerId: number;
    loserId: number;
    winnerScore: number;
    loserScore: number;
    players: UserDto[];
    createdDate: Date;
}

export class BallDto {
	
    coor: CoorI;
    r : number;

}

export class PlayerDTO {
	
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
	lastGoal?: Player;
	winner?: UserDto;
	loser?: UserDto;
}