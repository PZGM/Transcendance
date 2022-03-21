import { IsDate, IsNotEmpty, IsString, MaxLength, MinLength, IsIn, IsOptional } from 'class-validator';
import { Channel } from 'src/typeorm/entities/channel';
import { User } from 'src/typeorm/entities/user';
import { Chat } from 'src/typeorm/entities/chat';
  
  export class CreateMessageDto {
    @IsNotEmpty()
    @IsDate()
    readonly createdAt: Date;
  
    @IsNotEmpty()
    @IsString()
    @MaxLength(640)
    readonly content: string;
  
    @IsNotEmpty()
    readonly author: User;
  
    @IsNotEmpty()
    readonly channel: Channel;
  }
  
  export class CreateChannelDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @MinLength(2)
    readonly name: string;
  
    @IsNotEmpty()
    readonly owner: User;
  
    @IsString()
    @IsIn(["public", "private", "protected"])
    readonly visibility: string
  
    @IsOptional()
    @IsString()
    @MaxLength(50)
    @MinLength(8)
    readonly password?: string;
  
    readonly users: User[];
  
    @IsOptional()
    readonly messages: Chat[];
  }
  