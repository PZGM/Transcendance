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
    mute: MuttedDto[];
} 

export interface BannedDto{
    user: UserDto;
    endOfBan: Date;
    channel: ChannelDto;
}

export interface MuttedDto{
    user: UserDto;
    endOfMute: Date;
    channel: ChannelDto;
}