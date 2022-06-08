import { Component } from "react";
import '../../style/display.css';
import { Room } from '../../api/dto/game.dto';
import Canvas from './Canvas';
import { GameSocketAPI } from '../../api/GameSocket.api';
import { Stack } from "@mui/material";


interface PlayProps {
	room?: Room,
	socket: GameSocketAPI,
	userId: number,
	updateDisplay: any
};

interface PlayState {
	key: string
};

export class Play extends Component<PlayProps, PlayState>
{
	handleQuit() {
		if (this.props.room)
			this.props.socket.leaveRoom(this.props.userId, this.props.room.roomId)
	}

	render () {
		
		if (!this.props.room)
			return (
				<div className="grid_item_style" style={{color: 'white'}}>LOADING...</div>
			)
		else
			return (
				<Stack direction="column" alignItems="center"
				>
					{this.props.userId !== this.props.room.pOne.id &&
					this.props.userId !== this.props.room.pTwo.id &&
						<div className={"score bit5x5 white"} style={{fontSize: '2vw', marginTop: '0.1vw'}}>
							SPECTATE MODE
						</div>
					}
					<Stack direction='row'
						justifyContent="space-between"
						alignItems="center"
						spacing={3}
						className="score"
					>
						<div className="score bit5x3 white">
							{this.props.room.pOneScore}
						</div>
							
						<div className={"score bit5x5 " + this.props.room.pOne.color}>
							{this.props.room.pOne.login}
						</div>
						<div className="score arcade white" style={{fontSize: '2vw'}}>
							vs
						</div>
						<div className={"score bit5x5 " + this.props.room.pTwo.color}>
							{this.props.room.pTwo.login}
						</div>
						
						<div className="score bit5x3 white">
							{this.props.room.pTwoScore}
						</div>
					
					</Stack>

					<div className="game_frame">
						<Canvas	room={this.props.room}
								socket={this.props.socket}
								userId={this.props.userId}
								updateDisplay={this.props.updateDisplay}
						/>
					</div>
					
					<div className="leave_game_button but_red"
						onClick={this.handleQuit.bind(this)}>
						QUIT
					</div>

				</Stack>
			)
	}
}