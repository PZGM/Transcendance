import { Component } from "react";
import '../../style/display.css';
import { PlayButton } from './PlayButton';
import { Loading } from './Loading';
import { Play } from './Play';
import { RoomDto } from '../../api/dto/game.dto';
import { GameSocketAPI } from "../../api/GameSocket.api";

interface GameProps {}

interface GameState {
	room: RoomDto | undefined;
	display: number;
}

export class Game extends Component<GameProps, GameState>
{
	gameSocket: GameSocketAPI;

	constructor(props: GameProps) {
		super(props);

		this.gameSocket = new GameSocketAPI({receiveGameRoom: this.recieveGameRoom.bind(this),
											receiveSpectRoom: this.recieveSpectRoom.bind(this),
											updateRoom: this.updateRoom.bind(this)})
		this.state = {
			room: undefined,
			display: 2,
		}
	}

	recieveGameRoom(room: RoomDto) {
		this.setState({room})
	}

	recieveSpectRoom() {

	}

	updateRoom () {

	}

	display()
	{
		if (this.state.display == 0)
			return <PlayButton/>
		else if (this.state.display == 1)
			return <Loading/>
		else if (this.state.display == 2)
			return <Play room={this.state.room}/>
	}

    /* render the jsx */
    render()
	{
		return (
			<div className="background">
				<div className="frame_div">
					{this.display()}
				</div>
            </div>
		)
	}

}