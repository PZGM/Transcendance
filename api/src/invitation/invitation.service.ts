import { Injectable } from '@nestjs/common';
import { Difficulty } from 'src/game/components/coor';
import { GameGateway } from 'src/game/game.gateway';

@Injectable()
export class InvitationService {

	constructor(private gameGateway: GameGateway) {}

	public acceptInvitation(senderId: number, receiverId: number, difficulty: Difficulty): boolean {
		if (this.gameGateway.handleRoomInvite(senderId, receiverId, difficulty))
			return true;

		return false;
	}
}
