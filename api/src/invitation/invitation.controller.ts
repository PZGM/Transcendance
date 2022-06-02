import { Controller, Put, Req, UseGuards, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomRequest } from '../utils/types'
import { FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { InvitationService } from './invitation.service';
import { Difficulty } from 'src/game/components/coor';

@ApiTags('Invitation')
@Controller('invitation')
export class InvitationController {

	constructor(private readonly invitationService: InvitationService) {}

	@Put('accept')
    @UseGuards(FullyAuthentificatedGuard)
    public async acceptInvitation(@Req() request: CustomRequest, @Body() acceptInvitationRequest: {senderId: number, receiverId: number, difficulty: Difficulty}) {
        console.log('acceptInvitation')
        const ret =  await this.invitationService.acceptInvitation(acceptInvitationRequest.senderId, acceptInvitationRequest.receiverId, acceptInvitationRequest.difficulty);
    }
}
