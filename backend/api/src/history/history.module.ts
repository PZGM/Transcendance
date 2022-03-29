import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game, User } from 'src/typeorm';
import { UsersModule } from 'src/users/users.module';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';

@Module({
    controllers: [HistoryController],
    providers: [HistoryService],
    imports: [
      TypeOrmModule.forFeature([Game]),
    UsersModule
    ],

  })
  export class HistoryModule {}  