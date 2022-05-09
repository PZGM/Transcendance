import { MaxLength, MinLength, IsIn} from 'class-validator';
import { Channel } from 'src/typeorm/entities/channel';
import { User } from 'src/typeorm/entities/user';
import { Chat } from 'src/typeorm/entities/chat';
import { Mute } from 'src/typeorm/entities/mutedUser';
import { UserDto } from './user.dto';

export class RelationsPicker {
  withOwner?: boolean;
  withChat?: boolean;
  withMuted?:boolean;
}

export class MutedUserDto {
  constructor(mute?: Mute) {
    if (mute) {
      this.user = new UserDto(mute.user);
      this.endOfMute = mute.endOfMute;
      this.muter = new UserDto(mute.muter);
    }
  }
  user: UserDto;
  endOfMute: Date;
  muter: UserDto;
}

export class MessageDto {
  constructor(message?: Chat){
    if (message) {
      this.createdAt = message.createdAt;
      this.content = message.content;
      this.author = new UserDto(message.author);
    }
  }

  readonly createdAt: Date;
  readonly content: string;
  readonly author: UserDto;
}

export class ChannelDto {

    constructor (channel?: Channel) {
      if(channel) {
        if (channel.admin)
          this.admin = channel.admin.map((user) => {return new UserDto(user)});
        this.messages = channel.chats;
        this.mute = channel.mute;
        this.name = channel.name;
        if (this.owner)
          this.owner = new UserDto(channel.owner);
        if (this.users)
          this.users = channel.users.map((user) => {return new UserDto(user)});
        this.visibility = channel.visibility;
        this.password = channel.password;
      }
    }

  @MaxLength(30)
  @MinLength(2)
  readonly name: string;
  owner: UserDto;
  @IsIn(["public", "private", "protected"])
  readonly visibility: string;
  password?: string;
  readonly users: UserDto[];
  mute: Mute[];
  admin: UserDto[];
  readonly messages: Chat[];
  readonly id: number;
}

export class CreateChannelDto{
  name: string;
  visibility: string;
  password?: string;
  ownerId: number;
}