import { Game } from '../typeorm/entities/game'
import { UserDto } from './user.dto'
import { CoorI } from 'src/game/components/coor';
import { User } from 'src/typeorm';
import { Player } from 'src/game/components/player';
import { Ball } from 'src/game/components/ball';

export class GameDto {

    constructor(game?: Game) {
        if (game){
            this.id = game.id;
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

    id: number;
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

}

export class PlayerDTO {
	
    user: UserDto;
    coor: CoorI;
	goal: number;
}

export interface RoomDto {
	roomId: number;
	status: number; // 0 waiting 1 playing 2 goal 3 end enum ?
	playerOne?: Player | PlayerDTO;
	playerTwo?: Player | PlayerDTO;
	ball?: Ball | BallDto;
	startingTime?: number;
	updateTime?: number;
    duration: number;
	lastGoal?: Player;
	winner?: UserDto;
	loser?: UserDto;
	maxGoal: number;
}