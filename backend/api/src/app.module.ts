import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as ormconfig from 'src/ormconfig';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { ImagesModule } from './images/images.module';
import { StatusModule } from './status/status.module';
import { FriendsModule } from './friends/friends.module';
import { AppGateway } from './app.gateway';
import { ChannelsModule } from './chat/channel/channels.module';
import { MessagesModule } from './chat/message/messages.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ChatGateway } from './chat/chat.gateway';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [AuthModule,UsersModule, ChannelsModule, MessagesModule, TypeOrmModule.forRoot(ormconfig),PassportModule.register({ session: true }), ImagesModule, StatusModule, FriendsModule, HistoryModule],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule { }
