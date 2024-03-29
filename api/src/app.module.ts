import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as ormconfig from 'src/ormconfig';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { ImagesModule } from './images/images.module';
import { StatusModule } from './status/status.module';
import { FriendsModule } from './friends/friends.module';
import { HistoryModule } from './history/history.module';
import { StatsModule } from './stats/stats.module';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat/chat.gateway';
import { GameModule } from './game/game.module';
import { InvitationModule } from './invitation/invitation.module';
import { BanmuteModule } from './banmute/banmute.module';

@Module({
  imports: [AuthModule, 
            UsersModule,
            GameModule,
            ChatModule,
            TypeOrmModule.forRoot(ormconfig),
            PassportModule.register({ session: true }),
            ImagesModule,
            StatusModule,
            FriendsModule,
            HistoryModule,
            StatsModule,
            InvitationModule,
            BanmuteModule],
  controllers: [],
  providers: []
})

export class AppModule { }
