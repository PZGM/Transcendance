import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import * as ormconfig from 'src/ormconfig';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [AuthModule,UsersModule, TypeOrmModule.forRoot(ormconfig),PassportModule.register({ session: true })],
  controllers: [],
  providers: [],
})
export class AppModule { }
