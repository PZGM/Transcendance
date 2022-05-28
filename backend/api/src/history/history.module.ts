import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsModule } from 'src/stats/stats.module';
import { Game, User } from 'src/typeorm';
import { UsersModule } from 'src/users/users.module';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
    controllers: [HistoryController],
    providers: [HistoryService],
    imports: [
      TypeOrmModule.forFeature([Game]),
      UsersModule,
      StatsModule
    ],
    exports: [HistoryService]

  })
  export class HistoryModule {}  