import { Module, forwardRef } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MessagesModule } from './message/messages.module';
import { UsersModule } from 'src/users/users.module';
import { ChannelsModule } from './channel/channels.module';
import { BanmuteModule } from 'src/banmute/banmute.module';

//forwardRed -> solve circular dependency

@Module({
  imports: [MessagesModule, UsersModule, BanmuteModule],
  controllers: [],
  providers: [ChatGateway],
  exports: [ChatGateway]
})
export class ChatModule {}
