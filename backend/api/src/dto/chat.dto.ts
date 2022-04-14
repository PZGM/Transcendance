import { MaxLength, MinLength, IsIn} from 'class-validator';
import { Channel } from 'src/typeorm/entities/channel';
import { User } from 'src/typeorm/entities/user';
import { Chat } from 'src/typeorm/entities/chat';
import { Mute } from 'src/typeorm/entities/mutedUser';

export class RelationsPicker {
  withOwner?: boolean;
  withChat?: boolean;
  withMuted?:boolean;
}

export class MuteUser {
  user: User;
  endOfMute: Date;
  muter: User;
}

export class MessageDto {
  readonly createdAt: Date;
  readonly content: string;
  readonly author: User;
  readonly channel: Channel;
}

export class ChannelDto {

    constructor (channel?: Channel) {
      if(channel) {
        this.admin = channel.admin;
        this.messages = channel.chats;
        this.mute = channel.mute;
        this.name = channel.name;
        this.owner = channel.owner;
        this.users = channel.users;
      }
    }

  @MaxLength(30)
  @MinLength(2)
  readonly name: string;
  owner: User;
  @IsIn(["public", "private", "protected"])
  readonly visibility: string;
  password?: string;
  readonly users: User[];
  mute: Mute[];
  admin: User[];
  readonly messages: Chat[];
  readonly id: number;
}