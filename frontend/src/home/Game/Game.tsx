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
		const user = await UserAPI.getUser()
		if (user) {
			this.props.gameSocket.userConnection(user.id);
			this.setState({
				userId: user.id
			});
		}
	}

	updateDisplay(type: number) {
		this.setState({
			display: type
		})
	}

	display()
	{
		console.log(`display: ${this.state.display}`)
		if (this.state.display === 0)
			return <PlayButton	socket={this.props.gameSocket}
								userId={this.state.userId}
								updateDisplay={this.updateDisplay}
					/>
		else if (this.state.display === 1)
			return <Loading/>
		else if (this.state.display === 2)
			return <Play room={this.props.room}
						socket={this.props.gameSocket}
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
					{this.display()}
				</div>
            </div>
		)
	}

}