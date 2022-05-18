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
    
    if (canvas.width !== width || canvas.height !== height) {
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

// function reactiveCoords(room: Room, canvas: HTMLCanvasElement): Room {
// 	const ratio = canvas.width / Sam;

// 	// console.log(`reactiveCoords = ${ratio}`)

// 	// ball
// 	room.ballX *= ratio
// 	room.ballY *= ratio
// 	room.ballR *= ratio
	
// 	// playerOne
// 	room.pOneX *= ratio
// 	room.pOneY *= ratio
// 	room.pOneSize *= ratio

// 	// playerTwo
// 	room.pTwoX *= ratio
// 	room.pTwoY *= ratio
// 	room.pTwoSize *= ratio

// 	return room
// }

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
	ratio: number = 0

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
		this.ratio = this.canvas.width / Sam;
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
		resizeCanvas(this.canvas)
		this.ratio = this.canvas.width / Sam;
	}

	looping() {
		this.updatePosition()
		this.updateCanvas()
		this.draw();

	}

	drawBall(ctx: CanvasRenderingContext2D, room: Room)
	{
		// ctx.save()
		ctx.beginPath()
		ctx.fillStyle = room.ballColor
		ctx.arc(room.ballX * this.ratio,
				room.ballY  * this.ratio,
				room.ballR  * this.ratio,
				0,
				2 * Math.PI,
				true);
		ctx.fill()
		// ctx.restore()
	}

	drawPlayerOne(ctx: CanvasRenderingContext2D, room: Room)
	{
		// ctx.save()
		ctx.beginPath()
		ctx.fillStyle = 'white'
		ctx.fillRect(room.pOneX * this.ratio,
					room.pOneY * this.ratio,
					15 * this.ratio,
					room.pOneSize * this.ratio);
		// ctx.restore()
	}

	drawPlayerTwo(ctx: CanvasRenderingContext2D, room: Room)
	{
		// ctx.save()
		ctx.beginPath()
		ctx.fillStyle = room.pTwoColor
		ctx.fillRect(room.pTwoX * this.ratio,
			room.pTwoY * this.ratio,
			15 * this.ratio,
			room.pTwoSize * this.ratio);
		// ctx.restore()
	}

	draw()
	{
		const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
		const room = this.state.room;
		
		// console.log(`ballX: ${room.ballX}`)
		// console.log(`ballXratio: ${room.ballX * this.ratio}`)
		// console.log(`pOneX: ${room.pOneX}`)
		// console.log(`pOneXratio: ${room.pOneX * this.ratio}`)
		// console.log(`pTwoX: ${room.pTwoX}`)
		// console.log(`pTwoXratio: ${room.pTwoX * this.ratio}`)
		// console.log(`ballY: ${room.ballY}`)
		// console.log(`ballYratio: ${room.ballY * this.ratio}`)
		// console.log(`pOneY: ${room.pOneY}`)
		// console.log(`pOneYratio: ${room.pOneY * this.ratio}`)
		// console.log(`pTwoY: ${room.pTwoY}`)
		// console.log(`pTwoYratio: ${room.pTwoY * this.ratio}`)
	
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

		this.drawBall(ctx, room)
		this.drawPlayerOne(ctx, room)
		this.drawPlayerTwo(ctx, room)

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
		console.log('RENDER CANVAS')
		return (
			<canvas id="canvas"/>
		)
	}
}

export default Canvas