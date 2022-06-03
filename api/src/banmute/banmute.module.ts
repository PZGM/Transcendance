import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanmuteService } from './banmute.service';
import { BanmuteController } from './banmute.controller';
import { UsersModule } from 'src/users/users.module';
import { Channel } from 'src/typeorm/entities/channel';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [TypeOrmModule.forFeature([Channel]), UsersModule, ChatModule],
  providers: [BanmuteService],
  controllers: [BanmuteController],
  exports: [BanmuteService],
})
export class BanmuteModule {}
