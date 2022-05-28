import { List, Stack } from "@mui/material";
import { Component} from "react";
import { Link } from "react-router-dom";
import { UserAPI } from "../../api/Users.api";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../../style/input.css"
import { AddUserDisplay } from "./AddUserDisplay";
import { UserDto } from "../../api/dto/user.dto";
import { ChatAPI } from "../../api/Chat.api";
import { ChannelDto } from "../../api/dto/channel.dto";

interface ChanAddUserState {
    chan?: ChannelDto;
    searchResults: UserDto[];
	searchField?: string;
}

interface ChanAddUserProps {
    params: any,
};

export class ChanAddUser extends Component<ChanAddUserProps, ChanAddUserState> {
	constructor(props: ChanAddUserProps) {
		super(props);
        this.state = {
            chan: undefined,
            searchResults: [], searchField: undefined
        }
		this.renderSearchRows = this.renderSearchRows.bind(this);
		this.addUser = this.addUser.bind(this);
	}


	async componentDidMount()  {
        const name = this.props.params.name;
		const chan = await ChatAPI.getChannelByName(name);
		if (!chan)
			return;
        this.setState({
            chan,
        })
	}

	addUser(add: UserDto) {
		const newUsers = this.state.chan?.users.filter((user) => {return user.id != add.id});
		let chan = this.state.chan;
		if (newUsers && chan)
			chan.users = newUsers;
		this.setState({
			chan
		});
	}

	renderSearchRows(list) {
		const listItems = list.map((user: UserDto) => {
			if (!this.state.chan)
				return <div></div>;
			return (
			<div key={user.id}>
				<AddUserDisplay user={user} channelId={this.state.chan.id} addUser={this.addUser} />
			</div>);
		}
	  );
	  return listItems;
	}
	async onSearch(e: React.ChangeEvent<HTMLInputElement>) {
		e.target.value = e.target.value.replace(/\W/g, "");
		const search = e.target.value;
		this.setState({searchField: search});
		if (!search || search === '')
			return;
		let ret = await UserAPI.searchFriend(search);
		console.log('users in chan:');
		console.log(this.state.chan?.users);
		ret = ret.filter((user) => {return !this.state.chan?.users.some((usr) => usr.id == user.id)});
		this.setState({searchResults: ret}); 
	}

	render () {

		return (
            <>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<Link style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.chan + "/edit"}}>
						<ArrowBackIcon/>
					</Link>
				</Stack>
				<Stack justifyContent="center" alignItems="center" sx={{marginTop: 2}}>
					<input className="add_user_bar" placeholder="Invite User" onChange={ async (e) => {this.onSearch(e)}}/>
					<List style={{overflow: 'auto'}}>
						{this.renderSearchRows(this.state.searchResults)}
					</List>
				</Stack>
			</>
		)
	}
}