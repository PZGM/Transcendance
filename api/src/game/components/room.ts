import { RoomDto, roomEnum } from "src/dto/game.dto";
import { UserDto } from "src/dto/user.dto";
import { Ball } from "./ball";
import { Difficulty } from "./coor";
import { PInit, Player } from "./player";

export default class Room implements RoomDto
{
    roomId: string;
	status: number;
	playerOne: Player;
	playerTwo: Player;
	ball: Ball;
	startingTime: number;
	updateTime: number;
	lastGoal?: Player;
	winner?: UserDto;
	loser?: UserDto;
	maxGoal: number;
	duration: number;
   
	constructor(roomId: string ,difficulty: Difficulty, p1: UserDto, p2: UserDto) {
		this.roomId = roomId;
		this.status = roomEnum.waiting;
		this.duration = 0;
        this.playerOne = new Player(new PInit(difficulty, 1 , p1));
        this.playerTwo = new Player(new PInit(difficulty, 2 , p2));
		this.ball = new Ball(difficulty);
		this.startingTime = Date.now();
        this.updateTime = this.startingTime;
		this.maxGoal = 10;
    }

	length() : number {
		let i : number = 0;
		if (this.playerOne != null)
			i++;
		if (this.playerTwo != null)
			i++;
		return i;
	}

    isPlayerOne(user: UserDto): boolean {
		return (this.playerOne.user.login === user.login);
	}

    isPlayerTwo(user: UserDto): boolean {
		return (this.playerTwo.user.login === user.login);
	}

	isPlayer(user: UserDto): boolean {
		return (this.isPlayerOne(user) || this.isPlayerTwo(user));
	}

	removeUser(user: UserDto) : boolean {
		if (!this.isPlayer(user))
		return false;
		if (this.isPlayerOne(user))
			this.playerOne = null;
		if (this.isPlayerTwo(user))
			this.playerTwo = null;
		return true;
	}

	reset(): void {
		this.playerOne.reset();
		this.playerTwo.reset();
		this.ball.reset();
	}

	toFront(){
		return {
				ballX: this.ball.coor.x,
				ballY: this.ball.coor.y,
				ballR : this.ball.r,
				ballColor : this.ball.coor.setting.color,
				
				pOne: this.playerOne.user,
				pOneX : this.playerOne.coor.x,
				pOneY : this.playerOne.coor.y,
				pOneSize : this.playerOne.width,
				pOneScore : this.playerOne.goal,

				pTwo: this.playerTwo.user,
				pTwoX : this.playerTwo.coor.x,
				pTwoY : this.playerTwo.coor.y,
				pTwoSize : this.playerTwo.width,
				pTwoScore : this.playerTwo.goal,
				
				roomId : this.roomId,
				status : this.status
		}
	}

	toFrontEnd(){
		return {
				ballX: this.ball.coor.x,
				ballY: this.ball.coor.y,
				ballR : this.ball.r,
				ballColor : this.ball.coor.setting.color,
				
				pOne: this.playerOne.user,
				pOneX : this.playerOne.coor.x,
				pOneY : this.playerOne.coor.y,
				pOneSize : this.playerOne.width,
				pOneScore : this.playerOne.goal,

				pTwo: this.playerTwo.user,
				pTwoX : this.playerTwo.coor.x,
				pTwoY : this.playerTwo.coor.y,
				pTwoSize : this.playerTwo.width,
				pTwoScore : this.playerTwo.goal,
				
				roomId : this.roomId,
				status : roomEnum.end
		}
	}

	update(): number
	{
		const now = (Date.now() - this.updateTime) / 1000;
		
		this.playerOne.update(now);
		this.playerTwo.update(now);
		this.ball.update(now, this.playerOne, this.playerTwo);
		
		this.updateTime = Date.now();
		this.duration = (this.updateTime - this.startingTime);
		
		if (this.ball.goal === 1 || this.playerOne.goal === this.maxGoal)
		{
			if (this.playerOne.goal >= this.maxGoal)
			{
				this.winner = this.playerOne.user;
				this.loser = this.playerTwo.user;
				this.status = roomEnum.end;
			}
			else 
				this.status = roomEnum.goal;
		}
		else if (this.ball.goal === -1 || this.playerTwo.goal === this.maxGoal)
		{
			if (this.playerTwo.goal >= this.maxGoal)
			{
				this.winner = this.playerTwo.user;
				this.loser = this.playerOne.user;
				this.status = roomEnum.end;
			}
			else
				this.status = roomEnum.goal;
		}
		else
			this.status = roomEnum.playing;
		return this.status;
	}
}