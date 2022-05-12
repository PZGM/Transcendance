import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { GameService } from './game.service';

@Module({
    providers: [GameService],
    imports: [UsersModule]
})
export class GameModule {}