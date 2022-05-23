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
	userStatus: number,
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
		
		this.state = {
			display: this.props.userStatus,
			userId: 0
		}
		this.fetchUser()
	}

	async fetchUser() {
		const user = await UserAPI.getUser()
		if (user) {
			console.log(user);
			this.props.gameSocket.userConnection(user.id);
			this.setState({ userId: user.id });
		}
	}

	updateDisplay(type: number) {
		this.setState({
			display: type
		})
	}

	display()
	{
		if (this.state.display == 0)
			return <PlayButton socket={this.props.gameSocket}
								userId={this.state.userId}
								updateDisplay={this.updateDisplay}
					/>
		else if (this.state.display == 1)
			return <Loading/>
		else if (this.state.display == 2)
			return <Play room={this.props.room}
						socket={this.props.gameSocket}
						userId={this.state.userId}
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