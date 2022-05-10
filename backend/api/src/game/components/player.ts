import { PlayerDTO } from "src/dto/game.dto";
import { UserDto } from "src/dto/user.dto";
import { CoorI } from "./coor";

export class Player implements PlayerDTO {
	
    coor: CoorI;
    user: UserDto
	width: number;
	goal: number;
}