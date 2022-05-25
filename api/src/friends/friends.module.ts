import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [FriendsService],
  controllers: [FriendsController],
  imports: [UsersModule]
})
export class FriendsModule {}
