import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AppGateway } from '../app.gateway';
import { User, Chat } from 'src/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Chat, User]), CacheModule.register()],
    controllers: [ChatController],
    providers: [ChatService, AppGateway],
})
export class ChatModule {}
