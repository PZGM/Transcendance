import { RoomDto, roomEnum } from "src/dto/game.dto";
import { UserDto } from "src/dto/user.dto";
import { Ball } from "./ball";
import { Difficulty } from "./coor";
import { PInit, Player } from "./player";

export default class Room implements RoomDto {
    roomId: string;
	status?: number;
	playerOne: Player;
	playerTwo: Player;
	ball: Ball;
	startingTime?: number;
	updateTime?: number;
	lastGoal?: Player;
	winner?: UserDto;
	loser?: UserDto;
	maxGoal: number;
	duration?: number;
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

	update(): void {
		this.updateTime = Date.now();
		this.duration = (this.updateTime - this.startingTime) / 1000;
		this.playerOne.update(this.duration);
		this.playerTwo.update(this.duration);
		this.ball.update(this.duration, this.playerOne, this.playerTwo);
		if (this.ball.goal === -1 || this.playerOne.goal === this.maxGoal)
		{
			this.playerOne.goal++;
			if (this.playerOne.goal >= this.maxGoal)
			{
				this.winner = this.playerOne.user;
				this.loser = this.playerTwo.user;
				this.status = roomEnum.end;
			}
			else
				this.status = roomEnum.goal;
		}
		else if (this.ball.goal === 1 || this.playerTwo.goal === this.maxGoal)
		{
			this.playerTwo.goal++;
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
	}
}