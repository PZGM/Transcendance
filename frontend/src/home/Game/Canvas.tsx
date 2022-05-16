import { render } from '@testing-library/react'
import React, { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { BallDto, PlayerDTO, RoomDto, roomEnum } from '../../api/dto/game.dto'
import { GameSocketAPI } from '../../api/GameSocket.api'

function resizeCanvas(canvas) {
	console.log('resize')
    const { width, height } = canvas.getBoundingClientRect()
    
    if (canvas.width !== width || canvas.height !== height){
		const { devicePixelRatio : ratio = 1 } = window
		const context = canvas.getContext('2d')
		canvas.width = width * ratio
		canvas.height = height * ratio
		// context.scale(ratio, ratio)
		return true
    }

    return false
}

interface CanvasProps {
	room: RoomDto,
	socket: GameSocketAPI,
	userId: number
}

interface CanvasState {
	ball: BallDto,
	playerOne: PlayerDTO,
	playerTwo: PlayerDTO
}

export class Canvas extends React.Component<CanvasProps, CanvasState>
{
	canvas: any = undefined
	context: any = undefined
	keystate = {}
	// _ball: require('./ball'),
	// _player: require('./player'),
	loop: any =  null

	constructor(props: CanvasProps) {
		super(props);

		this.state = {
			ball: this.props.room.ball,
			playerOne: this.props.room.playerOne,
			playerTwo: this.props.room.playerTwo
		}
	}

	componentDidMount() {
		this.setupCanvas()
		this.startGame()
	}

	setupCanvas()
	{
		this.canvas = document.getElementById("canvas")
		this.canvas.height = this.canvas.width * 3/4
		resizeCanvas(this.canvas)
		if (this.canvas) {
			console.log('context')
			this.context = this.canvas.getContext("2d")
		}
	}

	startGame()
	{
		if (this.loop)
			return;
		
		const kstate = this.keystate
		document.addEventListener('keydown', function(event) {
			kstate[event.code] = true;
		});
		document.addEventListener('keyup', function(event) {
			delete kstate[event.code];
		});
		document.addEventListener('ontouchstart', function(e) {e.preventDefault()}, false);
		document.addEventListener('ontouchmove', function(e) {e.preventDefault()}, false);

		this.loop = setInterval( () => {
			this.updatePosition();
			this.draw();
		}, 1);
	}
	
	draw()
	{
		// draw background
		const state = this.state;
		const ctx: CanvasRenderingContext2D = this.context;
	
		//draw ball
		ctx.beginPath();
		ctx.arc(state.ball.x,
						state.ball.y,
						state.ball.diameter, 0, 2 * Math.PI);
		ctx.fillStyle = 'green';
		ctx.fill();
		ctx.lineWidth = 0;
      	ctx.strokeStyle = '#fff';
      	ctx.stroke();
		
		//draw paddles
		ctx.fillStyle = 'magenta';
		ctx.fillRect(state.playerOne.x,
							state.playerOne.y,
							15,
							state.playerOne.height);
		ctx.fillStyle = 'red';
		console.log(`width: ${ctx.canvas.clientWidth}`)
		ctx.fillRect(ctx.canvas.clientWidth - 25,
						state.playerTwo.y,
						15,
						state.playerTwo.height);
	}

	updatePosition()
	{
		if (this.props.userId === this.props.room.playerOne.user.id ||
			this.props.userId === this.props.room.playerTwo.user.id)
		{
			if (this.keystate[38])
				this.props.socket.key(this.props.userId, this.props.room.roomId, "Up")
			else if (this.keystate[40])
				this.props.socket.key(this.props.userId, this.props.room.roomId, "Down")
		}
	}

	render()
	{
		return (
			<canvas id="canvas"/>
		)
	}
}

export default Canvas