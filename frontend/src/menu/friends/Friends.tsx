import { Grid, InputBase, List} from "@mui/material";
import { Component } from "react";
import { UserDisplay } from "./UserDisplay";
import { AddUserDisplay } from "./AddUserDisplay";
import './../../style/input.css'
import { UserAPI } from "../../api/Users.api";
import { UserDto } from "../../api/dto/user.dto";
import { InputUnstyled } from "@mui/base";
import { PrivateGuard } from './../../components/PrivateGuard'
import './../../style/display.css'

interface FriendsProps {
};

interface FriendsState {
	friends: UserDto[];
	searchResults: UserDto[];
	searchField?: string;
}

export class Friends extends Component<FriendsProps, FriendsState>
{
	
	index:number = 0;
	index_search:number = 0;
	renderRows(list)
	{
		const listItems = list.map((friend: UserDto) =>
		<div key={friend.id}>
				<UserDisplay user={friend} deleteFriend={this.deleteFriend}/>
		</div>
		);
		
		return listItems;
	}

	renderSearchRows(list) {
		const listItems = list.map((friend: UserDto) =>
		<div key={friend.id}>
			<AddUserDisplay user={friend} addFriend={this.addFriend}/>
		</div>
	  );
	  return listItems;
	}

	constructor(props: FriendsProps) {
		super(props);
		this.state = {friends: [], searchResults: [], searchField: undefined};
		this.renderRows = this.renderRows.bind(this);
		this.deleteFriend = this.deleteFriend.bind(this);
		this.renderSearchRows = this.renderSearchRows.bind(this);
		this.addFriend = this.addFriend.bind(this);
	}

	deleteFriend(id:number) {
		const newFriends: UserDto[] = this.state.friends.filter((user) => {
			return user.id != id;
		});

		this.setState({
			friends: newFriends
		});
	}

	addFriend(user: UserDto) {
		let newFriends: UserDto[] = this.state.friends;
		newFriends.push(user);
		this.setState({
			friends: newFriends
		}); 
	}

	async onSearch(e: React.ChangeEvent<HTMLInputElement>) {
		e.target.value = e.target.value.replace(/\W/g, "");
		const search = e.target.value;
		this.setState({searchField: search});
		if (!search || search === '')
			return;
		let ret = await UserAPI.searchFriend(search);
		this.setState({searchResults: ret});
	}

	async fetchFriends() {
		try {
			const resp = await UserAPI.getFriends();
			this.setState({
				friends: resp
			})
		}
		catch (e) {
			console.log(e);
		}

	}

	componentDidMount()  {
		this.fetchFriends();
	}

	render ()
	{
		this.index = 0;
		this.index_search = 0;
		
		return (
			<>
			<PrivateGuard/>
			<Grid item xs={1}>
				
				<input
					className="friends_search_bar"
					placeholder="Search Friend"
					maxLength={10}
					onChange={ async (e) => {this.onSearch(e)}}
				/>
	
			</Grid>
		
			<Grid item xs={11} className="search_list">

				<ol>
					{this.state.searchField && this.renderSearchRows(this.state.searchResults)}
					{!this.state.searchField && this.renderRows(this.state.friends)}
				</ol>

			</Grid>
		
			</>
		);
	};
}
