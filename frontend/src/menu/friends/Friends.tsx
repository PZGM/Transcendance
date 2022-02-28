import { Avatar, Box, Button, Card, Grid, Stack, InputBase, ListItem, ListItemButton, ListItemText, styled, TextField, Typography, List, ListSubheader } from "@mui/material";
import { sizing } from '@mui/system';
import { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { UserDisplay } from "./UserDisplay";
import { AddUserDisplay } from "./AddUserDisplay";
import styles from './../../style/dac.module.css'
import background from "./../../asset/images/background.jpg"
import { UserAPI } from "../../api/Users.api";

const widthBox = 700;
const heightBox = 500;

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
				<Grid container
					sx={{border: '10px solid rgba(0, 70, 109, 1)', outline: '10px solid rgba(0, 80, 117, 1)', backgroundColor: 'black', height: '80vh', width: '100wh', overflow: 'auto' }}>
							
							<Box m="2%" width='60%' sx={{p: '10px', border: '9px solid rgba(142, 0, 172, 1)', outline: '9px solid rgba(142, 0, 172, 0.5)', backgroundColor: 'black', height: '100%', overflow: 'auto'}}>
								<InputBase
									fullWidth
									inputProps={{min: 0, style: { textAlign: 'center' }}}
									className={styles.input}
									placeholder="Search Friend"
									onChange={ async (e) => {this.onSearch(e.target.value)}
								}
								/>
								<List style={{height: '100%',  overflow: 'auto'}}>
									{this.state.searchField && this.renderSearchRows(this.state.searchResults)}
									{!this.state.searchField && this.renderRows(this.state.friends)}
								</List>
							</Box>

							<Box m="2%" width='20%'>
								<Grid container direction="column" justifyContent="space-evenly" alignItems="center">
									<Avatar variant='circular' alt="Semy Sharp" src="/static/images/avatar/1.jpg" sx={{ }}/>
									<Typography>AFREIRE-</Typography>
									<Button component={Link} to={process.env.REACT_APP_PROFILE as string}><div className='arcademenu'>Profile</div></Button>
									<Button component={Link} to={process.env.REACT_APP_FRIENDS as string}><div className='arcademenu'>Friends</div></Button>
									<Button component={Link} to={process.env.REACT_APP_SETTINGS as string}><div className='arcademenu'>Settings</div></Button>
									<Button component={Link} to={process.env.REACT_APP_HISTORY as string}><div className='arcademenu'>Match History</div></Button>
									<Button component={Link} to={process.env.REACT_APP_ACHIEVEMENT as string}><div className='arcademenu'>Achievments</div></Button>
								</Grid>
							</Box>
								

				</Grid>
				<Grid container></Grid>

				</Stack>
			</div>
		);
	};
}
