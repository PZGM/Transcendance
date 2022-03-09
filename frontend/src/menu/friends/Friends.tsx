import { Box, Grid, Stack, InputBase, List} from "@mui/material";
import { Component } from "react";
import { UserDisplay } from "./UserDisplay";
import { AddUserDisplay } from "./AddUserDisplay";
import styles from './../../style/dac.module.css'
import background from "./../../asset/images/background.jpg"
import { UserAPI } from "../../api/Users.api";
import MenuButton from "../MenuButton";

interface FriendsProps {
};

interface FriendsState {
	friends: number[];
	searchResults: number[];
	searchField?: string;
}

export class Friends extends Component<FriendsProps, FriendsState> {
	userAPI = new UserAPI();
	index:number = 0;
	renderRows(list) {
		list = [1,1,1,1,1,11,1,1,1,1,1,1,1,1,1,1,1,1,1,11,1,1,1,11,1,1,1,11,1,11,1,1,11,1,1,1,]
		const listItems = list.map((id: number) =>
			<div key={id}>
				<UserDisplay id={id} index={this.index} deleteFriend={this.deleteFriend}/>
			</div>
	  );
	  return listItems;
	}

	renderSearchRows(list) {
		const listItems = list.map((id: number) =>
			<div key={id}>
				<AddUserDisplay id={id} index={this.index} addFriend={this.addFriend}/>
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
		let newFriends: number[] = this.state.friends;
		newFriends.splice(newFriends.indexOf(id), 1);

		this.setState({
			friends: newFriends
		});
	}

	addFriend(id:number) {
		let newFriends: number[] = this.state.friends;
		newFriends.push(id)
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

	async fetchUser() {
		try {
			const resp = await UserAPI.getUser();
			this.setState({
				friends: resp.friends,
			})
			console.log(`friends : ${this.state.friends}`)
		}
		catch (e) {
			console.log(e);
		}

	}

	componentDidMount()  {
		this.fetchUser();
	}

	componentWillUnmount() {
	}

	render (){
		return(
			<div style={{
				backgroundImage: `url(${background})`,
				// backgroundPosition: 'center',
				backgroundSize: 'cover',
				height: '100vh',
				width: '100vw',
				backgroundRepeat: 'norepeat'
			}}>
				<Stack
					direction="column"
					justifyContent="space-between"
					alignItems="center"
					className="test"
					sx={{mx: '10%'}}
				>
					<Grid container></Grid>
					<Grid container sx={{border: '10px solid rgba(0, 70, 109, 1)', outline: '10px solid rgba(0, 80, 117, 1)', backgroundColor: 'white', width: '100wh', overflow: 'auto' }}>
						<Box m="2%" width='60%' sx={{p: '10px', border: '9px solid rgba(142, 0, 172, 1)', outline: '9px solid rgba(142, 0, 172, 0.5)', backgroundColor: 'black', height: '70vh', overflow: 'auto'}}>
							<InputBase fullWidth inputProps={{min: 0, style: { textAlign: 'center' }}} className={styles.input} placeholder="Search Friend" onChange={ async (e) => {this.onSearch(e.target.value)}}/>
							<List style={{height: "100% -100px",overflow: 'auto'}}>
								{this.state.searchField && this.renderSearchRows(this.state.searchResults)}
								{!this.state.searchField && this.renderRows(this.state.friends)}
							</List>
						</Box>
						<Box mt="2%" width='30%'>
							<MenuButton/>
						</Box>
					</Grid>
					<Grid container></Grid>
				</Stack>
			</div>
		);
	};
}
// - 1.4375em