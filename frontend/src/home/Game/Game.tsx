import { Component } from "react";
import '../../style/display.css';
import { PlayButton } from './PlayButton';
import { Loading } from './Loading';
import { Play } from './Play';
import { Room } from '../../api/dto/game.dto';
import { GameSocketAPI } from "../../api/GameSocket.api";
import Restart from "./Restart";
import { UserAPI } from "../../api/Users.api";

interface GameProps {}

interface GameState {
	display: number,
	room?: Room,
	userId: number
}

export class Game extends Component<GameProps, GameState>
{
	gameSocket: GameSocketAPI
	
	constructor(props: GameProps) {
		super(props);

		this.gameSocket = new GameSocketAPI({
								receiveGameRoom: this.receiveGameRoom.bind(this),
								updateRoom: this.updateRoom.bind(this)})

		this.updateDisplay = this.updateDisplay.bind(this)

		this.state = {
			display: 0,
			room: undefined,
			userId: 0
		}

		this.fetchUser()
	}

	async fetchUser() {
		const user = await UserAPI.getMe();
		if (user) {
			this.gameSocket.userConnection(user.id);
			this.setState({
				userId: user.id
			})
		}
	}

	receiveGameRoom(room: Room) {
		console.log(room);
		this.setState({
			room,
			display: 2
		})
	}

	updateRoom (room: Room) {
		this.setState({room})
	}

	updateDisplay(type: number) {
		console.log(`UPDATE DISPLAY: ${type}`)
		this.setState({
			display: type
		})
	}

	display()
	{
		// console.log(`display: ${this.state.display}`)
		if (this.state.display === 0)
			return <PlayButton	socket={this.gameSocket}
								userId={this.state.userId}
								updateDisplay={this.updateDisplay}
					/>
		else if (this.state.display === 1)
			return <Loading/>
		else if (this.state.display === 2)
			return <Play room={this.state.room}
						socket={this.gameSocket}
						userId={this.state.userId}
						updateDisplay={this.updateDisplay}
					/>
		else if (this.state.display === 3)
			return <Restart room={this.state.room}
							socket={this.gameSocket}
							userId={this.state.userId}
							updateDisplay={this.updateDisplay}
					/>
	}

    /* render the jsx */
    render()
	{
		// console.log('RENDER GAME')
		return (
			<div className="background">
				<div className="frame_div">
					{this.display()}
				</div>
            </div>
		)
	}

}