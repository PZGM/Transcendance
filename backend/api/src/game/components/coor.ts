export const  screenSizeX: number = 1000;
export const  screenSizeY: number = 750;

export enum Difficulty {
	Easy,
	Medium,
	Hard
}

export class Setting
{
	constructor(difficulty : Difficulty)
	{
		if (difficulty === Difficulty.Hard)
		{
			this.width = 80;
			this.speed = 700;
			this.acceleration = 55;
			this.color = 'purple';
		}
		else if (difficulty === Difficulty.Medium)
		{
			this.width = 120;
			this.speed = 550;
			this.acceleration = 45;
			this.color = 'orange';
		}
		else if (difficulty === Difficulty.Easy)
		{
			this.width = 160;
			this.speed = 800;
			this.acceleration = 35;
			this.color = 'green';
		}
	}
	
	readonly color: string;
	readonly width: number;
	readonly speed: number;
	readonly acceleration : number;
}

export interface CoorI {
    x: number;
    y: number;
    dx: number;
    dy: number;
    speed?: number;
    color : string;
    difficulty: Difficulty;
    setting: Setting;
  }