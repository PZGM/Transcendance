import { ThirtyFpsSelectSharp } from '@mui/icons-material'
import { render } from '@testing-library/react'
import React, { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { threadId } from 'worker_threads'
import { Room, roomEnum } from '../../api/dto/game.dto'
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

function reactiveCoords(room: Room, canvas: HTMLCanvasElement): Room {
	const ratio = canvas.width / Sam;

	// console.log(`reactiveCoords = ${ratio}`)

	// ball
	room.ballX *= ratio
	room.ballY *= ratio
	room.ballR *= ratio
	
	// playerOne
	room.pOneX *= ratio
	room.pOneY *= ratio
	room.pOneSize *= ratio

	// playerTwo
	room.pTwoX *= ratio
	room.pTwoY *= ratio
	room.pTwoSize *= ratio

	return room
}

interface CanvasProps {
	room: Room,
	socket: GameSocketAPI,
	userId: number
}

interface CanvasState {
	room: Room
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
				room: this.props.room
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
			room: reactiveRoom
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
		const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
		// draw background
		// console.log(ctx);
		const room = this.state.room;
		
		// console.log(state.ball)
		// console.log(state.playerOne)
		// console.log(state.playerTwo)
		
		// draw ball
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
		ctx.beginPath();
		ctx.arc(room.ballX, room.ballY, room.ballR, 0, 2 * Math.PI, true);
		// ctx.arc(100 * this.ratio, 100* this.ratio, 10* this.ratio, 0, 2 * Math.PI, true);
		ctx.fillStyle = 'white';
		ctx.fill();
		ctx.lineWidth = 0;
		ctx.strokeStyle = '#fff';
		ctx.stroke();
		
		//draw paddles
		ctx.beginPath();
		ctx.fillStyle = room.pOneColor;
		ctx.fillRect(room.pOneX, room.pOneY, 15, room.pOneSize);
		// ctx.fillStyle = 'white';
		// ctx.fillRect(20 * this.ratio, this.state.yOne * this.ratio, 15 * this.ratio, 50 * this.ratio);
		// ctx.fill();

		ctx.beginPath();
		// console.log(`width: ${ctx.canvas.clientWidth}`)
		ctx.fillStyle = room.pTwoColor;
		ctx.fillRect(room.pTwoX, room.pTwoY, 15, room.pTwoSize);
		// ctx.fillStyle = 'white';
		// ctx.fillRect(700 * this.ratio, this.state.yTwo * this.ratio, 15 * this.ratio, 50 * this.ratio);
		// ctx.fill();const 
	}

	updatePosition()
	{
		// console.log('UPDATE POSITION')
		if (this.props.userId === this.state.room.pOneId ||
			this.props.userId === this.state.room.pTwoId)
		{
			// console.log(`yOne: ${this.state.yOne}`)
			// console.log(`yTwo: ${this.state.yTwo}`)
			if (this.keystate['ArrowUp'] || this.keystate['KeyW'])
				this.props.socket.key(this.props.userId, this.state.room.roomId, "Up")
			if (this.keystate['ArrowDown'] || this.keystate['KeyS'])
				this.props.socket.key(this.props.userId, this.state.room.roomId, "Down")
		}
		this.props.socket.updateRoom(this.state.room.roomId);
	}

	render()
	{
		return (
			<canvas id="canvas"/>
		)
	}
}

export default Canvas