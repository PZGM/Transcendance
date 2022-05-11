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
    pOneScore: number;
    pTwoScore: number;
	maxGoal: number;
    constructor(roomDto: RoomDto) {
		this.roomId = roomDto.roomId;
		this.status = 0;
        this.playerOne = new Player(roomDto.playerOne);
        this.playerTwo = new Player(roomDto.playerTwo);
		this.ball = new Ball(roomDto.ball);
		this.startingTime = Date.now();
        this.updateTime = this.startingTime;
		this.maxGoal = 10;
        this.pOneScore = 0;
        this.pTwoScore = 0;
    }

    isPlayerOne(user: UserDto): boolean {
		return (this.playerOne.user.login === user.login);
	}

    isPlayerTwo(user: UserDto): boolean {
		return (this.playerTwo.user.login === user.login);
	}
}