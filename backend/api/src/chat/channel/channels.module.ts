import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Channel } from 'src/typeorm/entities/channel';
import { UsersModule } from 'src/users/users.module';
import { ChatModule } from '../chat.module';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';



@Module({
  imports: [TypeOrmModule.forFeature([Channel]),
            UsersModule, ChatModule],
  controllers: [ChannelsController],
  providers: [ChannelsService],
  exports: [ChannelsService]
})
export class ChannelsModule {}
