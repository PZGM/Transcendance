import { Grid, InputBase, List} from "@mui/material";
import { Component } from "react";
import { UserDisplay } from "./UserDisplay";
import { AddUserDisplay } from "./AddUserDisplay";
import styles from './../../style/dac.module.css'
import { UserAPI } from "../../api/Users.api";
import Menu from "../Menu";
import background from "./../../asset/images/background.jpg"
import { UserDto } from "../../api/dto/user.dto";

interface FriendsProps {
};

interface FriendsState {
	friends: UserDto[];
	searchResults: UserDto[];
	searchField?: string;
}

export class Friends extends Component<FriendsProps, FriendsState> {
	index:number = 0;

	renderRows(list) {
		const listItems = list.map((friend: UserDto) =>
			<div key={friend.id}>
				<UserDisplay user={friend} index={this.index} deleteFriend={this.deleteFriend}/>
			</div>
	  );
	  return listItems;
	}

	renderSearchRows(list) {
		const listItems = list.map((friend: UserDto) =>
			<div key={friend.id}>
				<AddUserDisplay user={friend} index={this.index} addFriend={this.addFriend}/>
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

	async onSearch(search:string) {
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

	componentWillUnmount() {
	}

	render (){
		return(
			<Grid item xs={6}>
				<InputBase fullWidth inputProps={{	min: 0,
													style: { textAlign: 'center' }}}
													className={styles.input}
													placeholder="Search Friend"
													onChange={ async (e) => {this.onSearch(e.target.value)}}
				/>
				<List style={{height: "100% -100px", overflow: 'auto'}}>
					{this.state.searchField && this.renderSearchRows(this.state.searchResults)}
					{!this.state.searchField && this.renderRows(this.state.friends)}
				</List>
			</Grid>
		);
	};
}
