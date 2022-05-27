import { Component } from "react";
import '../../style/display.css';
import { PlayButton } from './PlayButton';
import { Loading } from './Loading';
import Restart from './Restart';
import { Play } from './Play';
import { Room } from '../../api/dto/game.dto';
import { GameSocketAPI } from "../../api/GameSocket.api";
import { UserAPI } from "../../api/Users.api";

interface GameProps {
	display: number,
	room?: Room,
	gameSocket: GameSocketAPI
}

interface GameState {
	display: number,
	userId: number
}

export class Game extends Component<GameProps, GameState>
{
	constructor(props: GameProps) {
		super(props);

		this.updateDisplay = this.updateDisplay.bind(this)
		
		console.log('Game constructor')
		this.state = {
			display: this.props.display,
			userId: 0
		}
		this.fetchUser()
	}

	componentDidUpdate() {
		if (this.props.display === 2 && this.props.display !== this.state.display)
			this.setState({
				display: this.props.display
			})
	}

	async fetchUser() {
		const user = await UserAPI.getMe()
		if (user) {
			this.props.gameSocket.userConnection(user.id);
			this.setState({
				userId: user.id
			});
		}
	}

<<<<<<< HEAD
=======
	recieveGameRoom(room: Room) {
		//console.log(room);
		this.setState({
			display: 2,
			room
		})
	}

	updateRoom (room: Room) {
		this.setState({room})
	}

>>>>>>> 52efbb5ca0f319dad0730297f16832b8093565f1
	updateDisplay(type: number) {
		this.setState({
			display: type
		})
	}

	display()
	{
<<<<<<< HEAD
		console.log(`display: ${this.state.display}`)
		if (this.state.display === 0)
			return <PlayButton	socket={this.props.gameSocket}
=======
		if (this.state.display === 0)
			return <PlayButton socket={this.gameSocket}
>>>>>>> 52efbb5ca0f319dad0730297f16832b8093565f1
								userId={this.state.userId}
								updateDisplay={this.updateDisplay}
					/>
		else if (this.state.display === 1)
			return <Loading/>
<<<<<<< HEAD
		else if (this.state.display === 2)
			return <Play room={this.props.room}
						socket={this.props.gameSocket}
						userId={this.state.userId}
					/>
=======
			else if (this.state.display === 2)
			return <Play room={this.state.room}
			socket={this.gameSocket}
			userId={this.state.userId}
			updateDisplay={this.updateDisplay}
			/> 
		else if (this.state.display === 3)
			return <Restart room={this.state.room}
			updateDisplay={this.updateDisplay}
			/>
>>>>>>> 52efbb5ca0f319dad0730297f16832b8093565f1
	}

    /* render the jsx */
    render()
	{
		console.log('RENDER GAME')
		return (
			<div className="background">
				<div className="frame_div">
					{this.display()}
				</div>
            </div>
		)
	}

}