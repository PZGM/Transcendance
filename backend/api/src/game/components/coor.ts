export class Setting {
  constructor(str: string) {
    if(str === 'Hard') {
      this.width = 20;
	    this.speed = 700;
	    this.r  = 25;
	    this.acceleration = 55;
    }
    else if(str === 'Medium'){
      this.width = 30;
	    this.speed = 550;
	    this.r  = 35;
	    this.acceleration = 45;
    }
    else {
      this.width = 40;
	    this.speed = 450;
	    this.r  = 45;
	    this.acceleration = 35;
    }
  }
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
    color: string;
    speed?: number;
    difficulty: string;
    setting?: Setting;
    screenSizeX: number;
    screenSizeY: number;
  }