
import React from 'react'
import { Room, roomEnum } from '../../api/dto/game.dto'
import { GameSocketAPI } from '../../api/GameSocket.api'

const Sam: number = 1000; 

function resizeCanvas(canvas: HTMLCanvasElement) {
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

interface CanvasProps {
	room: Room,
	socket: GameSocketAPI,
	userId: number
}

interface CanvasState {
	room: Room
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

			this.state = {
				room: this.props.room
			}
	}

	setupCanvas()
	{
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
			kstate[event.code] = true;
		});
		document.addEventListener('keyup', function(event) {
			delete kstate[event.code];
		});
		document.addEventListener('ontouchstart', function(e) {e.preventDefault()}, false);
		document.addEventListener('ontouchmove', function(e) {e.preventDefault()}, false);
		this.loop = setInterval(this.looping.bind(this), 24);
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

	drawBall(ctx: any, room: Room)
	{
		// ctx.save()
		ctx.beginPath()
		ctx.fillStyle = room.ballColor
		ctx.arc((room.ballX * this.ratio), room.ballY * this.ratio,
				room.ballR * this.ratio, 0, 2 * Math.PI, true);
		ctx.fill()
		// ctx.restore()
	}

	drawPlayerOne(ctx: any, room: Room)
	{
		// ctx.save()
		ctx.beginPath()
		ctx.fillStyle = room.pOne.color
		ctx.fillRect(room.pOneX * this.ratio, room.pOneY * this.ratio,
				15 * this.ratio, room.pOneSize * this.ratio);
		// ctx.restore()
	}

	drawPlayerTwo(ctx: any, room: Room)
	{
		// ctx.save()
		ctx.beginPath()
		ctx.fillStyle = room.pTwo.color
		ctx.fillRect(room.pTwoX * this.ratio, room.pTwoY * this.ratio,
				15 * this.ratio, room.pTwoSize * this.ratio);
		// ctx.restore()
	}

	draw()
	{
		var m_canvas = document.createElement("canvas");
		m_canvas.width = this.canvas.width;
		m_canvas.height = this.canvas.height;
		var m_ctx = m_canvas.getContext("2d");
		const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
		this.setState({
			room: this.props.room
		})
		const room = this.state.room;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

		this.drawBall(m_ctx, room)
		this.drawPlayerOne(m_ctx, room);
		this.drawPlayerTwo(m_ctx, room);
		ctx.drawImage(m_canvas, 0,0);

	}

	updatePosition()
	{
		if (this.props.userId === this.state.room.pOne.id ||
			this.props.userId === this.state.room.pTwo.id)
		{
			if (this.keystate['ArrowUp'] || this.keystate['KeyW'])
				this.props.socket.key(this.props.userId, this.state.room.roomId, "Up")
			if (this.keystate['ArrowDown'] || this.keystate['KeyS'])
				this.props.socket.key(this.props.userId, this.state.room.roomId, "Down")
		}
		this.props.socket.updateRoom(this.state.room.roomId);
	}

	render()
	{
		// console.log('RENDER CANVAS')
		return (
			<canvas id="canvas"/>
		)
	}
}

export default Canvas