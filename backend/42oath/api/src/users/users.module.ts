import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([User])
  ]
})
export class UsersModule {}
