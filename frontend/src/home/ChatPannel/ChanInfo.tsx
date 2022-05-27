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
		const user = await UserAPI.getUser();
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

	renderRowsUsers(list) {
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
				<Stack direction="row" justifyContent="space-between">
					<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0} sx={{marginTop: 1, marginLeft: 1}}>
						<Link className="but_red" style={{ textDecoration: 'none', color: 'white'}} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.channel.name  }}>
							<ArrowBackIcon/>
						</Link>
					</Stack>
					{ (this.state.isAdmin) && <Stack direction="column" justifyContent="center" alignItems="flex-end" spacing={0} sx={{marginTop: 1, marginRight: 1}}>
									<Link className="but_green"	style={{ textDecoration: 'none', color: 'white'}} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.channel.name + "/edit" }}>
										<EditIcon/>
									</Link>
								</Stack>}
				</Stack>
				<Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
							<div className="bit9x9" style={{color: "white", fontSize: "2.5vw"}}>{this.state.channel.name}</div>
				</Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<div className="bit5x5" style={{color: "white"}}>USERS :</div>
					<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} height={'80vh'}>
						<li>
							{this.renderRowsUsers(this.state.channel.users)}
						</li>
					</Stack>
				</Stack>

				<Stack justifyContent="center" alignItems="center" sx={{marginTop: "0.5vh" }}>
					{(this.state.channel.name !== "general")?
					<div onClick={this.leave} className="add_user_button but_red" >
						<div className='bit5x5'>Leave</div>
					</div>
					:
					<div className="add_user_button but_grey" >
						<div className='bit5x5'>Leave</div>
					</div>
					}
				</Stack>
			</>

		)
	}
}