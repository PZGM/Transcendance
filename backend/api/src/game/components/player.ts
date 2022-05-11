import { PlayerDTO } from "src/dto/game.dto";
import { UserDto } from "src/dto/user.dto";
import { CoorI, Setting } from "./coor";

export class Player implements PlayerDTO {
	
    coor: CoorI;
    user: UserDto;
	width: number;
	goal: number;

    constructor(playerDto: PlayerDTO) {
		
		this.coor.setting = new Setting(playerDto.coor.difficulty)
		this.user = playerDto.user;
		this.width = playerDto.coor.setting.width;
		this.coor.x = playerDto.coor.x;
		this.coor.y = (this.coor.screenSizeX / 2) - (this.width/2);
		this.coor.setting.speed;
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
				this.coor.y -= this.coor.setting.speed * time;
			else
				this.coor.y = 0;
		}
		if(this.coor.dy < 0) {
			if(this.coor.y + this.width < this.coor.screenSizeY)
				this.coor.y += this.coor.setting.speed * time;
			else
				this.coor.y = this.coor.screenSizeY - this.width;
		}
	}
}