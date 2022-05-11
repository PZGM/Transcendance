import { Avatar, Box, ButtonBase, IconButton, InputBase, List, Stack, Typography } from "@mui/material";
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
	messages: any[];
	input: string;
	chan: any;
	users: UserDto[];
	user: any,
}

interface ChatProps {
    isPrivateMessage: boolean,
	params: any
};

export class Chat extends Component<ChatProps, ChatState> {
	chatSocket: ChatSocketAPI;
	chanName: string = '';

	constructor(props: ChatProps) {
		super(props);
		this.chatSocket = new ChatSocketAPI({transmitMessage: this.onMessage.bind(this)});
        this.state = {
			messages: [],
			socket: null,
			input: '',
			users: [],
			user: undefined,
			chan: undefined
		}
	}

	componentDidMount()  {
		this.getName();
	}
	
	async getName() {
        const name = this.props.params.name;
    }

	// Select() {
	// 	this.getName();
	// }

	onInputChange(input){
		this.setState({
			input
		})
	}

	renderMsg(list)
    {
		let lastAuthor: number = -1;
        const listItems = list.map((msg: any) => {
			console.log('message:');
			console.log(msg);
			const sender:UserDto|undefined = this.state.users.find((user) => {return user.id == msg.authorId});
			const color = (sender) ? sender.color : 'white';
			const login = (sender) ? sender.login : 'unknow';
			const avatar = (sender) ? sender.avatar : '';
			const isFirst: boolean = msg.authorId != lastAuthor;
			lastAuthor = msg.authorId;
			console.log(`isFirst : ${isFirst}`);
            return <>
                { isFirst &&
                    <Stack direction="row" spacing={1} style={{width: '100%', fontSize: '1vw'}}>
                        <Avatar variant='circular'
                            src={avatar}
                            style={{height: '2.7vw', width: '2.7vw'}}
                        />

                        <Stack direction="column" justifyContent="space-around" style={{width: '100%'}}>
                            <div style={{color, fontWeight: "bold"}}> {login} </div>
                            <div style={{color: "white"}}> {msg.content} </div>
                        </Stack>

                    </Stack>
                }

                {!isFirst &&
                    <div style={{color: "white", paddingLeft: "calc(2.7vw + 5px)", fontSize: '1vw'}}> {msg.content} </div>
                }

            </>
		}
        );
        return listItems;
    }

	onMessage(message: any) {
		this.state.messages.push(message);
		this.setState({
			messages: this.state.messages
		})
	}

    sendMessage(chanName: string) {
		if (chanName) {
			this.chatSocket.sendMessage(chanName, this.state.input, this.state.user.id);
			ChatAPI.addMessage(this.state.input, this.state.user.id, this.state.chan.id);
			this.setState({
				input: ''
			})
		}
		else
			console.log('chanName is null')
    }

	async switchChannel(newChannelName: string) {
		this.chanName = newChannelName;
		this.chatSocket.joinRoom(this.chanName);
		const user = await UserAPI.getUser();
		const channel = await ChatAPI.getChannelByName(this.chanName);
		let messages = await ChatAPI.getByChannelId(channel.id);
		if (!messages)
			messages = [];
		this.setState({
			users: channel.users,
			user,
			chan: channel,
			messages
		})
	}

	render () {
		if (this.chanName != this.props.params.name) {
			this.switchChannel(this.props.params.name)
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
						<Link style={{backgroundColor: "black", display: "flex", justifyContent: "center", alignItems: "center"}} to={{pathname: (this.props.isPrivateMessage == true) ? process.env.REACT_APP_USER + "" + this.chanName + "/info" : process.env.REACT_APP_HOME_CHAN + "/" + this.chanName + "/info"}}
						onClickCapture={() => {}}>
							<InfoIcon fontSize="large" sx={{backgroundColor: "black",color: "white"}}/>
						</Link>

						<InputBase inputProps={{style: { color: "white" }}} placeholder="Send Message" sx={{marginLeft: "5px", width: "80%", height: "50px" }} value={this.state.input} onChange={(e) => {this.onInputChange(e.target.value)}}/>
						<IconButton sx={{ color: "white" }} onClick={ () => {this.sendMessage(this.chanName)}}	>
							<SendIcon/>
						</IconButton>
					</Stack>
				</Box>
            </>

		)
	}
}