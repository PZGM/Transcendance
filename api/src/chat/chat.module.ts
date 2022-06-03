import { Module, forwardRef } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MessagesModule } from './message/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanmuteModule } from 'src/banmute/banmute.module';
import { Channel } from 'src/typeorm/entities/channel';

//forwardRed -> solve circular dependency

@Module({
  imports: [MessagesModule, TypeOrmModule.forFeature([Channel])],
  controllers: [],
  providers: [ChatGateway],
  exports: [ChatGateway]
})
export class ChatModule {}
