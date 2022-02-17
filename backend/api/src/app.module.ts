import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as ormconfig from 'src/ormconfig';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { PassportModule } from '@nestjs/passport';
import { ImagesModule } from './images/images.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [AuthModule,UsersModule, ChatModule, TypeOrmModule.forRoot(ormconfig),PassportModule.register({ session: true }), ImagesModule, StatusModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
