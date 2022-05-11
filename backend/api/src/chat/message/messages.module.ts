import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/typeorm/entities/chat';
import { UsersModule } from 'src/users/users.module';
import { ChannelsModule } from '../channel/channels.module';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), UsersModule, ChannelsModule],
  controllers: [MessagesController],
  providers: [MessagesService]
})
export class MessagesModule {}
