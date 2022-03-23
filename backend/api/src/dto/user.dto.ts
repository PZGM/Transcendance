import { Channel } from "src/typeorm/entities/channel";

export class UserDTO {
    id: number;
    intraID: string;
    login: string;
    firstName: string;
    lastName: string;
    img_url: string;
    status: number;
    friends: number[];
    twofaSecret?: string;
    twofa: boolean;
    ownedChannels: Channel[];
    joinedChannels: Channel[];
}