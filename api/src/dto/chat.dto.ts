import { MaxLength, MinLength, IsIn} from 'class-validator';
import { Ban } from 'src/typeorm/entities/BannedUser';
import { Channel } from 'src/typeorm/entities/channel';
import { Chat } from 'src/typeorm/entities/chat';
import { Mute } from 'src/typeorm/entities/mutedUser';
import { UserDto } from './user.dto';

export class RelationsPicker {
  withOwner?: boolean;
  withChat?: boolean;
  withMuted?: boolean;
  withAdmin?: boolean;
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

export class BannedUserDto {
  constructor(ban?: Ban) {
    if (ban) {
      this.user = new UserDto(ban.user);
      this.endOfBan = ban.endOfMute;
      this.banner = new UserDto(ban.banner);
    }
  }
  user: UserDto;
  endOfBan: Date;
  banner: UserDto;
}

export class MessageDto {
  constructor(message?: Chat){
    if (message) {
      if (message.channel)
        this.channelId = message.channel.id;
      this.content = message.content;
      this.authorId = message.author.id;
      this.service = message.service;
      this.date = message.createdDate;
    }
  }
  date: Date;
  service: boolean;
  channelId: number ;
  content: string;
  authorId: number;
}

export class CreateMessageDto {
  service: boolean;
  channelId: number ;
  content: string;
  authorId: number;
}

export class ChannelDto {
    constructor (channel?: Channel) {
      if(channel) {
        if (channel.admin)
          this.admin = channel.admin.map((user) => {return new UserDto(user)});
        if (channel.chats)
          this.messages = channel.chats.map((chat) => {return new MessageDto(chat)});
        this.mute = channel.mute;
        this.name = channel.name;
        if (channel.owner)
          this.owner = new UserDto(channel.owner);
        if (channel.users)
          this.users = channel.users.map((user) => {return new UserDto(user)});
        this.visibility = channel.visibility;
        this.id = channel.id;
      }
    }

  @MaxLength(30)
  @MinLength(2)
  readonly name: string;
  owner: UserDto;
  @IsIn(["public", "private", "protected"])
  readonly visibility: string;
  readonly users: UserDto[];
  mute: Mute[];
  admin: UserDto[];
  readonly messages: MessageDto[];
  readonly id: number;
}

export class CreateChannelDto{
  name: string;
  visibility: string;
  password?: string;
  ownerId: number;
}