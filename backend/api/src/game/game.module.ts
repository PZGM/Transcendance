import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

@Module({
    providers: [GameService, GameGateway],
    imports: [UsersModule]
})
export class GameModule {}