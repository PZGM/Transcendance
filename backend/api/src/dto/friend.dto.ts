import { IsPositive } from "class-validator";

export class FriendRequestDto {
    @IsPositive()
    id: number;
}