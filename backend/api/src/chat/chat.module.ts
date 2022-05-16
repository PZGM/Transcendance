import { forwardRef, Module } from '@nestjs/common';
import { ChannelsModule } from './channel/channels.module';
import { ChatGateway } from './chat.gateway';
import { MessagesModule } from './message/messages.module';

//forwardRed -> solve circular dependency

@Module({
  imports: [MessagesModule],
  controllers: [],
  providers: [ChatGateway],
  exports: [ChatGateway]
})
export class ChatModule {}
