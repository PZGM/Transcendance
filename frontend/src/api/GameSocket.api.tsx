import { io } from "socket.io-client";
import React from "react";
import { Difficulty, RoomDto } from './dto/game.dto';

interface GameSocketAPIProps{
    receiveGameRoom: any;
    updateRoom: any;
}

export class GameSocketAPI extends React.Component<GameSocketAPIProps> {

	socket: any;

	constructor(props: GameSocketAPIProps) {
        super(props)
        this.socket = io(`https://serv.pizzagami.fr:6333/game`, {secure: true});
        this.socket.on('connection', () => {
            console.log("socket connected");
            this.socket.on('disconnect', (reason) => {
                console.log(reason);
            });
        });
    }

    // Gateway functions callers

	userConnection(userId: number) {
		this.socket.emit('handleUserConnect', {id: userId});
	}

	joinQueue(userId: number, difficulty: Difficulty) {
		this.socket.emit('joinQueue', {id: userId, difficulty :difficulty});
	}

    leaveQueue(userId: number) {
		this.socket.emit('leaveQueue', userId);
	}

    spectateRoom(userId: number, roomId: string) {
		this.socket.emit('spectateRoom', {userId: userId, roomId :roomId});
	}

    leaveRoom(userId: number, roomId: string) {
		this.socket.emit('leaveRoom', {userId: userId, roomId : roomId});
	}

    updateRoom(roomId: string) {
		this.socket.emit('updateRoom', { roomId : roomId});
	}

    key(userId: number, roomId: string, key: string) {
		this.socket.emit('joinQueue', {userId: userId, roomId : roomId, key : key});
	}

    // Gateway functions receivers

    receiveGameRoom() {
        this.socket.on('gameRoom', (room: RoomDto) => {
            this.props.receiveGameRoom(room);
            this.socket.emit('joinRoom', room.roomId);
        });
    }

    // receiveNewRoomId() {
    //     this.socket.on('newRoom', room => {
    //         this.props.receiveRoom(room);
    //     });
    // }
    
    // receiveSpectateRoom() {
    //     this.socket.on('spectRoom', (room) => {
    //         this.props.receiveSpectRoom(room)
    //     })
    // }

    recieveUpdateRoom() {
        this.socket.on('updateRoom', (room) => {
            this.props.updateRoom(room);
        })
    }

    receiveLeftRoomConf() {
        this.socket.on('leftRoom', () => {
            console.log('Left Room')
        });
    }

    receiveJoinPoolConf() {
        this.socket.on('joinedPool', () => {
            console.log('Joined Pool')
        });
    }

    receiveJoinQueueConf() {
        this.socket.on('joinedQueue', () => {
            console.log('Joined Queue')
        });
    }

    receiveLeftQueueConf() {
        this.socket.on('leftQueue', () => {
            console.log('Left Queue')
        });
    }
}