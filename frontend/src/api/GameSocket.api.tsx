import { io } from "socket.io-client";
import React from "react";
import { Difficulty, Room } from './dto/game.dto';

interface GameSocketAPIProps{
    receiveGameRoom: any;
    updateRoom: any;
}

export class GameSocketAPI extends React.Component<GameSocketAPIProps> {

	socket: any;

	constructor(props: GameSocketAPIProps) {
        super(props)
        this.socket = io(`${process.env.REACT_APP_GAME_SOCKET}`, {secure: true});
        this.socket.on('connection', () => {
            console.log("socket connected");
            this.socket.on('disconnect', (reason) => {
                console.log(reason);
            });
        });
        this.socket.on("gameRoom", (room: Room) => {
            this.props.receiveGameRoom(room);
            console.log(room);
            this.socket.emit('joinRoom', {roomId: room.roomId});
        });

        this.socket.on('updateRoom', (room: Room) => {
            this.props.updateRoom(room);
        });

        this.socket.on('leftRoom', () => {
            console.log('Left Room')
        });

        this.socket.on('joinedPool', () => {
            console.log('Joined Pool')
        });

        this.socket.on('joinedQueue', () => {
            console.log('Joined Queue')
        });

        this.socket.on('leftQueue', () => {
            console.log('Left Queue')
        });
               
    }

    // Gateway functions callers

	userConnection(userId: number) {
        this.socket.emit('handleUserConnect', {id: userId});
    }

    joinQueue(userId: number, difficulty: Difficulty) {
        this.socket.emit('joinQueue', {userId: userId, difficulty :difficulty});
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
        this.socket.emit('key', {userId: userId, roomId : roomId, key : key});
    }
}