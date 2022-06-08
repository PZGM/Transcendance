import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  controllers: [StatusController],
  providers: [StatusService],
  imports: [UsersModule],
  exports: [StatusService]
})
export class StatusModule {}
