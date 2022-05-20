import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import Queue from './components/queue';
import Room from './components/room';
import { UserDto } from 'src/dto/user.dto';
import {  User } from 'src/typeorm';
import { UsersService } from 'src/users/users.service';
import Pool from './components/pool';
import { RoomDto, roomEnum } from 'src/dto/game.dto';
import { statusEnum } from 'src/status/status.service';
import { Difficulty } from './components/coor';
import { HistoryService } from 'src/history/history.service';

@WebSocketGateway({namespace: '/game', cors: true})
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer() server: Server;
	private readonly queue: Queue = new Queue();
	private readonly pool: Pool = new Pool();
	private readonly rooms: Map<string, Room> = new Map();
	private logger = new Logger('GameGateway')
	
	constructor(
		private readonly usersService: UsersService,
		private readonly historyService: HistoryService){}

    afterInit(server: Server) {
        setInterval(() => {

			let playerOne: UserDto
			let playerTwo: UserDto
			let roomId: string
			let room: Room
			// console.log(`queue: ${this.queue.sizeEasy()}`)
			if((this.queue.sizeEasy() > 1) || (this.queue.sizeMedium() > 1) || (this.queue.sizeHard() > 1)) {
				let date = Date.now().toString().substring(8, 13);
				if (this.queue.sizeEasy() > 1) {
					console.log('Easy Room')
					playerOne = this.queue.getOneUser(Difficulty.Easy);
					playerTwo  = this.queue.getOneUser(Difficulty.Easy);
					roomId = `${Difficulty.Easy}${playerOne.id}${playerTwo.id}${date}`;	
					room = new Room(roomId, Difficulty.Easy, playerOne, playerTwo);
				}
				else if (this.queue.sizeMedium() > 1) {
					playerOne = this.queue.getOneUser(Difficulty.Medium);
					playerTwo = this.queue.getOneUser(Difficulty.Medium);
					roomId = `${Difficulty.Medium}${playerOne.id}${playerTwo.id}${date}`;
					room = new Room(roomId, Difficulty.Medium, playerOne, playerTwo);
				}
				else if (this.queue.sizeHard() > 1) {
					playerOne = this.queue.getOneUser(Difficulty.Hard);
					playerTwo = this.queue.getOneUser(Difficulty.Hard);
					roomId = `${Difficulty.Hard}${playerOne.id}${playerTwo.id}${date}`;
					room  = new Room(roomId, Difficulty.Hard, playerOne, playerTwo);
				}
				this.usersService.setUserStatus(playerOne.id, statusEnum.playing);
				this.usersService.setUserStatus(playerOne.id, statusEnum.playing);
				this.server.to(playerOne.socketId).emit("gameRoom", room.toFront());
				this.server.to(playerTwo.socketId).emit("gameRoom", room.toFront());
				this.rooms.set(roomId, room);
			}
		}, 3000);
		this.logger.log(`Init Pong Gateway`);
    }

    handleConnection(socket: Socket) {
        this.logger.log(`socket connected: ${socket.id}`);
    }

    async handleDisconnect(socket: Socket) {
		const user : User = await this.usersService.getOneBySocket(socket.id);
        if (user) {
			this.rooms.forEach((room: Room) => {
				if (room.isPlayer(user))
				{
                    if (room.status < roomEnum.end) {
                        if(room.isPlayerOne(user) && room.playerTwo) {
                            room.playerTwo.goal == 10;
                            room.update();
                        }
                        if(room.isPlayerTwo(user) && room.playerOne) {
                            room.playerOne.goal == 10;
							room.update();
						}
					}
                }
			});
			this.queue.rmToQueue(user);
            this.pool.rmToPool(user);
			this.logger.log(`socket ${user.login} disconnected: ${socket.id}`);
			this.usersService.setUserStatus(user.id, statusEnum.disconected);
      }
	}

    @SubscribeMessage('handleUserConnect')
	async handleUserConnect(@ConnectedSocket() socket: Socket,  @MessageBody() data : {userId : number}) {
		const user : UserDto = await this.usersService.getOne(data.userId);
		this.logger.log(`${user.login} i'm back`)
        this.rooms.forEach((room: Room) => {
			if (room.isPlayer(user) && room.status !== 3)
				return ;
		});
		user.socketId = socket.id;
		user.status = statusEnum.connected;
		this.pool.addToPool(user);
        this.server.to(socket.id).emit('joinedPool');
        this.usersService.setUserSocket(data.userId, socket.id);
		this.usersService.setUserStatus(data.userId, statusEnum.connected);
	}

	@SubscribeMessage('joinRoom')
	async handleJoinRoom(@ConnectedSocket() socket: Socket, @MessageBody() data : {roomId: string }) {
		const room: Room = this.rooms.get(data.roomId);
		if (room) {
			const user : User = await this.usersService.getOneBySocket(socket.id);
			socket.join(data.roomId);
			this.logger.log(`${user.login} joined the socket room ${room.roomId}`)
			if (room.isPlayer(user)) {
				this.usersService.setUserStatus(room.playerOne.user.id, statusEnum.playing);
				this.usersService.setUserStatus(room.playerTwo.user.id, statusEnum.playing);
				// console.log(room)
				this.server.to(room.roomId).emit("updateRoom", room.toFront());
				this.logger.log(`${user.login} joined room ${room.roomId}!`);
			}
		}
	}

	@SubscribeMessage('spectateRoom')
	async handleSpectateRoom(@ConnectedSocket() socket: Socket,  @MessageBody() data : {  userId: number, roomId: string } ) {
		const room: Room = this.rooms.get(data.roomId);
		if (room) {
			const user = this.pool.find(await this.usersService.getOne(data.userId));
			if (!room.isPlayer(user)) {
				this.server.to(socket.id).emit("gameRoom", room.toFront());
                this.pool.changeStatus(statusEnum.watching, user);
				this.usersService.setUserStatus(data.userId, statusEnum.watching);
			}
        }
	}

	@SubscribeMessage('roomInvite')
	async handleRoomInvite(@ConnectedSocket() socket: Socket, @MessageBody() data : { inviteId : number, difficulty: Difficulty } ) {
		const user : User = await this.usersService.getOneBySocket(socket.id);
		const guest : User = await this.usersService.getOne(data.inviteId);
		if (user && user.status != statusEnum.playing && guest && guest.status != statusEnum.playing)
		{
			const roomId = `${data.difficulty.toString}${user.id}${guest.id}${Date.now().toPrecision(5)}`;
			const room = new Room(roomId, Difficulty.Easy, user, guest);
			this.rooms.set(roomId, room);
			this.usersService.setUserStatus(user.id, statusEnum.inQueue);
			this.server.to(room.playerTwo.user.socketId).emit("Invitation", room.toFront());
			this.logger.log(`You succesfully invited ${guest.login} !`);
		}
		else
			this.server.to(socket.id).emit("Error invite");
	}

    @SubscribeMessage('joinQueue')
	async handleJoinQueue(@ConnectedSocket() socket: Socket,  @MessageBody() data : { userId : number, difficulty: Difficulty }) {
		const user : UserDto = this.pool.findById(data.userId);
		if (user && !this.queue.find(user) && user.status !== statusEnum.playing)
		{
			this.pool.changeStatus(statusEnum.inQueue, user);
			this.queue.addToQueue(user, data.difficulty);
			this.server.to(socket.id).emit('joinedQueue');
			this.logger.log(`socket ${user.login}: ${socket.id} was added to queue !`);
			this.usersService.setUserStatus(data.userId, statusEnum.inQueue);
		}
	}

	@SubscribeMessage('leaveQueue')
	async handleLeaveQueue(@ConnectedSocket() socket: Socket,  @MessageBody() data : { userId : number } ) {
    const user : User = await this.usersService.getOne(data.userId);
		if (user && this.queue.find(user))
		{
			this.queue.rmToQueue(user);
            this.pool.changeStatus(statusEnum.idle, user);
			this.server.to(socket.id).emit('leftQueue');
		}
        this.usersService.setUserStatus(data.userId, statusEnum.idle);
	}

    @SubscribeMessage('leaveRoom')
	async handleLeaveRoom(@ConnectedSocket() socket: Socket,  @MessageBody() data : { userId: number, roomId: string}) {
		const room: Room = this.rooms.get(data.roomId);
		const user = this.pool.find(await this.usersService.getOne(data.userId));
		if (user && room) {
			room.removeUser(user);
			if (room.length() === 0) {
				this.logger.log("Deleting Room");
				this.rooms.delete(room.roomId);
			}
			if (room.isPlayer(user) && room.status !== roomEnum.end) {
				if (room.status < roomEnum.end) {
                    if(room.isPlayerOne(user) && room.playerTwo) {
                        room.playerTwo.goal == 10;
                        room.update();
                    }
                    if(room.isPlayerTwo(user) && room.playerOne) {
                        room.playerOne.goal == 10;
                        room.update();
                    }
                }
            }
			this.pool.changeStatus(statusEnum.idle, user);
            this.usersService.setUserStatus(data.userId, statusEnum.idle);
		}
		this.server.to(socket.id).emit("leftRoom");
	}

	@SubscribeMessage('updateRoom')
	async handleRequestUpdate(@ConnectedSocket() socket: Socket,  @MessageBody() data : { roomId: string }) {
		
		const room: Room = this.rooms.get(data.roomId);
		if (room) {
			const now = Date.now();
			if (room.status === roomEnum.waiting  && (now  - room.updateTime) >= 1000) {
				room.startingTime = now;
				room.updateTime = now;
				room.status = roomEnum.playing;
			}
			else if (room.status === roomEnum.playing)
			{
				if (room.update() === roomEnum.end  && (now - room.updateTime) >= 1000) {
					const winner = await this.usersService.getOne(room.winner.id);
					const loser = await this.usersService.getOne(room.loser.id);
					await this.historyService.createGameHistory({
						players: [winner, loser],
						winnerId: winner.id,
						loserId: loser.id,
						createdDate: new Date(room.startingTime),
						duration: room.duration,
						winnerScore: 10,
						loserScore: room.playerOne.goal === 10 ? room.playerTwo.goal : room.playerOne.goal,
						roomId : room.roomId
					});
				}
			}
			else if (room.status === roomEnum.goal  && (now - room.updateTime) >= 1000) {
				room.reset();
				room.status = roomEnum.playing;
				room.updateTime = now;
			}
			// console.log(room.toFront());
			this.server.to(room.roomId).emit("updateRoom", room.toFront());
		}
	}

	@SubscribeMessage('key')
	async handleKeyUp(@ConnectedSocket() socket: Socket,  @MessageBody() data : { userId: number, roomId: string, key: string }) {
		const room: Room = this.rooms.get(data.roomId);
		if (room && room.playerOne.user.id === data.userId)
		{
			if (data.key === 'Up')
				room.playerOne.coor.dy = 1;
			else if (data.key === 'Down')
				room.playerOne.coor.dy = -1;
			else
				room.playerOne.coor.dy = 0;

		}
		else if (room && room.playerTwo.user.id === data.userId)
		{
			if (data.key === 'Up')
				room.playerTwo.coor.dy = 1;
			else if (data.key === 'Down')
				room.playerTwo.coor.dy = -1;
			else
				room.playerTwo.coor.dy = 0;
		
		}
	}
}