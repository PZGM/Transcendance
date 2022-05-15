import { Component } from "react";
import '../../style/display.css';
import { RoomDto } from '../../api/dto/game.dto';


interface PlayProps {
	room: RoomDto;
	
};

interface PlayState {

};



export class Play extends Component<PlayProps, PlayState>
{
	render () {
		return (
			<>
				<div className="game_frame">
					<div></div>
				</div>
			</>
		)
	}
}