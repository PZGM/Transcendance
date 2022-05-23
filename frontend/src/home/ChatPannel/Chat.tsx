import { Avatar, Box, IconButton, InputBase, Stack } from "@mui/material";
import { ChatSocketAPI } from '../../api/ChatSocket.api'
import { Component, useState} from "react";
import { Link, Navigate, useOutletContext } from "react-router-dom";
import { UserAPI } from "../../api/Users.api";
import SendIcon from '@mui/icons-material/Send';
import InfoIcon from '@mui/icons-material/Info';
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
import { GameSocketAPI } from "../../api/GameSocket.api";

// interface ChatState {
// 	socket: any;
// 	messages: MessageDto[];
// 	input: string;
// 	chan: any;
// 	users: UserDto[];
// 	user: any,
// }

interface ChatProps {
    isPrivateMessage: boolean,
	params: any,
	context: GameSocketAPI
};

function Chat (props: ChatProps)
{
	const chanName: string = '';

	const onMessage = (message: any) => {
		messages.push(message);
		setMsg(messages);
	}

	const onService = async (message: any) => {
		message.service = true;
		if (message.content === 'JOIN') {
			const user = await UserAPI.getUserById(message.authorId);
			if (user == null) {
				throw(Error('unknow new user'));
			}
			users.push(user);
		}

		messages.push(message);
		setMsg(messages);
	}

	const chatSocket = new ChatSocketAPI({receiveMessage: onMessage,
											transmitService: onService});
	const [messages, setMsg] = useState<MessageDto[]>([]);
	const gameSocket: GameSocketAPI = useOutletContext();
	console.log(gameSocket)
	const [input, setInput] = useState('');
	const [users, setUsers] = useState<UserDto[]>([]);
	const [user, setUser] = useState<any>(undefined);
	const [chan, setChan] = useState<any>(undefined);

	const onInputChange = (input) => {
		setInput(input);
	}

	const renderMsg = (list) =>
    {
		let lastAuthorId: number = -1;
        const listItems = list.map((msg: MessageDto) => {
			const sender:UserDto|undefined = users.find((user) => {return user.id === msg.authorId});
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

	const onKeyDown = (e) => {
		if (e.keyCode === 13)
			sendMessage(chanName);
	}

	const onFocus = (e) => {
		if (e.relatedTarget){}
	}

    const sendMessage = (chanName: string) => {
		if (chanName && input !== '') {
			chatSocket.sendMessage(chan.id, input, user.id);
			setInput('')
		}
    }

	const switchChannel = async (newChannelName: string) => {
		const chanName = newChannelName;
		const user = await UserAPI.getUser();
		const channel: ChannelDto = await ChatAPI.getChannelByName(chanName, {withAdmin: true, withOwner: true});
		if (!channel) {
			return;
		}
		let messages = await ChatAPI.getByChannelId(channel.id);
		chatSocket.joinRoom(channel.id);
		
		setUsers(channel.users)
		setUser(user)
		setChan(channel)
		setMsg(messages)
	}

	if (chanName !== props.params.name) {
		if (!switchChannel(props.params.name))
		{
			return <Navigate to='404' />
		}
	}
	return (
		<>
			<Box height="87.5%">
				<ol>
					{renderMsg(messages)}
				</ol>
			</Box>
			<Box height="50px" sx={{backgroundColor: "black"}}>
				<Stack direction="row"
					spacing={2}
					sx={{backgroundColor: "black"}}
				>
					<input	className="chat_bar"
							placeholder="Write message"
							value={input}
							onKeyDown={(e) => {onKeyDown(e)}}
							onChange={(e) => {onInputChange(e.target.value)}}
					/>
					
					<div className="send_msg_button but_green"
						onClick={ () => {sendMessage(chanName)}}
					>
						<img src={require('../../asset/images/xwhite.png')}
							style={{width: '75%'}}
							alt='cross'/>
					</div>
				
				</Stack>
			</Box>
		</>

	)
}

export default Chat;