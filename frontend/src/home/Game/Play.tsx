import { Component } from "react";
import '../../style/display.css';
import { Room } from '../../api/dto/game.dto';
import Canvas from './Canvas';
import { GameSocketAPI } from '../../api/GameSocket.api';


interface PlayProps {
	room?: Room,
	socket: GameSocketAPI,
	userId: number
};

interface PlayState {
	key: string
};

export class Play extends Component<PlayProps, PlayState>
{
	render () {
		console.log('RENDER PLAY')
		
		if (!this.props.room)
			return (
				<div style={{color: 'white'}}>LOADING...</div>
			)
		else
			return (
				<Canvas room={this.props.room}
						socket={this.props.socket}
						userId={this.props.userId}/>
			)
	}
}