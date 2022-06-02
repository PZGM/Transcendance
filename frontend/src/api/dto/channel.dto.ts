import { UserDto } from "./user.dto";

export interface ChannelDto {
    id: number;
    name: string;
    owner: UserDto;
    visibility: string
    password: string;
    users: UserDto[];
    admin: UserDto[];
    ban: BannedDto[];
} 

export interface BannedDto{
    user: UserDto;
    endOfBan: Date;
    channel: ChannelDto;
}