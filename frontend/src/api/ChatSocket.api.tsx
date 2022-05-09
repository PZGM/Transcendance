import { Box, ButtonBase, IconButton, InputBase, List, Stack, Typography } from "@mui/material";
import { Component} from "react";
import { Link, Navigate } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";
import SendIcon from '@mui/icons-material/Send';
import InfoIcon from '@mui/icons-material/Info';
import { io } from "socket.io-client";
import React from "react";

interface ChatSocketAPIProps{
    transmitMessage: any;
}

export class ChatSocketAPI extends React.Component<ChatSocketAPIProps> {
	join(chanName: string) {
		throw new Error("Method not implemented.");
	}
    socket:any;
    activeChan?: string;

    constructor(props: ChatSocketAPIProps) {
        super(props)
        this.activeChan = undefined;
        this.socket = io(`https://serv.pizzagami.fr:7333/chat`, {secure: true});
        this.socket.on('connection', () => {
            console.log("socket connected");
            this.socket.on('disconnect', (reason) => {
                console.log(reason);
            });
        });

        this.socket.on('message', message => {
			console.log("message")
			console.log(message);
            this.props.transmitMessage(message);
        });
    }

    joinRoom(chanName: string) {
        if (this.activeChan)
            this.socket.emit('leaveRoom', {name: chanName});
        this.socket.emit('joinRoom', {name: chanName});
        this.activeChan = chanName;
    }

    sendMessage(chanName: string, message: string, senderId) {
        this.socket.emit('message', {senderId, message, chanName});
    }
}