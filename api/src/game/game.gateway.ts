import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import Queue from './components/queue';
import Room from './components/room';
import { UserDto } from 'src/dto/user.dto';
import {  User } from 'src/typeorm';
import { UsersService } from 'src/users/users.service';
import Pool from './components/pool';
import { roomEnum } from 'src/dto/game.dto';
import { statusEnum, StatusService } from 'src/status/status.service';
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
		private readonly statusService: StatusService,
		private readonly historyService: HistoryService){}

    afterInit(server: Server) {
        setInterval(() => {

			let playerOne: UserDto
			let playerTwo: UserDto
			let roomId: string
			let room: Room
			if((this.queue.sizeEasy() > 1) || (this.queue.sizeMedium() > 1) || (this.queue.sizeHard() > 1)) {
				let date = Date.now().toString().substring(8, 13);
				if (this.queue.sizeEasy() > 1) {
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
				this.queue.rmToQueue(playerOne);
				this.queue.rmToQueue(playerTwo);
				this.statusService.updateStatus(playerOne.id, statusEnum.playing);
				this.statusService.updateStatus(playerTwo.id, statusEnum.playing);
				this.server.to(playerOne.socketIdTab).emit("gameRoom", room.toFront());
				this.server.to(playerTwo.socketIdTab).emit("gameRoom", room.toFront());
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
			const userDto = new UserDto(user);
			this.rooms.forEach(async (room: Room) => {
				if (room.isPlayer(userDto))
				{
                    if (room.status < roomEnum.end) {
                        if(room.isPlayerOne(userDto) && room.playerTwo)
                            room.playerTwo.goal = 10;
                        if(room.isPlayerTwo(userDto) && room.playerOne)
                            room.playerOne.goal = 10;
						room.update();
						const winner = new UserDto(await this.usersService.getOne(room.winner.id));
						const loser = new UserDto(await this.usersService.getOne(room.loser.id));
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
						this.statusService.updateStatus(winner.id, statusEnum.connected);
						this.statusService.updateStatus(loser.id, statusEnum.connected);
					}
                }
			});
			this.queue.rmToQueue(userDto);
            this.pool.rmToPool(userDto);
			this.logger.log(`a socket of ${user.login} disconnected: ${socket.id}`);
			this.statusService.updateStatus(user.id, statusEnum.disconected);
      }
	}

    @SubscribeMessage('handleUserConnect')
	async handleUserConnect(@ConnectedSocket() socket: Socket,  @MessageBody() userId : {id : number}) {
		const user : UserDto = new UserDto(await this.usersService.getOne(userId.id));
		this.logger.log(`${user.login} connected`)
		if(!user.socketIdTab)
			user.socketIdTab = [];
		user.socketIdTab.push(socket.id);
		user.status = statusEnum.connected;
		if(!this.pool.find(user))
			this.pool.addToPool(user);
        this.server.to(socket.id).emit('joinedPool');
        this.usersService.setUserSocket(userId.id, socket.id);
		this.statusService.updateStatus(userId.id, statusEnum.connected);
	}

	@SubscribeMessage('joinRoom')
	async handleJoinRoom(@ConnectedSocket() socket: Socket, @MessageBody() data : {roomId: string }) {
		const room: Room = this.rooms.get(data.roomId);
		if (room) {
			const user : UserDto = new UserDto(await this.usersService.getOneBySocket(socket.id));
			socket.join(data.roomId);
			this.logger.log(`${user.login} joined the socket room ${room.roomId}`)
			if (room.isPlayer(user)) {
				this.queue.rmToQueue(user);
				this.statusService.updateStatus(user.id, statusEnum.playing);
				this.server.to(room.roomId).emit("updateRoom", room.toFront());
				this.logger.log(`${user.login} joined room ${room.roomId}!`);
			}
		}
	}

	async handleSpectateRoom( userId : number, playerId : number) {
		let roomId: string;
		const user : UserDto = new UserDto(await this.usersService.getOne(playerId));
		this.rooms.forEach((room : Room) => {
			if ((playerId == room.playerOne.user.id) || (playerId == room.playerTwo.user.id)) {
				roomId = room.roomId;
			}
		});
		const room: Room = this.rooms.get(roomId);
		if (room) {
			const user = this.pool.find(new UserDto(await this.usersService.getOne(userId)));
			if (!room.isPlayer(user)) {
				this.server.to(user.socketIdTab).emit("gameRoom", room.toFront());
                this.pool.changeStatus(statusEnum.watching, user);
				this.statusService.updateStatus(userId, statusEnum.watching);
				this.logger.log(`${user.login} watching room ${room.roomId}!`);
			}
        }
		else
			this.logger.log("didnt find a room to spectate");
	}

	async handleRoomInvite(senderId: number, receiverId : number, difficulty: Difficulty): Promise<boolean> {
		const user: UserDto = new UserDto(await this.usersService.getOne(senderId));
		const guest: UserDto = new UserDto (await this.usersService.getOne(receiverId));
		if (user && user.status != statusEnum.playing && guest && guest.status != statusEnum.playing &&
			this.pool.find(user) && this.pool.find(guest))
		{
			const roomId = `${difficulty.toString()}${user.id}${guest.id}${Date.now().toString().substring(8, 13)}`;
			const room = new Room(roomId, difficulty, user, guest);
			this.rooms.set(roomId, room);

			this.server.to(user.socketIdTab).emit("inviteGame", room.toFront());
			this.server.to(guest.socketIdTab).emit("inviteGame", room.toFront());

			return true;
		}
		return false;
	}

	@SubscribeMessage('joinQueue')
	async handleJoinQueue(@ConnectedSocket() socket: Socket,  @MessageBody() data : { userId : number, difficulty: Difficulty }) {
		const user : UserDto = this.pool.findById(data.userId);
		if (user && this.queue.find(user) === -1 && user.status !== statusEnum.playing)
		{
			this.pool.changeStatus(statusEnum.inQueue, user);
			this.queue.addToQueue(user, data.difficulty);
			this.server.to(socket.id).emit('joinedQueue');
			this.logger.log(`socket ${user.login}: ${socket.id} was added to ${data.difficulty} queue !`);
			this.statusService.updateStatus(data.userId, statusEnum.inQueue);
		}
	}

	@SubscribeMessage('leaveQueue')
	async handleLeaveQueue(@ConnectedSocket() socket: Socket,  @MessageBody() data : { userId : number } ) {
	const user : UserDto = new UserDto(await this.usersService.getOneBySocket(socket.id));
		if (user && this.queue.find(user) !== -1)
		{
			this.queue.rmToQueue(user);
            this.pool.changeStatus(statusEnum.connected, user);
			this.server.to(socket.id).emit('leftQueue');
			this.logger.log(`socket ${user.login}: ${socket.id} left the queue !`);
			this.statusService.updateStatus(user.id, statusEnum.connected);
		}
	}

    @SubscribeMessage('leaveRoom')
	async handleLeaveRoom(@ConnectedSocket() socket: Socket,  @MessageBody() data : { userId: number, roomId: string}) {
		const room: Room = this.rooms.get(data.roomId);
		const user = this.pool.find(new UserDto(await this.usersService.getOne(data.userId)));
		if (user && room) {
			if (!room.isPlayer(user)) {
				this.server.to(socket.id).emit("updateRoom", room.toFrontEnd());
				this.pool.changeStatus(statusEnum.connected, user);
				this.statusService.updateStatus(user.id, statusEnum.connected);
				socket.leave(room.roomId)
			}
			else if (room.isPlayer(user) && room.status !== roomEnum.end) {
                    if(room.isPlayerOne(user) && room.playerTwo)
                        room.playerTwo.goal = room.maxGoal;
                    if(room.isPlayerTwo(user) && room.playerOne)
                        room.playerOne.goal = room.maxGoal;
					room.update();
					const winner = new UserDto(await this.usersService.getOne(room.winner.id));
					const loser = new UserDto(await this.usersService.getOne(room.loser.id));
					await this.historyService.createGameHistory({
						players: [winner, loser],
						winnerId: winner.id,
						loserId: loser.id,
						createdDate: new Date(room.startingTime),
						duration: room.duration,
						winnerScore: room.maxGoal,
						loserScore: room.playerOne.goal === room.maxGoal ? room.playerTwo.goal : room.playerOne.goal,
						roomId : room.roomId
					});
					this.statusService.updateStatus(winner.id, statusEnum.connected);
					this.statusService.updateStatus(loser.id, statusEnum.connected);
					this.pool.changeStatus(statusEnum.connected, winner);
					this.pool.changeStatus(statusEnum.connected, loser);
					this.server.to(room.roomId).emit("updateRoom", room.toFront());
					this.rooms.delete(room.roomId);
					this.logger.log("Deleting Room");
            }
			this.server.to(socket.id).emit("leftRoom");
		}
	}

	@SubscribeMessage('updateRoom')
	async handleRequestUpdate(@ConnectedSocket() socket: Socket,  @MessageBody() data : { roomId: string }) {
		
		const room: Room = this.rooms.get(data.roomId);
		if (room) {
			let now = Date.now();
			const updtime = room.updateTime;
			if (room.status === roomEnum.waiting  && (now  - updtime) >= 1000) {
				room.startingTime = now;
				room.updateTime = now;
				room.status = roomEnum.playing;
			}
			else if (room.status === roomEnum.playing)
			{
				if (room.update() === roomEnum.end) {
					const winner = new UserDto(await this.usersService.getOne(room.winner.id));
					const loser = new UserDto(await this.usersService.getOne(room.loser.id));
					await this.historyService.createGameHistory({
						players: [winner, loser],
						winnerId: winner.id,
						loserId: loser.id,
						createdDate: new Date(room.startingTime),
						duration: room.duration,
						winnerScore: room.maxGoal,
						loserScore: room.playerOne.goal === room.maxGoal ? room.playerTwo.goal : room.playerOne.goal,
						roomId : room.roomId
					});
					this.statusService.updateStatus(winner.id, statusEnum.connected);
					this.statusService.updateStatus(loser.id, statusEnum.connected);
					this.pool.changeStatus(statusEnum.connected, winner);
					this.pool.changeStatus(statusEnum.connected, loser);
				}
			}
			else if (room.status === roomEnum.goal  && (now - updtime) >= 1000) {
				room.reset();
				room.status = roomEnum.playing;
				room.updateTime = now;
			}
			this.server.to(room.roomId).emit("updateRoom", room.toFront());
			if (room.status === roomEnum.end) {
				this.rooms.delete(room.roomId);
				this.logger.log("Deleting Room");
			}
		}
	}

	@SubscribeMessage('key')
	async handleKeyUp(@ConnectedSocket() socket: Socket,  @MessageBody() data : { userId: number, roomId: string, key: string }) {
		const room: Room = this.rooms.get(data.roomId);
		if (room && room.playerOne.user.id == data.userId)
		{
			if (data.key === 'Up')
				room.playerOne.coor.dy = 1;
			else if (data.key === 'Down')
				room.playerOne.coor.dy = -1;
			else
				room.playerOne.coor.dy = 0;

		}
		else if (room && room.playerTwo.user.id == data.userId)
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