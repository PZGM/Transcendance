import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MessagesModule } from './message/messages.module';
import { UsersModule } from 'src/users/users.module';

//forwardRed -> solve circular dependency

@Module({
  imports: [MessagesModule, UsersModule],
  controllers: [],
  providers: [ChatGateway],
  exports: [ChatGateway]
})
export class ChatModule {}
