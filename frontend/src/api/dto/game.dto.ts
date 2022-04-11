import { UserDto } from "./user.dto";

export interface GameDto {
    id: number,
    duraton: number,
    winnerId: number,
    loserId: number,
    winnerScore: number,
    loserScore: number,
    players: UserDto[],
    createdDate: Date,
}