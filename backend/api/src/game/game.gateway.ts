import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import Queue from './components/queue';
import Room from './components/room';
import { UserDto } from 'src/dto/user.dto';
import { Game, User } from 'src/typeorm';
import { UsersService } from 'src/users/users.service';
import Pool from './components/pool';
import { roomEnum } from 'src/dto/game.dto';
import { statusEnum } from 'src/status/status.service';
import { Player } from './components/player';
import { Difficulty } from './components/coor';
import { GameService } from './game.service';
import { HistoryService } from 'src/history/history.service';


@WebSocketGateway({namespace: '/game', cors: true})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer() server: Server
    wss: any;
    private readonly usersService: UsersService;
	private readonly gameService: GameService;
	private readonly historyService: HistoryService;
    private readonly queue: Queue = new Queue();
    private readonly pool: Pool = new Pool();
    private readonly rooms: Map<string, Room> = new Map();
    private logger = new Logger('GameGateway');

    afterInit(server: Server) {
        setInterval(() => {
			if (this.queue.sizeEasy() > 1) {
				const playerOne : UserDto= this.queue.getOneUser(Difficulty.Easy);
                const playerTwo : UserDto = this.queue.getOneUser(Difficulty.Easy);
				const  roomId: string = `Easy: ${playerOne.id} vs ${playerTwo.id} at ${Date.now()}`;
				
				let room  = new Room(roomId, Difficulty.Easy, playerOne, playerTwo);
				
				this.server.to(playerOne.socketId).emit("Easy Room", room);
				this.server.to(playerTwo.socketId).emit("Easy Room",  room);
				this.rooms.set(roomId, room);
				this.server.emit("New Room", roomId);
			}
            if (this.queue.sizeMedium() > 1) {
				const playerOne : UserDto= this.queue.getOneUser(Difficulty.Medium);
                const playerTwo : UserDto = this.queue.getOneUser(Difficulty.Medium);
				const  roomId: string = `Medium :${playerOne.id} vs ${playerTwo.id} at ${Date.now()}`;
				
				let room  = new Room(roomId, Difficulty.Medium, playerOne, playerTwo);
				
				this.server.to(playerOne.socketId).emit("Medium Room", room);
				this.server.to(playerTwo.socketId).emit("Medium Room",  room);
				this.rooms.set(roomId, room);
				this.server.emit("New Room", roomId);
			}
            if (this.queue.sizeHard() > 1) {
				const playerOne : UserDto= this.queue.getOneUser(Difficulty.Hard);
                const playerTwo : UserDto = this.queue.getOneUser(Difficulty.Hard);
				const  roomId: string = `Hard :${playerOne.id} vs ${playerTwo.id} at ${Date.now()}`;
				
				let room  = new Room(roomId, Difficulty.Hard, playerOne, playerTwo);
				
				this.server.to(playerOne.socketId).emit("Hard Room", room);
				this.server.to(playerTwo.socketId).emit("Hard Room",  room);
				this.rooms.set(roomId, room);
				this.server.emit("New Room", roomId);
			}
		}, 5432);
		this.logger.log(`Init Pong Gateway`);
    }

    handleConnection(socket: Socket) {
        console.log(`socket connected: ${socket.id}`);
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
        	console.log(`socket disconnected: ${socket.id}`);
			this.usersService.setUserStatus(user.id, statusEnum.disconected);
      }
	}

    @SubscribeMessage('handleUserConnect')
	async handleUserConnect(@ConnectedSocket() socket: Socket, userId : number) {
		const user : User = await this.usersService.getOne(userId);
        this.rooms.forEach((room: Room) => {
			if (room.isPlayer(user) && room.status !== 3)
				return ;
		});
		this.pool.addToPool(user);
        this.server.to(socket.id).emit('joinedPool');
        this.usersService.setUserSocket(userId, socket.id);
        this.usersService.setUserStatus(userId, statusEnum.connected);
	}

    @SubscribeMessage('joinQueue')
	async handleJoinQueue(@ConnectedSocket() socket: Socket, userId : number, difficulty: Difficulty) {
		const user : User = await this.usersService.getOne(userId);
		if (user && !this.queue.find(user))
		{
			this.pool.changeStatus(statusEnum.inQueue, user);
			this.queue.addToQueue(user, difficulty);
			this.server.to(socket.id).emit('joinedQueue');
			this.logger.log(`socket ${user.login}: ${socket.id} was added to queue !`);
		}
        this.usersService.setUserStatus(userId, statusEnum.inQueue);
	}

	@SubscribeMessage('leaveQueue')
	async handleLeaveQueue(@ConnectedSocket() socket: Socket, userId : number) {
    const user : User = await this.usersService.getOne(userId);
		if (user && this.queue.find(user))
		{
			this.queue.rmToQueue(user);
            this.pool.changeStatus(statusEnum.idle, user);
			this.server.to(socket.id).emit('leavedQueue');
		}
        this.usersService.setUserStatus(userId, statusEnum.idle);
	}
    @SubscribeMessage('spectateRoom')
	async handleSpectateRoom(@ConnectedSocket() socket: Socket, userId: number, roomId: string) {
		const room: Room = this.rooms.get(roomId);
		if (room) {
			const user = this.pool.find(await this.usersService.getOne(userId));
			if (!room.isPlayer(user)) {
				this.server.to(socket.id).emit("Game Room", room);
                this.pool.changeStatus(statusEnum.watching, user);
            }
            this.usersService.setUserStatus(userId, statusEnum.watching);
        }
	}

    @SubscribeMessage('leaveRoom')
	async handleLeaveRoom(@ConnectedSocket() socket: Socket, userId: number, roomId: string) {
		const room: Room = this.rooms.get(roomId);
		const user = this.pool.find(await this.usersService.getOne(userId));
		if (user && room) {
			room.removeUser(user);
			if (room.length() === 0) {
				this.logger.log("No user left in the room deleting it...");
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
            this.usersService.setUserStatus(userId, statusEnum.idle);
		}
		this.server.to(socket.id).emit("leavedRoom");
	}

	@SubscribeMessage('update')
	async handleRequestUpdate(@ConnectedSocket() socket: Socket, @MessageBody() roomId: string) {
		
		const room: Room = this.rooms.get(roomId);
		if (room) {
			const now = Date.now();
			if (room.status === roomEnum.waiting) {
				room.startingTime = now;
				room.updateTime = now;
				room.status = roomEnum.playing;
			}
			else if (room.status === roomEnum.playing)
			{
				room.update();
				if (room.status = roomEnum.end) {
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
			else if (room.status === roomEnum.goal) {
				room.reset();
				room.status = roomEnum.playing;
				room.updateTime = now;
			}
			this.server.to(room.roomId).emit("updateRoom", room);
		}
	}

	@SubscribeMessage('key')
	async handleKeyUp(@ConnectedSocket() socket: Socket, roomId: string, key: string, login: string) {
		const room: Room = this.rooms.get(roomId);

		if (room && room.playerOne.user.login === login)
		{
			if (key === 'Up')
				room.playerOne.coor.dy = 1;
			else if (key === 'Down')
				room.playerOne.coor.dy = -1;
			else
				room.playerOne.coor.dy = 0;

		}
		else if (room && room.playerTwo.user.login === login)
		{
			if (key === 'Up')
				room.playerTwo.coor.dy = 1;
			else if (key === 'Down')
				room.playerTwo.coor.dy = -1;
			else
				room.playerTwo.coor.dy = 0;
		}
	}
}