import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/user';
import { ImagesModule } from 'src/images/images.module';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([User]),
    ImagesModule,
    ChatModule
  ],
  exports: [UsersService]
})
export class UsersModule {}
