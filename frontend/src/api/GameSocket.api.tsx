import { io } from "socket.io-client";
import React from "react";
import { Difficulty } from './dto/game.dto';

interface GameSocketAPIProps{
    transmitMessage: any;
    transmitService: any;
}

export class GameSocketAPI extends React.Component<GameSocketAPIProps> {

	socket: any;

	constructor(props: GameSocketAPIProps) {
        super(props)
        this.socket = io(`https://serv.pizzagami.fr:7333/chat`, {secure: true});
        this.socket.on('connection', () => {
            console.log("socket connected");
            this.socket.on('disconnect', (reason) => {
                console.log(reason);
            });
        });

        this.socket.on('message', message => {
            this.props.transmitMessage(message);
        });

        this.socket.on('service', message => {
            this.props.transmitService(message);
        });
    }

	userConnection(userId: number) {
		this.socket.emit('handleUserConnect', userId);
	}

	joinQueue(userId: number, difficulty: Difficulty) {
		this.socket.emit('joinQueue', userId, difficulty);
	}

}