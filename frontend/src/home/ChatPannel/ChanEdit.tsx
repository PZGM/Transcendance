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
		const user = await UserAPI.getUser();
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

	renderRowsUsers(list) {
		const listItems = list?.map((member: UserDto) => {
		if (!this.state.channel || !this.state.user)
			return <div>error</div>
		return (
			<ChanEditMember channel={this.state.channel} user={this.state.user} index={this.index++} member={member}></ChanEditMember>);
		}
	  );
	  return listItems;
	}

	async leave() {
		if (this.state.channel)
			ChatAPI.leaveChannel(this.state.channel.id)
		this.setState({
			redirect: '/home'
		})
	}

	render () {
		if (!this.state.channel)
			return <div style={{color: 'white'}}>Loading...</div>
		return (
			<>
			    { this.state.redirect ? (<Navigate to={this.state.redirect} />) : null }
				<Stack direction="row" justifyContent="space-between">
					<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
						<Link 	style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.channel.name  }}>
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
				<Stack justifyContent="center" alignItems="center" sx={{marginTop: "0.5vh" }}>
					<div onClick={this.leave} className="add_user_button but_red" >
						<div className='bit5x5'>Leave</div>
					</div>
				</Stack>
			</>

		)
	}
}