import { CoorI, Difficulty, screenSizeX, screenSizeY, Setting } from "./coor";
import { BallDto } from "src/dto/game.dto";
import { Player } from "./player";

export class Ball implements BallDto { //extends?

    coor: CoorI;
    goal: number;
	r : number;

	constructor(difficulty : Difficulty) {
        
		this.coor = {
			setting : new Setting(difficulty),
			x : screenSizeX / 2,
			y : screenSizeY / 2,
			difficulty : difficulty,
			dy : 0,
			dx : 0,
			color : 'white',

		}
		this.coor.color = this.coor.setting.color;
		this.coor.dx = this.coor.setting.speed * (Math.random() < 0.5 ? 1 : -1);
		this.coor.speed = this.coor.setting.speed;
		this.r = this.coor.setting.width / (3 * (this.coor.difficulty + 1));
		this.goal = 0;

	}

	reset(): void {
        this.goal = 0;
		this.coor.x = screenSizeX / 2;
		this.coor.y = screenSizeY / 2;
		this.coor.speed = this.coor.setting.speed;
		this.coor.dy = 0;
        this.coor.dx = this.coor.setting.speed * ((this.coor.dx < 0) ? -1 : 1);
	}

	update(time: number, p1: Player, p2: Player): void {
		if (!this.collision(time, p1, p2)) {
			this.coor.x += this.coor.dx * time;
			this.coor.y += this.coor.dy * time;
		}
        if(this.coor.x + this.r >= screenSizeX) {
            p1.goal++;
            this.goal = 1;
        }
		else if(this.coor.x - this.r <= 0) {
			p2.goal++;
			this.goal = -1;
		}
	}

	collision(time: number, p1: Player, p2: Player) : boolean {
		if((this.coor.y + (this.coor.dy * time)) - this.r <= 0 || //border Collision
            (this.coor.y + (this.coor.dy * time)) + this.r >= screenSizeY)
			this.coor.dy = -this.coor.dy;
		return(this.playerCollision(time, p1, p2)) // player collision
	}

	playerCollision(time: number, p1: Player, p2: Player): boolean {
		if (this.coor.x <  screenSizeX / 2) {
			if (((this.coor.x + (this.coor.dx * time)) - this.r) < p1.coor.x + p1.width)
			{
				if ((this.coor.y + this.r >= p1.coor.y && this.coor.y + this.r <= p1.coor.y + p1.width)
				|| (this.coor.y - this.r >= p1.coor.y && this.coor.y - this.r <= p1.coor.y + p1.width))
				{
					this.coor.x = (p1.coor.x + p1.width) + this.r;
					return this.coorAfterCollision(p1, p2);
				}
			}
		}
		else {
			if (((this.coor.x + (this.coor.dx * time)) + this.r) > p2.coor.x)
			 {
				 if ((this.coor.y + this.r >= p2.coor.y && this.coor.y + this.r <= p2.coor.y + p2.width) //is this optimisable?
				 || ( this.coor.y - this.r >= p2.coor.y && this.coor.y - this.r <= p2.coor.y + p2.width))
				{
					this.coor.x = p2.coor.x - this.r;
					return this.coorAfterCollision(p1, p2);
				}
			 }
		}
		return false;
	}

    coorAfterCollision(p1: Player, p2: Player) : boolean {
        this.coor.speed += this.coor.setting.acceleration;
        const player = (this.coor.x < screenSizeX / 2) ? p1 : p2;
        const cc = (this.coor.y - (player.coor.y + player.width/2)) / (player.width / 2);
        const angle = cc * Math.PI / 4;
        const dir = (this.coor.x < screenSizeX / 2) ? 1 : -1;
        this.coor.dx = dir * (this.coor.setting.speed * Math.cos(angle));
        this.coor.dy = this.coor.setting.speed * Math.sin(angle);
        return true;
    }
}
