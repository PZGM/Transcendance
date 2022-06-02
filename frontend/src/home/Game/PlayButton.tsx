import { Component } from "react";
import '../../style/display.css';
import '../../style/buttons.css';
import { GameSocketAPI } from "../../api/GameSocket.api";
import { Stack } from "@mui/material";

interface PlayButtonProps {
	socket: GameSocketAPI,
	userId: number,
	updateDisplay: any
};

interface PlayButtonState {
	display: number
};



export class PlayButton extends Component<PlayButtonProps, PlayButtonState>
{
	constructor(props: PlayButtonProps) {
		super(props)

		this.state = {
			display: 0
		}
	}

	queueHandler(difficulty: number) {
		console.log("Im not here");
		this.props.socket.joinQueue(this.props.userId, difficulty)
		this.props.updateDisplay(1)
	}

	display() {
		if (this.state.display === 0) {
			return (
					<div className="play_button" onClick={() => {this.setState({display: 1})}}>
						Play Game
					</div>
			)
		}
		else if (this.state.display === 1) {
			return (
				<Stack direction='column'
						className='grid_item_style'
						justifyContent='space-evenly'
						spacing={3}
						style={{height: '100%',
								width: '100%'}}
				>
					<div className="white">Select the difficulty</div>
					<Stack direction='row'
						spacing={2}>
						<div className="difficulty_button but_green"
						onClick={() => {this.queueHandler(0)}}
						>
							Easy
						</div>
						<div className="difficulty_button but_yellow"
							onClick={() => {this.queueHandler(1)}}
						>
							Medium
						</div>
						<div className="difficulty_button but_red"
							onClick={() => {this.queueHandler(2)}}
						>
							Hard
						</div>
					</Stack>
				</Stack>
			)
		}
	}

	render () {
		return (
			<div className="game_frame">
				{this.display()}
			</div>
		)
	}
}