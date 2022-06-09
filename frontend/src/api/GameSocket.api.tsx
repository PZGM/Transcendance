import { io } from "socket.io-client";
import React from "react";
import { Difficulty, Room } from './dto/game.dto';
import { toast } from "react-toastify";
import { UserAPI } from "./Users.api";

interface GameSocketAPIProps{
    receiveGameRoom: any;
    updateRoom: any;
    updateDisplay: any;
}

export class GameSocketAPI extends React.Component<GameSocketAPIProps> {

	socket: any;

	constructor(props: GameSocketAPIProps) {
        super(props)
        this.socket = io(`${process.env.REACT_APP_GAME_SOCKET}`, {secure: true});
        this.socket.on('connection', () => {
            this.socket.on('disconnect', (err) => {
                console.log(err);
            });
        });
        this.socket.on("gameRoom", (room: Room) => {
            this.props.receiveGameRoom(room);
            this.socket.emit('joinRoom', {roomId: room.roomId});
        });

        this.socket.on('inviteGame', async (room: Room) => {
            this.props.receiveGameRoom(room);

            const user = await UserAPI.getMe()
            if (user) {
                toast.success(`invitation accepted`, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    pauseOnHover: false,
                    closeOnClick: true,
                })
            }
            this.socket.emit('joinRoom', {roomId: room.roomId})
        })

        this.socket.on('updateRoom', (room: Room) => {
            this.props.updateRoom(room);
        });

        this.socket.on('leftRoom', () => {
            this.props.updateDisplay(0)
        });

        this.socket.on('joinedPool', () => {
        });

        this.socket.on('joinedQueue', () => {
        });

        this.socket.on('leftQueue', () => {
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

    cancel() {
        if (this.socket)
            this.socket.close();
    }
}