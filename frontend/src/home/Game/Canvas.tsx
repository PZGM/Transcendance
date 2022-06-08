import React from 'react'
import { Room, roomEnum, Pos } from '../../api/dto/game.dto'
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
	userId: number,
	updateDisplay: any,
}

interface CanvasState {
	room: Room
}

export class Canvas extends React.Component<CanvasProps, CanvasState>
{
	canvas: any = undefined;
	context: any = undefined;
	keystate = {};
	loop: any =  null;
	ratio: number = 0;
	oldPos?: Pos;

	constructor(props: CanvasProps) {
		super(props);

		this.setupCanvas = this.setupCanvas.bind(this)
		this.startGame = this.startGame.bind(this)
		this.updateCanvas = this.updateCanvas.bind(this)
		this.draw = this.draw.bind(this)
		this.stopInterval = this.stopInterval.bind(this)
		this.state = {
			room: this.props.room
		}
	}

	setupCanvas()
	{
		this.canvas = document.getElementById("canvas")
		this.canvas.height = this.canvas.width * 3/4
		resizeCanvas(this.canvas)
		const { devicePixelRatio = 1 } = window
		this.ratio = (this.canvas.width / Sam) / devicePixelRatio;
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
		this.loop = setInterval(this.looping.bind(this), 20);
	}

	updateCanvas()
	{
		resizeCanvas(this.canvas)
		const { devicePixelRatio = 1 } = window
		this.ratio = (this.canvas.width / Sam) / devicePixelRatio;
	}

	looping() {
		this.updatePosition();
		if (this.props.room.status === roomEnum.end)
			this.stopInterval();
		else {
			this.updateCanvas();
			this.draw();
		}
	}

	drawBall(ctx: any, room: Room)
	{
		ctx.beginPath()
		ctx.fillStyle = room.ballColor
		ctx.arc((room.ballX * this.ratio), room.ballY * this.ratio,
				room.ballR * this.ratio, 0, 2 * Math.PI, true);
		ctx.fill()
	}

	drawPlayerOne(ctx: any, room: Room)
	{
		ctx.beginPath()
		ctx.fillStyle = room.pOne.color
		ctx.fillRect(Math.floor(room.pOneX * this.ratio),
				Math.floor(room.pOneY * this.ratio),
				Math.floor(15 * this.ratio),
				Math.floor(room.pOneSize * this.ratio));
	}

	drawPlayerTwo(ctx: any, room: Room)
	{
		ctx.beginPath();
		ctx.fillStyle = room.pTwo.color;
		ctx.fillRect(Math.floor(room.pTwoX * this.ratio),
				Math.floor(room.pTwoY * this.ratio),
				Math.floor(15 * this.ratio),
				Math.floor(room.pTwoSize * this.ratio));
	}

	stopInterval()
	{
		clearInterval(this.loop)
		if (this.props.userId === this.state.room.pOne.id ||
			this.props.userId === this.state.room.pTwo.id)
			this.props.updateDisplay(3);
	}

	clearDraw(ctx: any) {
		if (this.oldPos){
			ctx.clearRect(Math.floor(this.oldPos.pOneX * this.oldPos.ratio),
					Math.floor(this.oldPos.pOneY * this.oldPos.ratio),
					Math.floor(17 * this.oldPos.ratio),
					Math.floor(this.oldPos.pOneSize * this.oldPos.ratio));
			ctx.clearRect(Math.floor(this.oldPos.pTwoX * this.oldPos.ratio),
					Math.floor(this.oldPos.pTwoY * this.oldPos.ratio),
					Math.floor(17 * this.oldPos.ratio),
					Math.floor(this.oldPos.pTwoSize * this.oldPos.ratio));
			ctx.clearRect(Math.floor(this.oldPos.ballX * this.oldPos.ratio),
					Math.floor(this.oldPos.ballY * this.oldPos.ratio),
					Math.floor(this.oldPos.ballR * this.oldPos.ratio),
					Math.floor(this.oldPos.ballR * this.oldPos.ratio));
		}

	}

	setOldPos(room: Room){
		this.oldPos = {
			ballR : (room.ballR * 2) + 4,
			ballX : room.ballX - room.ballR - 2,
			ballY : room.ballY - room.ballR - 2,
			pOneSize : room.pOneSize + 2,
			pOneX : room.pOneX - 1,
			pOneY : room.pOneY > 0 ? room.pOneY - 1 : room.pOneY,
			pTwoSize : room.pTwoSize + 2,
			pTwoX : room.pTwoX - 1,
			pTwoY : room.pTwoY > 0 ? room.pTwoY - 1 : room.pTwoY,
			ratio : this.ratio
		}
	}

	draw()
	{
		let m_canvas = document.createElement("canvas");
		m_canvas.width = this.canvas.width;
		m_canvas.height = this.canvas.height;
		const m_ctx = m_canvas.getContext("2d");
		const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
		this.setState({
			room: this.props.room
		})
		const room = this.state.room;
		if (this.oldPos)
			this.clearDraw(ctx);
		this.drawBall(m_ctx, room)
		this.drawPlayerOne(m_ctx, room);
		this.drawPlayerTwo(m_ctx, room);
		ctx.drawImage(m_canvas, 0,0);
		this.setOldPos(this.state.room);
	}

	updatePosition()
	{
		if (this.props.userId === this.state.room.pOne.id ||
			this.props.userId === this.state.room.pTwo.id)
		{
			if (this.keystate['ArrowUp'] || this.keystate['KeyW'])
				this.props.socket.key(this.props.userId, this.state.room.roomId, "Up")
			else if (this.keystate['ArrowDown'] || this.keystate['KeyS'])
				this.props.socket.key(this.props.userId, this.state.room.roomId, "Down")
			else
				this.props.socket.key(this.props.userId, this.state.room.roomId, "None")
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