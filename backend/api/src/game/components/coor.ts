export const  screenSizeX: number = 720;
export const  screenSizeY: number = 420;

export enum Difficulty {
  Easy,
  Medium,
  Hard
}

export class Setting {
  constructor(difficulty : Difficulty) {
    if(difficulty = Difficulty.Hard) {
      this.width = 20;
	    this.speed = 700;
	    this.r  = 25;
	    this.acceleration = 55;
      this.color = 'purple';
    }
    else if(difficulty = Difficulty.Medium){
      this.width = 30;
	    this.speed = 550;
	    this.r  = 35;
	    this.acceleration = 45;
      this.color = 'orange';
    }
    else {
      this.width = 40;
	    this.speed = 450;
	    this.r  = 45;
	    this.acceleration = 35;
      this.color = 'green';
    }
  }
  readonly color: string;
  readonly width: number;
	readonly speed: number;
	readonly r : number;
	readonly acceleration : number;
}

export interface CoorI {
    x?: number;
    y?: number;
    dx?: number;
    dy?: number;
    speed?: number;
    color? : string;
    difficulty: Difficulty;
    setting?: Setting;
  }