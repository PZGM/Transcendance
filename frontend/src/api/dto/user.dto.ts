import { StatsDto } from "./stats.dto";

export interface UserDto {
    id: number;
    login: string;
    avatar: string;
    status: number;
    friends: number[];
    color: string;
    stats?: StatsDto;
    firstLog: boolean;
    blockedUsers?: UserDto[];


}
