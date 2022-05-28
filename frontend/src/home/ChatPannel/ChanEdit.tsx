import { Stack, List } from "@mui/material";
import { Component} from "react";
import { Link, Navigate } from "react-router-dom";
import { UserAPI } from "../../api/Users.api";
import ChanEditMember from './ChanEditMember';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { UserDto } from "../../api/dto/user.dto";
import { ChannelDto } from "../../api/dto/channel.dto";
import { ChatAPI } from "../../api/Chat.api";
import { ThirtyFpsSharp } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import { channel } from "diagnostics_channel";

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
		const channel = await ChatAPI.getChannelByName(name, {withAdmin: true, withOwner: true});
		const admins = channel.admin;
		const user = await UserAPI.getMe();
		if (!user || !channel)
			return;
		const isAdmin = channel.admin.some((admin) => {return admin.id == user.id})
		this.setState({
			channel,
			admins,
			isAdmin,
			user
		})
	}

	renderRowsUsers(list) {
		list = list.sort((a: UserDto, b: UserDto) => {
			if (this.state.channel?.owner.id == a.id)
				return -1;
			if (this.state.channel?.owner.id == b.id)
				return 1;
			if (this.state.channel?.admin.some((admin) => {return admin.id == a.id}))
				return -1;
			if (this.state.channel?.admin.some((admin) => {return admin.id == b.id}))
				return 1;
			return 0;
		})
		const listItems = list?.map((member: UserDto) => {
			if (!this.state.channel || !this.state.user)
				return <div>An error occured</div>
			return (
				<ChanEditMember channel={this.state!.channel} user={this.state.user} index={this.index++} member={member}></ChanEditMember>);
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

	render () {
		if (!this.state.channel)
			return (
				<div className="grid_item_style" style={{color: 'white'}}>LOADING...</div>
			)
		else
			return (
				<>
					{ this.state.redirect ? (<Navigate to={this.state.redirect} />) : null }
					<Stack direction="row" justifyContent="space-between">
						<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
							<Link 	style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.channel.name + "/info" }}>
								<ArrowBackIcon/>
							</Link>
						</Stack>
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
					<Stack justifyContent="center" alignItems="center" spacing={2} sx={{marginTop: "0.5vh" }}>
						<Link to={process.env.REACT_APP_HOME_CHAN + "/" + this.state.channel.name + "/add"} className="add_user_button but_green" >
							<div className='bit5x5'>Join</div>
						</Link>
						<div onClick={this.leave} className="add_user_button but_red" >
							<div className='bit5x5'>Leave</div>
						</div>
					</Stack>
				</>

			)
	}
}