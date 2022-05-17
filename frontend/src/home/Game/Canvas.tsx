import { render } from '@testing-library/react'
import React, { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { threadId } from 'worker_threads'
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
	playerTwo: PlayerDTO,
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

	updateCanvas(){
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
			this.context = this.canvas.getContext("2d")
			console.log("context :"); console.log(this.context);
		}
		else
			console.log("not here dude");
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
		console.log("context 2 :"); console.log(this.context);
		this.loop = setInterval(this.looping.bind(this), 1);
	}
	
	looping() {
		console.log("context 2.5 :"); console.log(this.context);
		this.updatePosition()
		console.log("context 3 :"); console.log(this.context);
		this.draw();
		this.updateCanvas();
	}

	draw()
	{
		console.log("context 4 :"); console.log(this.context);
		const ctx: CanvasRenderingContext2D = this.context;
		// draw background
		console.log(ctx);
		const state = this.state;
		//draw ball
		this.context.beginPath();
		this.context.arc(state.ball.x,state.ball.y,state.ball.diameter, 0, 2 * Math.PI, true);
		this.context.fillStyle = 'green';
		this.context.fill();
		this.context.lineWidth = 0;
		this.context.strokeStyle = '#fff';
		this.context.stroke();
		
		//draw paddles
		this.context.beginPath();
		this.context.fillStyle = this.state.playerOne.user.color;
		this.context.rect(state.playerOne.x, state.playerOne.y, 15, state.playerOne.height);
		this.context.fill();

		this.context.beginPath();
		this.context.fillStyle =  this.state.playerTwo.user.color;;
		console.log(`width: ${this.context.canvas.clientWidth}`)
		this.context.fillRect(this.context.canvas.clientWidth - 25, state.playerTwo.y, 15, state.playerTwo.height);
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
		this.props.socket.updateRoom(this.props.room.roomId);
	}

	render()
	{
		return (
			<canvas id="canvas"/>
		)
	}
}

export default Canvas