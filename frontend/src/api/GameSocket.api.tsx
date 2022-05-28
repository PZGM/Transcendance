import { io } from "socket.io-client";
import React from "react";
import { Difficulty, Room } from './dto/game.dto';
import { NumberLiteralType } from "typescript";
import { ThirtyFpsSelectRounded } from "@mui/icons-material";

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

        this.socket.on('inviteGame', (room: Room) => {
            console.log('inviteGame')
            this.props.receiveGameRoom(room);
            this.socket.emit('joinRoom', {roomId: room.roomId})
        })

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
        this.socket.emit('handleUserConnect', {userId});
    }

    joinRoom(roomId: number) {
        this.socket.emit('roomInvite', {roomId})
    }

    spectateRoom(userId: number, roomId: string) {
        this.socket.emit('spectateRoom', {userId, roomId});
    }

    joinQueue(userId: number, difficulty: Difficulty) {
        this.socket.emit('joinQueue', {userId, difficulty});
    }

    leaveQueue(userId: number) {
        this.socket.emit('leaveQueue', userId);
    }

    leaveRoom(userId: number, roomId: string) {
        this.socket.emit('leaveRoom', {userId, roomId});
    }

    updateRoom(roomId: string) {
        this.socket.emit('updateRoom', {roomId});
    }

    key(userId: number, roomId: string, key: string) {
        this.socket.emit('key', {userId, roomId, key});
    }
}