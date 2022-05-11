import { RoomDto } from "src/dto/game.dto";
import { UserDto } from "src/dto/user.dto";
import { Ball } from "./ball";
import { Player } from "./player";

export default class Room implements RoomDto {
    roomId: number;
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
    constructor(roomDto: RoomDto) {
		this.roomId = roomDto.roomId;
		this.status = 0;
		this.duration = 0;
        this.playerOne = new Player(roomDto.playerOne);
        this.playerTwo = new Player(roomDto.playerTwo);
		this.ball = new Ball(roomDto.ball);
		this.startingTime = Date.now();
        this.updateTime = this.startingTime;
		this.maxGoal = 10;
    }

    isPlayerOne(user: UserDto): boolean {
		return (this.playerOne.user.login === user.login);
	}

    isPlayerTwo(user: UserDto): boolean {
		return (this.playerTwo.user.login === user.login);
	}
	resetPosition(): void {
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
		if (this.ball.goal === -1)
		{
			this.playerOne.goal++;
			if (this.playerOne.goal === this.maxGoal)
			{
				this.winner = this.playerOne.user;
				this.loser = this.playerTwo.user;
				this.status = 3;
			}
			else
				this.status = 2;
		}
		else if (this.ball.goal === 1)
		{
			this.playerTwo.goal++;
			if (this.playerTwo.goal === this.maxGoal)
			{
				this.winner = this.playerTwo.user;
				this.loser = this.playerOne.user;
				this.status = 3;
			}
			else
				this.status = 2;
		}
		else
			this.status = 1;
	}
}