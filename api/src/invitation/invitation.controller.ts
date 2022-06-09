import { Controller, Put, Req, UseGuards, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CustomRequest } from '../utils/types'
import { FullyAuthentificatedGuard } from 'src/auth/controllers/auth/guards';
import { InvitationService } from './invitation.service';
import { Difficulty } from 'src/game/components/coor';
import { Logger } from '@nestjs/common';

@ApiTags('Invitation')
@Controller('invitation')
export class InvitationController {

	constructor(private readonly invitationService: InvitationService) {}
	private logger = new Logger("InvitationsController")

	@Put('accept')
    @UseGuards(FullyAuthentificatedGuard)
    public async acceptInvitation(@Req() request: CustomRequest, @Body() acceptInvitationRequest: {senderId: number, receiverId: number, difficulty: Difficulty}) {
        this.logger.log("acceptInvitation");
        this.invitationService.acceptInvitation(acceptInvitationRequest.senderId, acceptInvitationRequest.receiverId, acceptInvitationRequest.difficulty);
    }

    @Put('watch/:id')
    @UseGuards(FullyAuthentificatedGuard)
    public async watchUser(@Req() request: CustomRequest, @Param('id') id: number) {
        this.logger.log("watchUser");
        this.invitationService.watchUser(request.user.id, id);
    }
}
