import { Grid, InputBase, List} from "@mui/material";
import { Component } from "react";
import { UserDisplay } from "./UserDisplay";
import { AddUserDisplay } from "./AddUserDisplay";
import styles from './../../style/dac.module.css'
import { UserAPI } from "../../api/Users.api";
import Menu from "../Menu";
import background from "./../../asset/images/background.jpg"

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
			// Background
			<div style={{
						backgroundImage: `url(${background})`,
						backgroundSize: 'cover',
						height: '100vh',
						width: '100vw',
						backgroundRepeat: 'norepeat'
						}}
			>
				{/* Grid */}
				<div style={{
					height: '100vh',
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				}}>
					<Grid container
						justifyContent="space-between"
						alignItems="stretch"
						wrap="nowrap"
						sx={{
								border: '0.5vw solid rgba(0, 70, 109, 1)',
								outline: '0.5vw solid rgba(0, 80, 117, 1)',
								backgroundColor: 'black',
								height: 'undefined',
								width: 'undefined',
								minWidth: "800px", minHeight: "800px",
								maxWidth: "1500px", maxHeight: "1500px"
							}}>

						<Grid item xs={6}
							sx={{	m: 2,
									p: 2,
									border: '0.4vw solid rgba(142, 0, 172, 1)',
									outline: '0.4vw solid rgba(142, 0, 172, 0.5)', 
									backgroundColor: 'black'
								}}>
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

						<Grid item xs={5} sx={{m: 3, position: "relative"}} >
							<Menu/>
						</Grid>

					</Grid>
				</div>
			</div>
		);
	};
}
