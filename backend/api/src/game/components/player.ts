import { PlayerDTO } from "src/dto/game.dto";
import { User } from "src/typeorm";
import { CoorI } from "./coor";

export class Player implements PlayerDTO {
	
    coor: CoorI;
    user: User;
	width: number;
	goal: number;

    constructor(user: User, playerDto: PlayerDTO) {
		this.user = user;

		this.width = playerDto.width;;
		this.coor.x = playerDto.coor.x;
		this.coor.y = (this.coor.screenSizeX / 2) - (this.width/2);
		this.coor.speed = playerDto.coor.speed;
		this.coor.dx = 0;
		this.coor.dy = 0;
		this.coor.color = playerDto.coor.color;
        this.goal = 0;
	}
    reset(): void { //the player paddle center isnt center for
		this.coor.y = (this.coor.screenSizeY / 2) - (this.width / 2);
	}
    update(time: number) : void {
        if(this.coor.dy > 0) {
			if(this.coor.y > 0)
				this.coor.y -= this.coor.speed * time;
			else
				this.coor.y = 0;
		}
		if(this.coor.dy < 0) {
			if(this.coor.y + this.width < this.coor.screenSizeY)
				this.coor.y += this.coor.speed * time;
			else
				this.coor.y = this.coor.screenSizeY - this.width;
		}
	}
}