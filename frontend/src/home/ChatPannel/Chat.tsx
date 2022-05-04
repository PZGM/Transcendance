import { Box, ButtonBase, IconButton, InputBase, List, Stack, Typography } from "@mui/material";
import { Component} from "react";
import { Link, Navigate } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";
import { UserAPI } from "../../api/Users.api";
import SendIcon from '@mui/icons-material/Send';
import InfoIcon from '@mui/icons-material/Info';
import { ChatAPI } from "../../api/Chat.api";
import { io } from "socket.io-client";

interface ChatState {
    chanName: string
	msg: string
	channels: null,
	socket: any,
	channel: null
}

interface ChatProps {
    params: any,
    isPrivateMessage: boolean,
};

export class Chat extends Component<ChatProps, ChatState> {
	constructor(props: ChatProps) {
		super(props);
        this.state = {
            chanName: "",
            msg: "",
			channels: null,
			socket: null,
			channel: null	
        }
	}
	sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
	componentDidMount()  {
		this.getName();
		this.configureSocket();

	}
	
	async getName() {
        const name = this.props.params.name;
        this.setState({
			chanName: name,
        })
		console.log("NAME : " + name)
    }

	Select() {
		this.getName();
	}

	setmsg(letter){
		let msg =letter;
		
		this.setState({
			msg: msg,
        })

	}
	async getmsg() {
		this.getName();
		const chat = await ChatAPI.getChannelByName(this.props.params.name)
		// const chat = await ChatAPI.getChannelByName("qwerty")
		console.log("le msg est : " + this.state.msg);
	}
	async sendMsg(){
		const channel = await ChatAPI.getChannelByName(this.props.params.name);
		const author = await UserAPI.getUser();
		await ChatAPI.addMsg(new Date(), this.state.msg, author, channel)
	}
// il faut trouver un moyen d'afficher le chat (je dirais qu'il faut le faire a la discord)

	renderMsg(list)
	{
		const listItems = list.map((msg: string) =>
		<>
			<Stack direction="row" spacing={2}>
				<Typography color={"white"}> Afreire- </Typography>
				<Typography color={"white"}> 26/04/2022 15:14 </Typography>
			</Stack>
			<Typography color={"white"}> Hello sucker ! </Typography>
		</>
		);
		return listItems;
	}


    configureSocket = () => {
        var socket = io("http://serv.pizzagami.fr:4007");
		console.log("NIKE TA PUTSINDE MERE LES SOCKET CA ME PETE LES COUILLES");
		console.log(socket);
        socket.on('connection', () => {
            console.log("connect");
            socket.on('disconnect', (reason) => {
                console.log(reason);
            });
        });

        socket.on('msgToClient', (channel) => {
			console.log("msgToclient ?")
			console.log(channel);
        });
        socket.on('connect_error', (error) => {
			console.log("il y a vraiment une erreur ?")
            console.log(error);
        });
        socket.on('message', message => {
			console.log("message ?")
			console.log(message);
        });
        socket.on('disconnect', (reason) => {
			console.log("dsiconnect ?")
			console.log(reason);
        });

        this.setState({
			socket: socket,
		})
    }

    handleSendMessage = () => {
        console.log("trying");

        this.state.socket.emit('send-message', { name: 'myname', text: 'mytext' });
    }
	render () {
		return (
            <>
                <Box height="89%">
						<List style={{overflow: 'auto'}} sx={{height: "97%"}}>
						<Stack spacing={1}>
							{this.renderMsg([])}
						</Stack>
						</List>
				</Box>
				  
				<Box height="50px" sx={{backgroundColor: "black"}}>
					<Stack direction="row" spacing={2} sx={{backgroundColor: "black"}}>
						<Link style={{backgroundColor: "black", display: "flex", justifyContent: "center", alignItems: "center"}} to={{pathname: (this.props.isPrivateMessage == true) ? process.env.REACT_APP_USER + "" + this.state.chanName + "/info" : process.env.REACT_APP_HOME_CHAN + "/" + this.state.chanName + "/info"}}
						onClickCapture={() => {this.Select()}}>
							<InfoIcon fontSize="large" sx={{backgroundColor: "black",color: "white"}}/>
						</Link>

						<InputBase inputProps={{style: { color: "white" }}} placeholder="Send Message" sx={{marginLeft: "5px", width: "80%", height: "50px" }} onChange={(e) => {this.setmsg(e.target.value)}}/>
						<IconButton sx={{ color: "white" }} onClick={ () => {this.sendMsg()}}	>
							<SendIcon/>
						</IconButton>
					</Stack>
				</Box>
            </>

		)
	}
}