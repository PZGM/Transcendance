import { Length } from "class-validator";
import { User } from "src/typeorm/entities/user";
import { Stats } from "src/typeorm/entities/stats";
import { Channel } from "src/typeorm";
import { ChannelDto } from "./chat.dto";

export class UserRelationsPicker {
    withChannels?: boolean;
    withBlocked?: boolean;
    withStats?: boolean;
    withGames?: boolean;
    withFriends?: boolean;
}

export class UserDto {

    constructor(user?: User) {
        if (user){
            this.id = user.id;
            this.login = user.login;
            this.avatar = user.avatar;
            this.status = user.status;
            if (user.blockedUsers)
                this.blockedUsers = user.blockedUsers.map((user) => {return new UserDto(user)});
            if (user.adminChannels)
                this.adminChannels = user.adminChannels.map((channel) => {return new ChannelDto(channel)});
            if (user.friends)
                this.friends = user.friends.map((friend) => {return new UserDto(friend)});
            this.color = user.color;
            this.stats = user.stats;
            this.firstLog = user.firstLog;
            this.roomId = user.roomId;
            this.socketIdTab = user.socketIdTab;
        }
    }
    id: number;
    roomId? : number;
    socketIdTab? : string[];
    login: string;
    avatar: string;
    status?: number; 
    blockedUsers?: UserDto[];
    adminChannels?: ChannelDto[];
    color: string;
    stats: Stats;
    firstLog: boolean;
    friends: UserDto[];
}

export class UpdateImageRequestDto{
    image: string;
}

export class UpdateLoginRequestDto{
    @Length(3, 10)
    login: string
}