import { io } from "socket.io-client";
import React from "react";

interface ChatSocketAPIProps{
    transmitMessage: any;
    transmitService: any;
}

export class ChatSocketAPI extends React.Component<ChatSocketAPIProps> {
	join(chanName: string) {
		throw new Error("Method not implemented.");
	}
    socket:any;
    activeChan?: number;
    

    constructor(props: ChatSocketAPIProps) {
        super(props)
        this.activeChan = undefined;
        console.log(`=====DOMAIN : ${process.env.REACT_APP_DOMAIN}`)
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

    joinRoom(chanId: number) {
        if (this.activeChan)
            this.socket.emit('leaveRoom', {id: chanId});
        this.socket.emit('joinRoom', {id: chanId});
        this.activeChan = chanId;
    }

    sendMessage(chanId: number, content: string, authorId) {
        this.socket.emit('message', {authorId, content, chanId, service: false});
    }
}