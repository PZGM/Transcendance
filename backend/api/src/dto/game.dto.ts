import { Game } from '../typeorm/entities/game'
import { UserDto } from './user.dto'
import { CoorI } from 'src/game/components/coor';

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
    r: number;
	acceleration: number;
    goal: number;

}

export class PlayerDTO {
	
    user: UserDto;
    coor: CoorI;
	width: number;
	goal: number;
}