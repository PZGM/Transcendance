import { UserDto } from "./user.dto";

export interface GameDto {
    roomId: string,
    duration: number,
    winnerId: number,
    loserId: number,
    winnerScore: number,
    loserScore: number,
    players: UserDto[],
    createdDate: Date,
}