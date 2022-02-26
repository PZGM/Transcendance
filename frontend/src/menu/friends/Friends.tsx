import { Avatar, Box, Button, Card, Grid, Stack, InputBase, ListItem, ListItemButton, ListItemText, styled, TextField, Typography, List, ListSubheader } from "@mui/material";
import { sizing } from '@mui/system';
import { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { UserDisplay } from "./UserDisplay";
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
	index:number = 0;
	renderRows(list) {
		const listItems = list.map((id: number) =>
			<div key={id}>
				<UserDisplay id={id} index={this.index} deleteFriend={this.deleteFriend}/>
			</div>
	  );
	  return listItems;
	}

	constructor(props: FriendsProps) {
		super(props);
		this.state = {friends: [], searchResults: [], searchField: undefined};
		this.renderRows = this.renderRows.bind(this);
		this.deleteFriend = this.deleteFriend.bind(this);
		this.add1 = this.add1.bind(this);
	}

	deleteFriend(id:number) {
		let newFriends: number[] = this.state.friends;
		newFriends.splice(newFriends.indexOf(id), 1);

		this.setState({
			friends: newFriends
		});
	}

	add1() {
		UserAPI.addFriend(1);
		let newFriends: number[] = this.state.friends;
		newFriends.push(1);

		this.setState({
			friends: newFriends
		});
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
				<Button onClick={this.add1}>Add 1</Button>
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
									onChange={(e) => {this.setState({searchField: e.target.value})}}
								/>
								<List style={{height: '100%',  overflow: 'auto'}}>
									{this.state.searchField && <ListSubheader>{'Search'}</ListSubheader>}
									{this.state.searchField && this.renderRows(this.state.friends)}
									<ListSubheader>{'Friends'}</ListSubheader>
									{this.renderRows(this.state.friends)}
									<ListSubheader>{'Suggestion'}</ListSubheader>
									{this.renderRows(this.state.friends)}
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




















// import { Avatar, Box, Button, Card, Grid, InputBase, ListItem, ListItemButton, ListItemText, styled, TextField, Typography } from "@mui/material";
// import { Component } from "react";
// import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";
// import { FixedSizeList, ListChildComponentProps } from "react-window";
// import { UserDisplay } from "./UserDisplay";
// import styles from './../../style/dac.module.css'
// import { UserAPI } from "../../api/Users.api";

// const widthBox = 700;
// const heightBox = 500;

// interface FriendsProps {
// };

// interface FriendsState {
// 	friends: number[];
// }



// export class Friends extends Component<FriendsProps, FriendsState> {
// 	constructor(props: FriendsProps) {
// 		super(props);
// 		this.state = {friends: []};
// 		this.renderRow = this.renderRow.bind(this);
// 	}

// 	renderRow(props: ListChildComponentProps) {
// 		const { index, style } = props;
	  
// 		return (
// 			<div style={style}>
// 				<UserDisplay id={this.state.friends[index]} index={index}/>
// 			</div>
// 		);
// 	  }

// 	add1() {
// 		UserAPI.addFriend(1);
// 	}
	
// 	add2() {
// 		UserAPI.addFriend(2);

// 	}
	
// 	add3() {
// 		UserAPI.addFriend(3);
// 	}
	
// 	add4() {
// 		UserAPI.addFriend(4);
// 	}
	

// 	async fetchUser() {
// 		try {
// 			const resp = await UserAPI.getUser();
// 			this.setState({
// 				friends: resp.friends,
// 			})
// 			console.log(`friends : ${this.state.friends}`)
// 		}
// 		catch (e) {
// 			console.log(e);
// 		}

// 	}

// 	componentDidMount()  {
// 		this.fetchUser();
// 	}

// 	componentWillUnmount() {
// 	}



// 	render (){
// 		return(
// 			<div>
// 				<Helmet>
// 					<style>{'body { background-color: black; }'}</style>
// 				</Helmet>
// 				<Button onClick={this.add1}>Add 1</Button>
// 				<Button onClick={this.add2}>Add 2</Button>
// 				<Button onClick={this.add3}>Add 3</Button>
// 				<Button onClick={this.add4}>Add 4</Button>

// 				<Button component={Link} to={process.env.REACT_APP_HOME as string} sx={{width: '100%', height: '5%',backgroundColor: 'yellow'}}>
// 				</Button>

// 				<Box m="20%" display="flex" width={widthBox} height={heightBox} bgcolor="lightblue" sx={{border: '3px solid grey' }}>
// 					<Card sx={{ width: "100%", height: "100%" }} style={{ justifyContent: "center", display: "flex" }}>
// 						<Grid container direction="row-reverse"   justifyContent="space-between"  alignItems="stretch">
// 							<Box m="auto">
// 								<Grid container direction="column" justifyContent="space-evenly" alignItems="center">
// 									<Avatar variant='circular' alt="Semy Sharp" src="/static/images/avatar/1.jpg" sx={{ }}/>
// 									<Typography>AFREIRE-</Typography>
// 									<Button component={Link} to={process.env.REACT_APP_PROFILE as string}>Profile</Button>
// 									<Button component={Link} to={process.env.REACT_APP_FRIENDS as string}>Friends</Button>
// 									<Button component={Link} to={process.env.REACT_APP_SETTINGS as string}>Settings</Button>
// 									<Button component={Link} to={process.env.REACT_APP_HISTORY as string}>Match History</Button>
// 									<Button component={Link} to={process.env.REACT_APP_ACHIEVEMENT as string}>Achievement</Button>
// 								</Grid>
// 							</Box>
// 							<Box m="auto" width="70%">
// 								<Box sx={{p: 1, border: '3px solid grey', backgroundColor: 'black'}}  width="100%" height="100%">
// 									<Box mr='2px'>
// 									<InputBase
// 										fullWidth
// 										className={styles.input}
// 										placeholder="Search Friend"
// 									/>
// 									</Box>
// 									<FixedSizeList
// 										height={400}
// 										width='100%'
// 										itemSize={75}
// 										itemCount={this.state.friends.length}
// 										overscanCount={5}
// 									>
// 										{this.renderRow}
// 									</FixedSizeList>
// 								</Box>
// 							</Box>
// 						</Grid>
// 					</Card>
// 				</Box>
// 			</div>
// 		);
// 	};
// }
