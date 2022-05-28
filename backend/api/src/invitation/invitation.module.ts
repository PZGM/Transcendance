import { Module } from '@nestjs/common';
import { GameModule } from 'src/game/game.module';
import { InvitationController } from './invitation.controller';
import { InvitationService } from './invitation.service';

@Module({
  providers: [InvitationService],
  controllers: [InvitationController],
  imports: [GameModule],
  exports: [InvitationService]
})

export class InvitationModule {}
