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
	render () {
		if (!this.props.room)
			return (
				<div className="grid_item_style" style={{color: 'white'}}>LOADING...</div>
			)
		else
			return (
				<Stack direction="column"
				>
					
					<Stack direction='row'
						justifyContent="space-between"
						alignItems="center"
						spacing={3}
						className="score"
					>
						<div className="score bit5x3 white">
							{this.props.room.pOneScore}
							{/* 2 */}
						</div>
							
						<div className={"score bit5x5 " + this.props.room.pOne.color}>
						{/* <div className={"score bit5x5 red"}> */}
							{this.props.room.pOne.login}
							{/* FMANETTI */}
						</div>
						<div className="score arcade white" style={{fontSize: '2vw'}}>
							vs
						</div>
						<div className={"score bit5x5 " + this.props.room.pTwo.color}>
						{/* <div className={"score bit5x5 green"}> */}
							{/* AFREIRE- */}
							{this.props.room.pTwo.login}
						</div>
						
						<div className="score bit5x3 white">
							{/* 2 */}
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

				</Stack>
			)
	}
}