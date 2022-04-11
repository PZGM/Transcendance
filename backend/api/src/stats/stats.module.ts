import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stats } from 'src/typeorm';
import { UsersModule } from 'src/users/users.module';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';

@Module({
  controllers: [StatsController],
  imports: [UsersModule,
            TypeOrmModule.forFeature([Stats]),],
  providers: [StatsService],
  exports: [StatsService]
})
export class StatsModule {}
