import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({})
export class ChatModule {
    providers: [ChatService, ChatGateway]
}
