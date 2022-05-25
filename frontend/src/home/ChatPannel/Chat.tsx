import { Avatar, Box, Stack } from "@mui/material";
import { ChatSocketAPI } from '../../api/ChatSocket.api'
import { Component} from "react";
import { Navigate } from "react-router-dom";
import { UserAPI } from "../../api/Users.api";
import { ChatAPI } from "../../api/Chat.api";
import { UserDto } from "../../api/dto/user.dto";
import { MessageDto } from '../../api/dto/chat.dto';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { ChannelDto } from "../../api/dto/channel.dto";
import "../../style/input.css"
import Invite from "./tools/InviteUser"

interface ChatState {
	socket: any;
	messages: MessageDto[];
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
		this.chatSocket = new ChatSocketAPI({receiveMessage: this.onMessage.bind(this),
											transmitService: this.onService.bind(this)});
        this.state = {
			messages: [],
			socket: null,
			input: '',
			users: [],
			user: undefined,
			chan: undefined
		}
	}

	onInputChange(input){
		this.setState({
			input
		})
	}

	renderMsg(list)
    {
		let lastAuthorId: number = -1;
        const listItems = list.map((msg: MessageDto) => {
			const sender:UserDto|undefined = this.state.users.find((user) => {return user.id === msg.authorId});
			const color = (sender) ? sender.color : 'white';
			const login = (sender) ? sender.login : 'unknow';
			const avatar = (sender) ? sender.avatar : '';
			const isFirst: boolean = msg.authorId !== lastAuthorId;
			lastAuthorId = (msg.service) ? - msg.authorId : msg.authorId;

			if (msg.service && msg.content === 'JOIN')
				return (
				<Stack key={msg.date.toString()} direction="row" justifyContent="flex-start" alignItems="center">
					<KeyboardDoubleArrowRightIcon sx={{width: "68px", color: 'green'}}/>
					<div style={{color: "white", width: '100%', fontSize: '1.5rem', fontStyle: 'italic'}} >{`${login} joined the channel`}</div>
				</Stack> )
				
			if (msg.service && msg.content === 'LEAVE')
				return (
				<Stack key={msg.date.toString()} direction="row" justifyContent="flex-start" alignItems="center">
					<KeyboardDoubleArrowLeftIcon sx={{width: "68px", color: 'red'}}/>
					<div style={{color: "white", width: '100%', fontSize: '1.5rem', fontStyle: 'italic'}} >{`${login} left the channel`}</div>
				</Stack>)
			
			if (msg.service && msg.content === 'PROMOTE')
			return (
			<Stack key={msg.date.toString()} direction="row" justifyContent="flex-start" alignItems="center">
				<KeyboardArrowUpIcon sx={{width: "68px", color: 'cyan'}}/>
				<div style={{color: "white", width: '100%', fontSize: '1.5rem', fontStyle: 'italic'}} >{`${login} is now admin`}</div>
			</Stack>)

			if (msg.service && msg.content === 'DEMOTE')
			return (
			<Stack key={msg.date.toString()} direction="row" justifyContent="flex-start" alignItems="center">
				<KeyboardArrowDownIcon sx={{width: "68px", color: 'orange'}}/>
				<div style={{color: "white", width: '100%', fontSize: '1.5rem', fontStyle: 'italic'}} >{`${login} is no longer admin`}</div>
			</Stack>)

			if (msg.service && msg.content === 'OWNERED')
			return (
			<Stack key={msg.date.toString()} direction="row" justifyContent="flex-start" alignItems="center">
				<StarOutlineIcon sx={{width: "68px", color: 'yellow'}}/>
				<div style={{color: "white", width: '100%', fontSize: '1.5rem', fontStyle: 'italic'}} >{`${login} is the new owner`}</div>
			</Stack>)

			if (isFirst)
            return <Stack key={msg.date.toString()} direction="row" spacing={1} style={{width: '100%', fontSize: '1.5rem'}}>
                        <Avatar variant='circular' src={avatar} sx={{margin: "10px"}}/>
                        <Stack direction="column" justifyContent="space-around" style={{width: '100%'}}>
                            <div style={{color, fontWeight: "bold"}}> {login} </div>
                            <div style={{color: "white"}}> {msg.content} </div>
                        </Stack>

                    </Stack>
			

            return <div key={msg.date.toString()} style={{color: "white", paddingLeft: "68px", fontSize: '1.5rem'}}> {msg.content} </div>;
		});
        return listItems;
    }

	onMessage(message: any) {
		this.state.messages.push(message);
		this.setState({
			messages: this.state.messages
		})
	}

	async onService(message: any) {
		message.service = true;
		if (message.content === 'JOIN') {
			const user = await UserAPI.getUserById(message.authorId);
			if (user == null) {
				throw(Error('unknow new user'));
			}
			this.state.users.push(user);
		}

		this.state.messages.push(message);
		this.setState({
			messages: this.state.messages
		})
	}

	onKeyDown(e) {
		if (e.keyCode === 13)
			this.sendMessage(this.chanName);
	}

	onFocus(e) {
		if (e.relatedTarget){}
	}

    sendMessage(chanName: string) {
		if (chanName && this.state.input !== '') {
			this.chatSocket.sendMessage(this.state.chan.id, this.state.input, this.state.user.id);
			this.setState({
				input: ''
			});
		}
    }

	async switchChannel(newChannelName: string){
		this.chanName = newChannelName;
		const user = await UserAPI.getUser();
		const channel: ChannelDto = await ChatAPI.getChannelByName(this.chanName, {withAdmin: true, withOwner: true});
		if (!channel || !user) {
			return;
		}
		let messages = await ChatAPI.getByChannelId(channel.id);
		this.chatSocket.joinRoom(channel.id, user.id);
		this.setState({
			users: channel.users,
			user,
			chan: channel,
			messages
		});
	}

	render () {
		if (this.chanName !== this.props.params.name) {
			if (!this.switchChannel(this.props.params.name))
			{
				return <Navigate to='404' />
			}
		}
		return (
            <>
                <Box height="87.5%">
					<ol>
						{this.renderMsg(this.state.messages)}
					</ol>
				</Box>
				<Box height="50px" sx={{backgroundColor: "black"}}>
					<Stack direction="row" spacing={1} justifyContent="space_evenly" sx={{backgroundColor: "black"}}>
						<Invite/>
						<input className="chat_bar" placeholder="Write message" value={this.state.input} onKeyDown={(e) => {this.onKeyDown(e)}} onChange={(e) => {this.onInputChange(e.target.value)}}/>
						{/* <InputBase inputProps={{style: { color: "white" }}} placeholder="Send Message" sx={{marginLeft: "5px", width: "80%", height: "3.7vh", border: "2px solid white", padding:"3px", boxShadow: "0.25vw 0.25vw 0px -0.05 rgba(19,213,144,0.5)" }} value={this.state.input} onKeyDown={(e) => {this.onKeyDown(e)}} onChange={(e) => {this.onInputChange(e.target.value)}}/> */}
						<div className="send_msg_button but_green" onClick={ () => {this.sendMessage(this.chanName)}}>
							<img src={require('../../asset/images/xwhite.png')} style={{width: '75%'}} alt='cross'/>
						</div>
					</Stack>
				</Box>
            </>

		)
	}
}