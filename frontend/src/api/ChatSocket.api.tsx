import { io } from "socket.io-client";
import React from "react";
import { Difficulty } from "./dto/game.dto";

interface ChatSocketAPIProps{
    receiveMessage: any;
    transmitService: any;
}

export class ChatSocketAPI extends React.Component<ChatSocketAPIProps>
{
	join(chanName: string) {
		throw new Error("Method not implemented.");
	}
    socket:any;
    activeChan?: number;
    

    constructor(props: ChatSocketAPIProps) {
        super(props)
        this.activeChan = undefined;
        this.socket = io(`${process.env.REACT_APP_CHAT_SOCKET}`, {secure: true});
        this.socket.on('connection', () => {
            this.socket.on('disconnect', (reason) => {
                console.log(reason);
            });
        });

        this.socket.on('message', message => {
            this.props.receiveMessage(message);
        });

        this.socket.on('service', message => {
            this.props.transmitService(message);
        });
    }

    joinRoom(chanId: number, userId: number) {
        if (this.activeChan) {
            this.socket.emit('leaveRoom', {id: this.activeChan});
        }
        this.socket.emit('joinRoom', {id: chanId, userId});
        this.activeChan = chanId;
    }

    sendMessage(chanId: number, content: string, authorId) {
        this.socket.emit('message', {authorId, content, chanId, service: false});
    }

    cancel() {
        if (this.socket)
            this.socket.close();
    }
    
    sendInvitation(chanId: number, userId: number, difficulty: Difficulty) {
        this.socket.emit('invitation', {chanId, userId, difficulty})
    }
}