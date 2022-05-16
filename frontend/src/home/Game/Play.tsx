import { Component } from "react";
import '../../style/display.css';
import { RoomDto } from '../../api/dto/game.dto';
import Canvas from './Canvas';


interface PlayProps {
	room: RoomDto | undefined;
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

	render () {
		console.log('render')
		return (
			<>
				<div className="game_frame">
					<Canvas/>
				</div>
			</>
		)
	}
}