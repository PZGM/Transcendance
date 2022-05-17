import { UserDto } from "./user.dto";

export interface ChannelDto {
    id: number;
    name: string;
    owner: UserDto;
    visibility: string
    password: string;
    users: UserDto[];
    admin: UserDto[]; 
}