import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import Queue from './components/queue';
import Room from './components/room';
import { UserDto } from 'src/dto/user.dto';
import { User } from 'src/typeorm';
import { UsersService } from 'src/users/users.service';
import Pool from './components/pool';
import { roomEnum } from 'src/dto/game.dto';
import { statusEnum } from 'src/status/status.service';
import { Player } from './components/player';


@WebSocketGateway({namespace: '/game', cors: true})
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server
    wss: any;
    private readonly usersService: UsersService; //add  something for  spectator
    private readonly queue: Queue = new Queue();
    private readonly pool: Pool = new Pool();
    private readonly rooms: Map<string, Room> = new Map();
    private logger = new Logger('GameGateway');

    afterInit(server: Server) {
        setInterval(() => {
			if (this.queue.size() > 1) {
				const playerOne : UserDto= this.queue.getOneUser();
                const playerTwo : UserDto = this.queue.getOneUser();
				const  roomId: string = `${playerOne.id} vs ${playerTwo.id} at ${Date.now()}`;
				
				room = new Room(roomId, );
				
				this.server.to(playerOne.socketId).emit("newRoom", room);
				this.server.to(playerTwo.socketId).emit("newRoom",  room);
				this.rooms.set(roomId, room);
				this.server.emit("New Game Room", roomId);
			}
		}, 3000);
		this.logger.log(`Init Pong Gateway`);
    }

    handleConnection(socket: Socket) {
        console.log(`Client connected: ${socket.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
      }

    @SubscribeMessage('handleUserConnect')
	async handleUserConnect(@ConnectedSocket() client: Socket, userId : number) {
		const user : User = await this.usersService.getOne(userId);
        this.rooms.forEach((room: Room) => {
			if (room.isPlayer(user) && room.status !== 3)
				return ;
		});
		this.pool.addToPool(user);
        this.server.to(client.id).emit('joinedPool');
        this.usersService.setUserSocket(userId, client.id);
        this.usersService.setUserStatus(userId, statusEnum.connected);
	}

    async handleDisconnect2(client: Socket, userId: number) {
        const user : User = await this.usersService.getOne(userId);
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
			this.logger.log(`Client ${user.login} disconnected: ${client.id}`);
		}
        this.usersService.setUserStatus(userId, statusEnum.disconected);
    }
    @SubscribeMessage('joinQueue') //roomDto
	async handleJoinQueue(@ConnectedSocket() client: Socket, userId : number) {
		const user : User = await this.usersService.getOne(userId);
		if (user && !this.queue.find(user))
		{
			this.pool.changeStatus(statusEnum.inQueue, user);
			this.queue.addToQueue(user);
			this.server.to(client.id).emit('joinedQueue');
			this.logger.log(`Client ${user.login}: ${client.id} was added to queue !`);
		}
        this.usersService.setUserStatus(userId, statusEnum.inQueue);
	}

	@SubscribeMessage('leaveQueue')
	async handleLeaveQueue(@ConnectedSocket() client: Socket, userId : number) {
    const user : User = await this.usersService.getOne(userId);
		if (user && this.queue.find(user))
		{
			this.queue.rmToQueue(user);
            this.pool.changeStatus(statusEnum.idle, user);
			this.server.to(client.id).emit('leavedQueue');
		}
        this.usersService.setUserStatus(userId, statusEnum.idle);
	}
    @SubscribeMessage('spectateRoom')
	async handleSpectateRoom(@ConnectedSocket() client: Socket, userId: number, roomId: number) {
		const room: Room = this.rooms.get(roomId);
		if (room) {
			const user = this.pool.find(await this.usersService.getOne(userId));
			if (!room.isPlayer(user)) {
				this.server.to(client.id).emit("Game Room", room);
                this.pool.changeStatus(statusEnum.watching, user);
            }
            this.usersService.setUserStatus(userId, statusEnum.watching);
        }
	}

    @SubscribeMessage('leaveRoom')
	async handleLeaveRoom(@ConnectedSocket() client: Socket, userId : number ,roomId: number) {
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
		this.server.to(client.id).emit("leavedRoom");
	}
}