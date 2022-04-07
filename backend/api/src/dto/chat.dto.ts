import { MaxLength, MinLength, IsIn} from 'class-validator';
import { Channel } from 'src/typeorm/entities/channel';
import { User } from 'src/typeorm/entities/user';
import { Chat } from 'src/typeorm/entities/chat';
  
export class CreateMessageDto {
  readonly createdAt: Date;
  readonly content: string;
  readonly author: User;
  readonly channel: Channel;
}
  
export class CreateChannelDto {
  @MaxLength(30)
  @MinLength(2)
  readonly name: string;
  owner: User;
  @IsIn(["public", "private", "protected"])
  readonly visibility: string;
  readonly password?: string;
  readonly users: User[];
  readonly messages: Chat[];
}