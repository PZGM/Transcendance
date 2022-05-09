import { Box, ButtonBase, IconButton, InputBase, List, Stack, Typography } from "@mui/material";
import { ChatSocketAPI } from '../../api/ChatSocket.api'
import { Component} from "react";
import { Link, Navigate } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";
import { UserAPI } from "../../api/Users.api";
import SendIcon from '@mui/icons-material/Send';
import InfoIcon from '@mui/icons-material/Info';
import { ChatAPI } from "../../api/Chat.api";
import { io } from "socket.io-client";
import { UserDto } from "../../api/dto/user.dto";

interface ChatState {
	socket: any;
	chanName: string|null;
	messages: any[];
	input: string;
	users: UserDto[];
}

interface ChatProps {
    isPrivateMessage: boolean,
	params: any
};

export class Chat extends Component<ChatProps, ChatState> {
	chatSocket: ChatSocketAPI;

	constructor(props: ChatProps) {
		super(props);
		this.chatSocket = new ChatSocketAPI({transmitMessage: this.onMessage.bind(this)});
        this.state = {
			messages: [],
			socket: null,
			chanName: null,
			input: '...',
			users: [],
		}
	}

	componentDidMount()  {
		this.getName();
	}
	
	async getName() {
        const name = this.props.params.name;
        this.setState({
			chanName: name,
        })
    }

	// Select() {
	// 	this.getName();
	// }

	setmsg(input){
		this.setState({
			input
		})
	}

	async getChannel(chanName: string) {
		const channel = await ChatAPI.getChannelByName(chanName);
		this.setState({
			users: channel.users
		})
		console.log(channel);
	}

	renderMsg(list)
	{
		const listItems = list.map((msg: any) => {
			console.log('----')
			console.log(msg);
			console.log(this.state.users);
			const sender:UserDto|undefined = this.state.users.find((user) => {return user.id == msg.senderId});
			const color = (sender) ? sender.color : 'white';
			const login = (sender) ? sender.login : 'unknow'
			return (
			<>
				<Typography color={color}>{login}</Typography>
				<Typography color={'white'}>{msg.message}</Typography>
			</> 
			);
			
		});
		return listItems;
	}

	onMessage(message: any) {
		console.log('message in front:');
		console.log(message);
		this.state.messages.push(message);
		this.setState({
			messages: this.state.messages
		})
	}

    sendMessage(chanName: string) {
		if (this.state.chanName)
			this.chatSocket.sendMessage(this.state.chanName, this.state.input, 1);
		else
			console.log('chanName is null')
    }

	render () {
		console.log('render chat')
		const chanName:string = this.props.params.name;
		if (chanName && this.chatSocket) {
			this.getChannel(chanName);
			this.chatSocket.joinRoom(chanName);
		}
		return (
            <>
                <Box height="89%">
					<ol>
						{this.renderMsg(this.state.messages)}
					</ol>
				</Box>
				<Box height="50px" sx={{backgroundColor: "black"}}>
					<Stack direction="row" spacing={2} sx={{backgroundColor: "black"}}>
						<Link style={{backgroundColor: "black", display: "flex", justifyContent: "center", alignItems: "center"}} to={{pathname: (this.props.isPrivateMessage == true) ? process.env.REACT_APP_USER + "" + chanName + "/info" : process.env.REACT_APP_HOME_CHAN + "/" + chanName + "/info"}}
						onClickCapture={() => {}}>
							<InfoIcon fontSize="large" sx={{backgroundColor: "black",color: "white"}}/>
						</Link>

						<InputBase inputProps={{style: { color: "white" }}} placeholder="Send Message" sx={{marginLeft: "5px", width: "80%", height: "50px" }} onChange={(e) => {this.setmsg(e.target.value)}}/>
						<IconButton sx={{ color: "white" }} onClick={ () => {this.sendMessage(chanName)}}	>
							<SendIcon/>
						</IconButton>
					</Stack>
				</Box>
            </>

		)
	}
}