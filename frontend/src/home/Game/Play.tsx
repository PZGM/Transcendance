import { Component } from "react";
import '../../style/display.css';
import { RoomDto } from '../../api/dto/game.dto';
import Canvas from './Canvas';
import { GameSocketAPI } from '../../api/GameSocket.api';


interface PlayProps {
	room?: RoomDto,
	socket: GameSocketAPI,
	userId: number
};

interface PlayState {
	key: string
};

export class Play extends Component<PlayProps, PlayState>
{ 
	// predraw = (canvas: HTMLCanvasElement) => {
	// 	const context = canvas.getContext('2d')
	// 	if (context) {
	// 		context.save()
	// 		resizeCanvas(canvas)
	// 		const { width, height } = context.canvas
	// 		context.clearRect(0, 0, width, height)
	// 	}
	// }
	
	// postdraw = (index: number, ctx: CanvasRenderingContext2D) => {
	// 	index++
	// 	ctx.restore()
	// }

	roomCheck()
	{
	}

	render () {
		console.log('render')
		
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