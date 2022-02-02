import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as ormconfig from 'src/ormconfig';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [AuthModule,UsersModule, TypeOrmModule.forRoot(ormconfig),PassportModule.register({ session: true }), ImagesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
