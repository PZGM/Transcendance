import { Component } from "react";
import '../../style/display.css';
import { PlayButton } from './PlayButton';
import { Loading } from './Loading';
import { Play } from './Play';
import { Room } from '../../api/dto/game.dto';
import { GameSocketAPI } from "../../api/GameSocket.api";
import { UserDto } from "../../api/dto/user.dto";
import { UserAPI } from "../../api/Users.api";

interface GameProps {
	userStatus: number
}

interface GameState {
	room?: Room,
	display: number,
	userId: number
}

export class Game extends Component<GameProps, GameState>
{
	gameSocket: GameSocketAPI;

	constructor(props: GameProps) {
		super(props);

		this.gameSocket = new GameSocketAPI({receiveGameRoom: this.recieveGameRoom.bind(this),
						updateRoom: this.updateRoom.bind(this)})
		this.updateDisplay = this.updateDisplay.bind(this)
		
		this.state = {
			room: undefined,
			display: this.props.userStatus,
			userId: 0
		}
		this.fetchUser()
	}

	async fetchUser() {
		const user = await UserAPI.getUser()
		if (user) {
			console.log(user);
			this.gameSocket.userConnection(user.id);
			this.setState({ userId: user.id });
		}
	}

	recieveGameRoom(room: Room) {
		console.log(room);
		this.setState({
			display: 2,
			room
		})
	}

	updateRoom (room: Room) {
		console.log('UPDATE ROOM')
		this.setState({room})
	}

	updateDisplay(type: number) {
		this.setState({
			display: type
		})
		console.log('updateDisplay')
	}

	display()
	{
		if (this.state.display == 0)
			return <PlayButton socket={this.gameSocket}
								userId={this.state.userId}
								updateDisplay={this.updateDisplay}
					/>
		else if (this.state.display == 1)
			return <Loading/>
		else if (this.state.display == 2)
			return <Play room={this.state.room}
						socket={this.gameSocket}
						userId={this.state.userId}
					/> 
	}

    /* render the jsx */
    render()
	{
		console.log('RENDER GAME')
		return (
			<div className="background">
				<div className="frame_div">
					<div className="game_frame">
						{this.display()}
					</div>
				</div>
            </div>
		)
	}

}