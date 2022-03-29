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

@Module({
  imports: [AuthModule,UsersModule, TypeOrmModule.forRoot(ormconfig),PassportModule.register({ session: true }), ImagesModule, StatusModule, FriendsModule, HistoryModule],
})
export class AppModule { }
