import { ThirtyFpsSelectSharp } from '@mui/icons-material'
import { render } from '@testing-library/react'
import React, { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { threadId } from 'worker_threads'
import { BallDto, PlayerDTO, RoomDto, roomEnum } from '../../api/dto/game.dto'
import { GameSocketAPI } from '../../api/GameSocket.api'

const Sam: number = 1000; 

function resizeCanvas(canvas: HTMLCanvasElement) {
	// console.log('resize')
    const { width, height } = canvas.getBoundingClientRect()
    
    if (canvas.width !== width || canvas.height !== height){
		const { devicePixelRatio : ratio = 1 } = window
		const context = canvas.getContext('2d')
		canvas.width = width * ratio
		canvas.height = height * ratio
		if (context)
			context.scale(ratio, ratio)
		return true
    }

    return false
}

function reactiveCoords(room: RoomDto, canvas: HTMLCanvasElement): RoomDto {
	const ratio = canvas.width / Sam;

	// console.log(`reactiveCoords = ${ratio}`)

	// ball
	room.ball.coor.x *= ratio
	room.ball.coor.y *= ratio
	room.ball.r *= ratio
	
	// playerOne
	room.playerOne.coor.x *= ratio
	room.playerOne.coor.y *= ratio
	room.playerOne.coor.setting.width *= ratio

	// playerTwo
	room.playerTwo.coor.x *= ratio
	room.playerTwo.coor.y *= ratio
	room.playerTwo.coor.setting.width *= ratio

	return room
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
	// yOne: number,
	// yTwo: number
}

export class Canvas extends React.Component<CanvasProps, CanvasState>
{
	canvas: any = undefined
	context: any = undefined
	keystate = {}
	loop: any =  null
	// ratio: number = 0

	constructor(props: CanvasProps) {
		super(props);

		this.setupCanvas = this.setupCanvas.bind(this)
		this.startGame = this.startGame.bind(this)
		this.updateCanvas = this.updateCanvas.bind(this)
		this.draw = this.draw.bind(this)

		// this.state = {
		// 	yOne: 200,
		// 	yTwo: 200
		// }

			this.state = {
				ball: this.props.room.ball,
				playerOne: this.props.room.playerOne,
				playerTwo: this.props.room.playerTwo
			}
	}

	setupCanvas()
	{
		console.log('SETUP CANVAS')
		this.canvas = document.getElementById("canvas")
		this.canvas.height = this.canvas.width * 3/4
		resizeCanvas(this.canvas)
		// this.ratio = this.canvas.width / Sam;
		if (this.canvas) {
			this.context = this.canvas.getContext("2d")
		}
		else
			console.log("Canvas isn't defined.");
	}

	componentDidMount() {
		this.setupCanvas()
		this.startGame()
	}

	startGame()
	{
		console.log('START GAME')
		if (this.loop)
			return;
		const kstate = this.keystate
		document.addEventListener('keydown', function(event) {
			console.log(`keydown: ${event.code}`)
			kstate[event.code] = true;
			console.log(`kstate: ${kstate[event.code]}`)
		});
		document.addEventListener('keyup', function(event) {
			delete kstate[event.code];
		});
		document.addEventListener('ontouchstart', function(e) {e.preventDefault()}, false);
		document.addEventListener('ontouchmove', function(e) {e.preventDefault()}, false);
		this.loop = setInterval(this.looping.bind(this), 1);
	}

	updateCanvas()
	{
		// console.log('UPDATE CANVAS')
		resizeCanvas(this.canvas)

		const reactiveRoom = reactiveCoords(this.props.room, this.canvas)

		this.state = {
			ball: reactiveRoom.ball,
			playerOne: reactiveRoom.playerOne,
			playerTwo: reactiveRoom.playerTwo
		}
	}

	looping() {
		this.updatePosition()
		// this.ratio = this.canvas.width / Sam;
		this.updateCanvas();
		this.draw();

	}

	draw()
	{
		// console.log('DRAW')
		// console.log(this.ratio)
		// console.log("context 4 :");
		// console.log(this.context);
		const ctx: CanvasRenderingContext2D = this.context;
		// draw background
		// console.log(ctx);
		const state = this.state;
		
		// console.log(state.ball)
		// console.log(state.playerOne)
		// console.log(state.playerTwo)
		
		// draw ball
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
		ctx.beginPath();
		this.context.arc(state.ball.coor.x, state.ball.coor.y, state.ball.r, 0, 2 * Math.PI, true);
		// ctx.arc(100 * this.ratio, 100* this.ratio, 10* this.ratio, 0, 2 * Math.PI, true);
		ctx.fillStyle = 'green';
		ctx.fill();
		ctx.lineWidth = 0;
		ctx.strokeStyle = '#fff';
		ctx.stroke();
		
		//draw paddles
		ctx.beginPath();
		ctx.fillStyle = this.state.playerOne.user.color;
		ctx.fillRect(state.playerOne.coor.x, state.playerOne.coor.y, 15, state.playerOne.coor.setting.width);
		// ctx.fillStyle = 'white';
		// ctx.fillRect(20 * this.ratio, this.state.yOne * this.ratio, 15 * this.ratio, 50 * this.ratio);
		// ctx.fill();

		ctx.beginPath();
		// console.log(`width: ${ctx.canvas.clientWidth}`)
		ctx.fillStyle =  this.state.playerTwo.user.color;;
		ctx.fillRect(state.playerTwo.coor.x, state.playerTwo.coor.y, 15, state.playerTwo.coor.setting.width);
		// ctx.fillStyle = 'white';
		// ctx.fillRect(700 * this.ratio, this.state.yTwo * this.ratio, 15 * this.ratio, 50 * this.ratio);
		// ctx.fill();const 
	}

	updatePosition()
	{
		// console.log('UPDATE POSITION')
		if (this.props.userId === this.props.room.playerOne.user.id ||
			this.props.userId === this.props.room.playerTwo.user.id)
		{
			// console.log(`yOne: ${this.state.yOne}`)
			// console.log(`yTwo: ${this.state.yTwo}`)
			if (this.keystate['ArrowUp'])
			{
				// this.setState({yOne: this.state.yOne + 10})
				this.props.socket.key(this.props.userId, this.props.room.roomId, "Up")
				this.setupCanvas()
			}
			if (this.keystate['ArrowDown'])
			{
				// this.setState({yOne: this.state.yOne - 10})
				this.props.socket.key(this.props.userId, this.props.room.roomId, "Down")
				this.setupCanvas()
			}
			// if (this.keystate['KeyW'])
			// {
			// 	this.setState({yTwo: this.state.yTwo + 10})
			// 	this.setupCanvas()
			// }
			// if (this.keystate['KeyS'])
			// {
			// 	this.setState({yTwo: this.state.yTwo - 10})
			// 	this.setupCanvas()
			// }
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