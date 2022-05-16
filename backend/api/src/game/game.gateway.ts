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
import { statusEnum, StatusService } from 'src/status/status.service';
import { PInit, Player } from './components/player';
import { Difficulty } from './components/coor';
import { GameService } from './game.service';
import { HistoryService } from 'src/history/history.service';


@WebSocketGateway({namespace: '/game', cors: true})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer() server: Server
    wss: any;
    private readonly usersService: UsersService;
	private readonly historyService: HistoryService;
    private readonly queue: Queue = new Queue();
    private readonly pool: Pool = new Pool();
    private readonly rooms: Map<string, Room> = new Map();
    private logger = new Logger('GameGateway');

    afterInit(server: Server) {
        setInterval(() => {

			let playerOne: UserDto
			let playerTwo: UserDto
			let roomId: string
			let room: Room
			if((this.queue.sizeEasy() > 1) || (this.queue.sizeMedium() > 1) || (this.queue.sizeHard() > 1)) {
				if (this.queue.sizeEasy() > 1) {
					console.log('Easy Room')
					playerOne = this.queue.getOneUser(Difficulty.Easy);
					playerTwo  = this.queue.getOneUser(Difficulty.Easy);
					roomId = `${Difficulty.Easy}${playerOne.id}${playerTwo.id}${Date.now().toPrecision(5)}`;	
					room = new Room(roomId, Difficulty.Easy, playerOne, playerTwo);
				}
				else if (this.queue.sizeMedium() > 1) {
					playerOne = this.queue.getOneUser(Difficulty.Medium);
					playerTwo = this.queue.getOneUser(Difficulty.Medium);
					roomId = `${Difficulty.Medium}${playerOne.id}${playerTwo.id}${Date.now().toPrecision(5)}`;
					room = new Room(roomId, Difficulty.Medium, playerOne, playerTwo);
				}
				else if (this.queue.sizeHard() > 1) {
					playerOne = this.queue.getOneUser(Difficulty.Hard);
					playerTwo = this.queue.getOneUser(Difficulty.Hard);
					roomId = `Hard: ${playerOne.id} vs ${playerTwo.id} at ${Date.now()}`;
					room = new Room(roomId, Difficulty.Hard, playerOne, playerTwo);
				}
				this.usersService.setUserStatus(playerOne.id, statusEnum.playing);
				this.usersService.setUserStatus(playerOne.id, statusEnum.playing);
				this.server.to(playerOne.socketId).emit("gameRoom", room);
				this.server.to(playerTwo.socketId).emit("gameRoom",  room);
				this.rooms.set(roomId, room);
			}
		}, 2000);
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

	@SubscribeMessage('joinRoom')
	async handleJoinRoom(@ConnectedSocket() socket: Socket, roomId: string) {
		const room: Room = this.rooms.get(roomId);
		if (room) {
			const user : User = await this.usersService.getOneBySocket(socket.id);
			socket.join(roomId);
			if (room.isPlayer(user))
				room.playerTwo = new Player(new PInit(room.playerOne.coor.difficulty, 2 , user));
			if (user.status === statusEnum.connected) {
				this.usersService.setUserStatus(user.id, statusEnum.watching);
			}
			this.server.to(socket.id).emit("joinedRoom");
			this.server.to(socket.id).emit("updateRoom", room);
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
			console.log(`socket ${user.login}: ${socket.id} was added to queue !`)
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
			this.server.to(socket.id).emit('leftQueue');
		}
        this.usersService.setUserStatus(userId, statusEnum.idle);
	}

    @SubscribeMessage('spectateRoom')
	async handleSpectateRoom(@ConnectedSocket() socket: Socket, userId: number, roomId: string) {
		const room: Room = this.rooms.get(roomId);
		if (room) {
			const user = this.pool.find(await this.usersService.getOne(userId));
			if (!room.isPlayer(user)) {
				this.server.to(socket.id).emit("gameRoom", room);
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
		this.server.to(socket.id).emit("leftRoom");
	}

	@SubscribeMessage('updateRoom')
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
	async handleKeyUp(@ConnectedSocket() socket: Socket, userId: number, roomId: string, key: string) {
		const room: Room = this.rooms.get(roomId);

		if (room && room.playerOne.user.id === userId)
		{
			if (key === 'Up')
				room.playerOne.coor.dy = 1;
			else if (key === 'Down')
				room.playerOne.coor.dy = -1;
			else
				room.playerOne.coor.dy = 0;

		}
		else if (room && room.playerTwo.user.id === userId)
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