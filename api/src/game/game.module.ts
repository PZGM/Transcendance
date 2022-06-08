import { Module } from '@nestjs/common';
import { Game } from 'src/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusModule } from 'src/status/status.module'
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';
import { HistoryModule } from 'src/history/history.module';
import { UsersModule } from 'src/users/users.module';

@Module({
    providers: [GameService, GameGateway],
    controllers: [],
    imports: [StatusModule,
        UsersModule,
        HistoryModule,
        TypeOrmModule.forFeature([Game])],
    exports: [GameGateway]
})
export class GameModule {}