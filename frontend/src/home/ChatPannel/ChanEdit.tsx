import { Avatar, Stack } from "@mui/material";
import { Component} from "react";
import { Link, Navigate } from "react-router-dom";
import { UserAPI } from "../../api/Users.api";
import ChanEditMember from './ChanEditMember';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { UserDto } from "../../api/dto/user.dto";
import { BannedDto, ChannelDto } from "../../api/dto/channel.dto";
import { ChatAPI } from "../../api/Chat.api";
import Unban from "./tools/Unban";
import "../../style/home.css";

interface ChanEditState {
	channel?: ChannelDto;
	admins: any;
	redirect: string;
	isAdmin: boolean;
	user?: UserDto;
}

interface ChanEditProps {
	params: any,
};

export class ChanEdit extends Component<ChanEditProps, ChanEditState> {
	index:number = 0;

	constructor(props: ChanEditProps) {
		super(props);
		this.state = {
			channel: undefined,
			admins: [],
			redirect: '',
			isAdmin: false,
			user: undefined
		}
		this.leave = this.leave.bind(this);
	}

	async componentDidMount()  {
		const name = this.props.params.name;
		const channel = await ChatAPI.getChannelByName(name, {withAdmin: true, withOwner: true, withBanned: true});
		const admins = channel.admin;
		const user = await UserAPI.getMe();
		if (!user || !channel)
			return;
		const isAdmin = channel.admin.some((admin) => {return admin.id === user.id})
		this.setState({
			channel,
			admins,
			isAdmin,
			user
		})
	}

	renderUsers(list) {
		list = list.sort((a: UserDto, b: UserDto) => {
			if (this.state.channel?.owner?.id === a.id)
				return -1;
			if (this.state.channel?.owner?.id === b.id)
				return 1;
			if (this.state.channel?.admin?.some((admin) => {return admin.id === a.id}))
				return -1;
			if (this.state.channel?.admin?.some((admin) => {return admin.id === b.id}))
				return 1;
			return 0;
		})
		const listItems = list?.map((member: UserDto) => {
			if (!this.state.channel || !this.state.user)
				return <div>An error occured</div>
			return (<ChanEditMember channel={this.state!.channel}
									user={this.state.user}
									index={this.index++}
									member={member}
									updateMembers={this.updateChannel.bind(this)}
					/>);
		}
	  );
	  return listItems;
	}

	renderBans(list) {
		const listItems = list?.map((banned: BannedDto) => {
			if (!this.state.channel || !this.state.user || !banned.user)
				return <div>An error occured</div>
			return (
			<li className={"chan_element bor_"+ banned.user.color} key={this.index++}>
				<Stack direction="row" justifyContent="space-between" alignItems="center" spacing={"0.07vw"}>
					
					<Stack direction='row' justifyContent="flex-start"  alignItems="center" spacing={1} >
						<Avatar variant='circular' alt={banned.user.login} src={banned.user.avatar} sx={{height: '1.6vw', width: '1.6vw'}}/>
						<div style={{color: 'white' }} className='bit9x9'>{banned.user.login}</div>
					</Stack>
					
					<Unban	member={banned.user}
							channelId={this.state.channel.id}
							updateChannels={this.updateChannel.bind(this)}/>
				</Stack>

        	</li>);
		}
	  );
	  return listItems;
	}

	async leave() {
		if (this.state.channel)
			ChatAPI.leaveChannel(this.state.channel.id)
		this.setState({
			redirect: "/home/chat/general"
		})
	}

	async updateChannel() {
		const name = this.props.params.name;
		const channel: ChannelDto|null = await ChatAPI.getChannelByName(name, {withAdmin: true, withOwner: true, withBanned: true});
		if (channel)
			this.setState({
				channel,
			})
	}
	render () {
		if (!this.state.channel)
			return <div style={{color: 'white'}}>Loading...</div>
		return (
			<>
			    { this.state.redirect ? (<Navigate to={this.state.redirect} />) : null }
				<Stack direction="column" justifyContent="space-between" className='channel_stack'>
					
					<Stack direction="column" spacing={2} style={{width: '100%'}}>
						
						<Link className="but_red" style={{ textDecoration: 'none', color: 'white',height: '2vw', width: '2vw', display: "flex", justifyContent: "center", alignItems: "center"}} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.channel.name + "/info" }}>
							<ArrowBackIcon sx={{height: '1vw', width: '1vw'}}/>
						</Link>
						
						<div className="bit9x9 channel_title">{this.state.channel.name}</div>
						
						<Stack direction="column" justifyContent="center" alignItems="flex-start" style={{overflow: 'auto'}}>
							
							<Stack direction='row' justifyContent='space-between' style={{width: 'calc(100% - 0.2vw)'}}>
								
								<div className="bit5x5" style={{color: "white", fontSize: "1.8vw"}}>
									USERS :
								</div>
								<Link className="but_green" style={{ textDecoration: 'none', color: 'white', height: '1.5vw', width: '1.5vw', display: "flex", justifyContent: "center", alignItems: "center"}}
									to={process.env.REACT_APP_HOME_CHAN + "/" + this.state.channel.name + "/add"}>
									<AddIcon sx={{height: '1vw', width: '1vw'}}/>
								</Link>
							
							</Stack>
							
							<ol className="chan_users_list">
								{this.renderUsers(this.state.channel.users)}
							</ol>
						
							<div className="bit5x5" style={{color: "white", fontSize: "1.8vw"}}>
								BANNED USERS :
							</div>

							<ol className="chan_users_list">
								{this.renderBans(this.state.channel.ban)}
							</ol>

						</Stack>

					</Stack>

					<div className="leave_chan_button_wrapper">
						<div className='leave_chan_button but_red bit5x5'
							onClick={this.leave}
						>
							Leave
						</div>
					</div>
				
				</Stack>
			</>)
	}
}