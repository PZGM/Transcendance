import { Avatar, Box, Stack } from "@mui/material";
import { ChatSocketAPI } from '../../api/ChatSocket.api'
import { Component} from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { UserAPI } from "../../api/Users.api";
import { ChatAPI } from "../../api/Chat.api";
import { ChannelDto } from "../../api/dto/channel.dto";
import { UserDto } from "../../api/dto/user.dto";
import { MessageDto } from '../../api/dto/chat.dto';
import { Link } from "react-router-dom";

import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import EditIcon from '@mui/icons-material/Edit';

import Invite from "./tools/Invite"
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { InvitationAPI } from "../../api/Invitation.api";
import { Difficulty } from "../../api/dto/game.dto";
import { toast } from "react-toastify";
import "../../style/input.css"
import "../../style/home.css"

export enum statusEnum {
    unknow,
    disconected,
    idle,
    connected,
    playing,
    watching,
    inQueue
}

interface ChatState {
	socket: any;
	messages: MessageDto[];
	input: string;
	chan: any;
	users: UserDto[];
	user: any,
	isMuted: boolean;
	redirect: boolean;
}

interface ChatProps {
    isPrivateMessage: boolean,
	params: any
};

export class Chat extends Component<ChatProps, ChatState> {
	chatSocket: ChatSocketAPI;
	chanName: string = '';
	ret:boolean = false;

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
			chan: undefined,
			isMuted: false,
			redirect: false
		}
	}

	onInputChange(input){
		this.setState({
			input
		})
	}

	async updateMuted(channelId: number, userId: number) {
		const muted: number = await ChatAPI.muteRemaining(userId, channelId);
		const isMuted = (muted != -1);
		this.setState({
			isMuted
		})
	}

	renderMsg(list)
    {
		let lastAuthorId: number = -1;
		let blockedNotif:boolean = false;
        const listItems = list.map((msg: MessageDto) => {
			const sender:UserDto|undefined = this.state.users.find((user) => {return user.id === msg.authorId});
			const color = (sender) ? sender.color : 'white';
			const login = (sender) ? sender.login : 'unknow';
			const avatar = (sender) ? sender.avatar : '';
			const isFirst: boolean = msg.authorId !== lastAuthorId;
			lastAuthorId = (msg.service) ? - msg.authorId : msg.authorId;
			if (!msg.service) {
				if (this.state.user?.blockedUsers?.some((blocked) => {return blocked.id === sender?.id})) {
					if (!blockedNotif && !msg.service) {
						blockedNotif = true;
						return (
							<div style={{paddingLeft: "68px", color: 'grey', width: '100%', fontSize: '1.2rem', fontStyle: 'italic'}} >messages(s) sent by blocked user(s)</div>
						)
					}
					return;
				}
			}
			if (msg.service && msg.content === 'JOIN')
				return (
				<Stack key={msg.date.toString() + sender?.color + sender?.login + sender?.avatar} direction="row" justifyContent="flex-start" alignItems="center">
					<KeyboardDoubleArrowRightIcon sx={{width: "4.7vw", color: 'green'}}/>
					<div className="service_message" >{`${login} joined the channel`}</div>
				</Stack> )
			
			blockedNotif = false;
			
			if (msg.service && msg.content === 'LEAVE')
				return (
				<Stack key={msg.date.toString() + sender?.color + sender?.login + sender?.avatar} direction="row" justifyContent="flex-start" alignItems="center">
					<KeyboardDoubleArrowLeftIcon sx={{width: "4.7vw", color: 'red'}}/>
					<div className="service_message" >{`${login} left the channel`}</div>
				</Stack>)
			
			if (msg.service && msg.content === 'PROMOTE')
			return (
			<Stack key={msg.date.toString() + sender?.color + sender?.login + sender?.avatar} direction="row" justifyContent="flex-start" alignItems="center">
				<KeyboardArrowUpIcon sx={{width: "4.7vw", color: 'cyan'}}/>
				<div className="service_message" >{`${login} is now admin`}</div>
			</Stack>)

			if (msg.service && msg.content === 'DEMOTE')
			return (
			<Stack key={msg.date.toString() + sender?.color + sender?.login + sender?.avatar} direction="row" justifyContent="flex-start" alignItems="center">
				<KeyboardArrowDownIcon sx={{width: "4.7vw", color: 'orange'}}/>
				<div className="service_message" >{`${login} is no longer admin`}</div>
			</Stack>)

			if (msg.service && msg.content === 'OWNERED')
			return (
			<Stack key={msg.date.toString() + sender?.color + sender?.login + sender?.avatar} direction="row" justifyContent="flex-start" alignItems="center">
				<StarOutlineIcon sx={{width: "4.7vw", color: 'yellow'}}/>
				<div className="service_message" >{`${login} is the new owner`}</div>
			</Stack>)

			if (msg.service && msg.content === 'MUTE')
			return (
			<Stack key={msg.date.toString() + sender?.color + sender?.login + sender?.avatar} direction="row" justifyContent="flex-start" alignItems="center">
				<VolumeOffIcon sx={{width: "4.7vw", color: 'red'}}/>
				<div className="service_message" >{`${login} has been muted`}</div>
			</Stack>)

			if (msg.service && msg.content === 'UNMUTE')
			return (
			<Stack key={msg.date.toString() + sender?.color + sender?.login + sender?.avatar} direction="row" justifyContent="flex-start" alignItems="center">
				<VolumeUpIcon sx={{width: "4.7vw", color: 'green'}}/>
				<div className="service_message" >{`${login} has been unmuted`}</div>
			</Stack>)

			if (msg.service && msg.content === 'BANNED')
			return (
			<Stack key={msg.date.toString() + sender?.color + sender?.login + sender?.avatar} direction="row" justifyContent="flex-start" alignItems="center">
				<PersonOffIcon sx={{width: "4.7vw", color: 'red'}}/>
				<div className="service_message" >{`${login} has been banned`}</div>
			</Stack>)

			if (msg.service && msg.content === 'UNBANNED')
			return (
			<Stack key={msg.date.toString() + sender?.color + sender?.login + sender?.avatar} direction="row" justifyContent="flex-start" alignItems="center">
				<HowToRegIcon sx={{width: "4.7vw", color: 'green'}}/>
				<div className="service_message" >{`${login} is no longer bannned`}</div>
			</Stack>)

			if (msg.service && msg.content === 'LOGINED')
			return (
			<Stack key={msg.date.toString() + sender?.color + sender?.login + sender?.avatar} direction="row" justifyContent="flex-start" alignItems="center">
				<EditIcon sx={{width: "4.7vw", color: 'white'}}/>
				<div className="service_message" >{`${login} changed his login`}</div>
			</Stack>)

			// Don't show invitation message if you're the author
			if (msg.service && (msg.content === 'INVITE-EASY' || msg.content === 'INVITE-MEDIUM' || msg.content === 'INVITE-HARD') && this.state.user.id == msg.authorId) {
				if (msg.service && msg.content === 'INVITE-EASY')
				return (
					<Stack key={msg.date.toString() + sender?.color + sender?.login + sender?.avatar} direction="row" justifyContent="flex-start" alignItems="center">
						<SportsEsportsIcon sx={{width: "4.7vw"}} className="green"/>
						<div className="service_message" >{`You've sent a easy inviation`}</div>
					</Stack>)
				if (msg.service && msg.content === 'INVITE-MEDIUM')
				return (
					<Stack key={msg.date.toString() + sender?.color + sender?.login + sender?.avatar} direction="row" justifyContent="flex-start" alignItems="center">
						<SportsEsportsIcon sx={{width: "4.7vw"}} className="yellow"/>
						<div className="service_message" >{`You've sent a medium invitation`}</div>
					</Stack>)
				if (msg.service && msg.content === 'INVITE-HARD')
				return (
					<Stack key={msg.date.toString() + sender?.color + sender?.login + sender?.avatar} direction="row" justifyContent="flex-start" alignItems="center">
						<SportsEsportsIcon sx={{width: "4.7vw"}} className="red"/>
						<div className="service_message" >{`You've sent a hard invitation`}</div>
					</Stack>)
			}

			if (msg.service && msg.content === 'INVITE-EASY' && this.state.user && this.state.user.id != msg.authorId)
			return (
			<Stack direction='column' spacing={1} className='invitation bor_green'>
				
				<Stack className='invitation_message' key={msg.date.toString() + sender?.color + sender?.login + sender?.avatar} direction="row" justifyContent="flex-start" alignItems="center">
					<SportsEsportsIcon className="invitation_icon green" style={{width: '2vw', height: 'unset'}}/>
					<div>{`${login} invite you to play`}</div>
				</Stack>
				
				<Stack style={{alignItems: 'center', paddingBottom: '0.5vw'}}>
					<div className="accept_invitation_button but_green"
						onClick={() => {this.handleInvitation(msg.authorId, 0, msg.id)}}>
						Accept
					</div>
				</Stack>
			
			</Stack>)

			if (msg.service && msg.content === 'INVITE-MEDIUM' && this.state.user && this.state.user.id != msg.authorId)
			return (
			<Stack direction='column' spacing={1} className='invitation bor_yellow'>
				
				<Stack className='invitation_message' key={msg.date.toString() + sender?.color + sender?.login + sender?.avatar} direction="row" justifyContent="flex-start" alignItems="center">
					<SportsEsportsIcon className="invitation_icon yellow" style={{width: '2vw', height: 'unset'}}/>
					<div>{`${login} invite you to play`}</div>
				</Stack>
				
				<Stack style={{alignItems: 'center', paddingBottom: '0.5vw'}}>
					<div className="accept_invitation_button but_green"
						onClick={() => {this.handleInvitation(msg.authorId, 1, msg.id)}}>
						Accept
					</div>
				</Stack>
			
			</Stack>)

			if (msg.service && msg.content === 'INVITE-HARD' && this.state.user && this.state.user.id != msg.authorId)
			return (
			<Stack direction='column' spacing={1} className='invitation bor_red'>
				
				<Stack className='invitation_message' key={msg.date.toString() + sender?.color + sender?.login + sender?.avatar} direction="row" justifyContent="flex-start" alignItems="center">
					<SportsEsportsIcon className="invitation_icon red" style={{width: '2vw', height: 'unset'}}/>
					<div>{`${login} invite you to play`}</div>
				</Stack>
				
				<Stack style={{alignItems: 'center', paddingBottom: '0.5vw'}}>
					<div className="accept_invitation_button but_green"
						onClick={() => {this.handleInvitation(msg.authorId, 2, msg.id)}}>
						Accept
					</div>
				</Stack>
			
			</Stack>)

			if (msg.service)
			return;

			if (isFirst)
            return	<Stack key={msg.date.toString() + sender?.color + sender?.login + sender?.avatar} direction="row" style={{width: '100%', fontSize: '1.5rem'}}>
                        <Avatar variant='circular' src={avatar} sx={{margin: "0.4vw", marginLeft: "0.8vw", height: '3vw', width: '3vw'}}/>
                        <Stack className='first_message' direction="column" justifyContent="space-around">
                            <div style={{color, fontWeight: "bold"}}> {login} </div>
                            <div style={{color: "white"}}> {msg.content} </div>
                        </Stack>

                    </Stack>
			
            return <div key={msg.date.toString() + sender?.color + sender?.login + sender?.avatar} className='message'> {msg.content} </div>;
		});
        return listItems;
    }

	async handleInvitation(authorId: number, difficulty: Difficulty, messageId: number) {
		if (this.state.user)
		{
			if (this.state.user.status === statusEnum.playing)
			{
				toast.error(`You can't accept an invitation while playing`, {
					position: toast.POSITION.BOTTOM_CENTER,
					pauseOnHover: false,
					closeOnClick: true,})
			}
			else if (await this.checkUserIsOnline(authorId))
			{
				InvitationAPI.acceptInvitation(authorId, this.state.user.id, difficulty)
				ChatAPI.deleteMessage(messageId)
				let newMessages = this.state.messages.filter((message) => {return message.id != messageId})
				this.setState({
					messages: newMessages
				})
			}
		}
	}

	async checkUserIsOnline(id: number): Promise<boolean>
	{
		const user = await UserAPI.getUserById(id);
		if (user)
		{
			if (user.status === statusEnum.idle || user.status === statusEnum.connected)
				return true
			toast.error(`${user.login} is not available to play`, {
				position: toast.POSITION.BOTTOM_CENTER,
				pauseOnHover: false,
				closeOnClick: true,})
		}
		return false
	}

	onMessage(message: MessageDto) {
		this.state.messages.push(message);
		this.setState({
			messages: this.state.messages
		})
	}

	async onService(message: any) {
		message.service = true;
		if (message.content === 'JOIN') {
			const user = await UserAPI.getUserById(message.authorId);
			if (user === null) {
				throw(Error('unknow new user'));
			}
			this.state.users.push(user);
		}

		if (message.content === 'PROFILED' || message.content === 'LOGINED') {
			const oldUser = this.state.users.find((user) => {return user.id == message.authorId});
			const user = await UserAPI.getUserById(message.authorId);
			if (user === null) {
				throw(Error('unknow new user'));
			}
			const users: UserDto[] = this.state.users.filter((user) => {return user.id != message.authorId});
			users.push(user);
			this.setState({
				users
			})
		}

		if (message.content === 'MUTE' || message.content === 'UNMUTE') {
			if (message.authorId == this.state.user?.id){
				await this.updateMuted(message.channelId, message.authorId);
			}
		}

		if (message.content === 'BANNED') {
			if (message.authorId == this.state.user?.id){
				this.ret = true;
			}
		}
		if (message.content === 'UNBANNED') {
			if (message.authorId == this.state.user?.id){
				this.ret = false;
			}
		}

		this.state.messages.push(message);
		this.setState({
			messages: this.state.messages
		})
	}

	componentWillUnmount() {
		if (this.chatSocket)
        	this.chatSocket.cancel();
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
		const user = await UserAPI.getMe({withBlocked: true});
		let channel;
		this.chanName = newChannelName;
		if (this.props.isPrivateMessage) {
			const friend: UserDto|null = await UserAPI.getUserByLogin(newChannelName);
			if (!friend) {
				this.setState({
					redirect: true,
				});
				return;
			}
			const chanId: number = await ChatAPI.createOrJoinPrivateMessage(friend.id)
			channel = await ChatAPI.getChannelById(chanId, {withAdmin: true, withOwner: true})
			if (!channel || !user) {

				this.setState({
					redirect: true,
				});
				return;
			}
		}
		else {
			channel = await ChatAPI.getChannelByName(this.chanName, {withAdmin: true, withOwner: true});
			if (!channel || !user) {
				this.setState({
					redirect: true,
				});
				return;
			}
			this.updateMuted(channel.id, user.id);
		}
		let messages = await ChatAPI.getByChannelId(channel.id);
		this.chatSocket.joinRoom(channel.id, user.id);
		this.setState({
			users: channel.users,
			user,
			chan: channel,
			messages,
			redirect: false,
		});
	}


	render () {
		if (this.chanName !== this.props.params.name) {
			this.switchChannel(this.props.params.name);
		}
		if (this.ret === true || this.state.redirect === true)
		{
			this.ret = false;
			return <Navigate to={{pathname: '/404'}}/>
		}
		return (
            <>
				<ol className="chat_list">
					{this.renderMsg(this.state.messages)}
				</ol>

				{this.state.isMuted &&
					<Stack direction="row"
					spacing={1}
					justifyContent="space_evenly"
					style={{marginTop: '0.7vw',
							marginBottom: '0.7vw',
							marginLeft: '0.3vw',
							marginRight: '0.4vw'}}
					>
						<div></div>
						
						<div className="invitation_send_msg_button but_grey">
							<SportsEsportsIcon sx={{width: "80%", color: 'white'}}/>
						</div>
						
						<div className="chat_bar_disabled">
							You are muted
						</div>
						
						<div className="invitation_send_msg_button but_grey">
							<img src={require('../../asset/images/white_>.png')}
								style={{width: '75%'}}
							/>
						</div>

					</Stack>
				}

				{!this.state.isMuted &&
					<Stack direction="row"
						spacing={1}
						justifyContent="space_evenly"
						style={{marginTop: '0.7vw',
								marginBottom: '0.7vw',
								marginLeft: '0.3vw',
								marginRight: '0.4vw'}}
					>
						
						<Invite chatSocket={this.chatSocket}
								chan={this.state.chan}
								user={this.state.user}
						/>
						
						<input className="chat_bar"
							placeholder="Write message"
							value={this.state.input}
							onKeyDown={(e) => {this.onKeyDown(e)}}
							onChange={(e) => {this.onInputChange(e.target.value)}}
						/>
						
						<div className="invitation_send_msg_button but_blue"
							onClick={() => {this.sendMessage(this.chanName)}}
						>
							<img src={require('../../asset/images/white_>.png')}
								style={{width: '75%'}}
							/>
						</div>

					</Stack>
				}
				
            </>

		)
	}
}