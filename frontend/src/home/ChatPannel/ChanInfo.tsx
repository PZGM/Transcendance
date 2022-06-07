import { Stack } from "@mui/material";
import { Component} from "react";
import { Link, Navigate } from "react-router-dom";
import { UserAPI } from "../../api/Users.api";
import ChanInfoMember from "./ChanInfoMember";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserDto } from "../../api/dto/user.dto";
import { ChannelDto } from "../../api/dto/channel.dto";
import { ChatAPI } from "../../api/Chat.api";
import EditIcon from '@mui/icons-material/Edit';

interface ChanInfoState {
	channel?: ChannelDto;
	friends: any;
	redirect: string;
	isAdmin: boolean;
	user?: UserDto;
}

interface ChanInfoProps {
	params: any,
};

export class ChanInfo extends Component<ChanInfoProps, ChanInfoState> {
	index:number = 0;

	constructor(props: ChanInfoProps) {
		super(props);
		this.state = {
			channel: undefined,
			friends: [],
			redirect: '',
			isAdmin: false,
			user: undefined,
		}
		this.leave = this.leave.bind(this);
	}

	async componentDidMount()  {
		const name = this.props.params.name;
		const channel = await ChatAPI.getChannelByName(name, {withAdmin: true, withOwner: true});
		const friends = await UserAPI.getFriends();
		const user = await UserAPI.getMe();
		if (!user || !channel)
			return;
		const isAdmin = channel.admin.some((admin) => {return admin.id === user.id})
		this.setState({
			channel,
			friends,
			isAdmin,
			user,
		})
	}

	renderUsers(list) {
		list = list.sort((a: UserDto, b: UserDto) => {
			if (this.state.channel?.owner?.id === a.id)
				return -1;
			if (this.state.channel?.owner?.id === b.id)
				return 1;
			if (this.state.channel?.admin.some((admin) => {return admin.id === a.id}))
				return -1;
			if (this.state.channel?.admin.some((admin) => {return admin.id === b.id}))
				return 1;
			return 0;
		})
		const listItems = list?.map((member: UserDto) => {
		const isFriend = this.state.friends.some((friend) => {return friend.id === member.id});
		const isMe = this.state.user?.id === member.id;
		let grade = this.state.channel?.admin.some((admin) => {return admin.id === member.id}) ? 'admin' : '';
		if (this.state.channel?.owner && this.state.channel?.owner.id === member.id)
			grade = 'owner';
		return (
			<ChanInfoMember isMe={isMe} key={this.index} index={this.index++} member={member} grade={grade} isFriend={isFriend}></ChanInfoMember>);
		}
	  );
	  return listItems;
	}

	async leave() {
		if (this.state.channel)
			ChatAPI.leaveChannel(this.state.channel.id)
		this.setState({
			redirect: '/home/chat/general'
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
						
						<Stack direction="row" justifyContent='space-between' style={{width: 'calc(100% - 0.2vw)'}}>
							<Link className="but_red" style={{ textDecoration: 'none', color: 'white',height: '2vw', width: '2vw', display: "flex", justifyContent: "center", alignItems: "center"}} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.channel.name }}>
								<ArrowBackIcon sx={{height: '1vw', width: '1vw'}}/>
							</Link>

							{ (this.state.isAdmin) &&
								<Link className="but_green"	style={{ textDecoration: 'none', color: 'white',height: '2vw', width: '2vw', display: "flex", justifyContent: "center", alignItems: "center"}} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.channel.name + "/edit" }}>
									<EditIcon sx={{height: '1vw', width: '1vw'}}/>
								</Link>
							}
						</Stack>
						
						<div className="bit9x9 channel_title">{this.state.channel.name}</div>
						
						<Stack direction="column" justifyContent="center" alignItems="flex-start" style={{overflow: 'auto'}}>
								
							<div className="bit5x5" style={{color: "white", fontSize: "1.8vw"}}>
								USERS :
							</div>
							
							<ol className="chan_users_list">
								{this.renderUsers(this.state.channel.users)}
							</ol>

						</Stack>

					</Stack>

					{(this.state.channel.name !== "general")?

						<div className="leave_chan_button_wrapper">
							<div className='leave_chan_button but_red bit5x5'
								onClick={this.leave}
							>
								Leave
							</div>
						</div> :

						<div className="leave_chan_button_wrapper">
							<div className='leave_chan_button but_grey bit5x5'>
								Leave
							</div>
						</div>
					}
				
				</Stack>
			</>)
	}
}