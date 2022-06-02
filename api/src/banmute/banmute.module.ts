import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BanmuteService } from './banmute.service';
import { BanmuteController } from './banmute.controller';
import { UsersModule } from 'src/users/users.module';
import { Channel } from 'src/typeorm/entities/channel';

@Module({
  imports: [TypeOrmModule.forFeature([Channel]), UsersModule],
  providers: [BanmuteService],
  controllers: [BanmuteController],
  exports: [BanmuteService],
})
export class BanmuteModule {}
