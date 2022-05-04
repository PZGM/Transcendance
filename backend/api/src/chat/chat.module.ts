import { Module } from '@nestjs/common';
import { ChannelsModule } from './channel/channels.module';
import { ChatGateway } from './chat.gateway';
import { MessagesModule } from './message/messages.module';


@Module({
  imports: [ChannelsModule, MessagesModule],
  controllers: [],
  providers: [ChatGateway],
  exports: []
})
export class ChatModule {}
