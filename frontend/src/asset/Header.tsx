import { AppBar, Avatar, Box, IconButton, Menu, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useState, Component } from "react";
import {UserAPI} from "../api/Users.api";
import Profil_Card from "./Profile_Card";
import { FenceTwoTone } from "@mui/icons-material";

interface HeaderProps {};
  
interface HeaderState {
	avatar?: string,
	login?: string,
  }




export class Header extends Component<HeaderProps, HeaderState>{
	constructor(props: HeaderProps) {
		super(props);
		this.state = {avatar: undefined, login: undefined}
		this.updateHeaderState = this.updateHeaderState.bind(this);
	}

	async updateHeaderState({login, avatar} : HeaderState) {
		if (login)
			this.setState({
				login: login,
			})
		if (avatar)
		this.setState({
			avatar: avatar,
		})
	}

	async fetchUser() {
		const resp = await UserAPI.getUser();
		this.setState({
			avatar: resp.img_url,
			login: resp.login
		})
	}

	componentDidMount()  {
		this.fetchUser();
	}



	// const [login, setLogin] = useState<string | undefined>(undefined);
	// const [avatar, setAvatar] = useState<string | undefined>(undefined);
	// const [user, setUser] = useState(null);


	// const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	// const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
	// const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
	//   setAnchorElNav(event.currentTarget);
	// };
	// const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
	//   setAnchorElUser(event.currentTarget);
	// };
  
	// const handleCloseNavMenu = () => {
	//   setAnchorElNav(null);
	// };
	
	// const handleCloseUserMenu = () => {
	// 	setAnchorElUser(null);
	//   };


	// useEffect(() => {
	// 	async function fetchUser() {

	// 		const resp = await UserAPI.getUser();
	// 		// setLogin(resp.login);
	// 		this.state.avatar = resp.img_url;
	// 	}
	// 	fetchUser();
	// }, [this.state.avatar]);

	//   console.log("yo");
	//   console.log(this.state.avatar);
	//   console.log("merde");





	// const updateHeaderStates = function (image: string) {
	// 	this.setState({
	// 		setAvatar(image)
	// 	});
	// }







	render () {
		console.log(`===RENDER=== login = ${this.state.login}`)
	return (
		<div>
			<Profil_Card login={this.state.login} updateHeaderState={this.updateHeaderState}></Profil_Card>
			<Typography>{this.state.avatar}</Typography>
		</div>
// 	<AppBar position="static">
// 	<Box>
// 		<Toolbar>
// 			<Box sx={{ flexGrow: 1, display: { xs: 'flex'} }}>
// 				<IconButton
// 				size="large"
// 				aria-label="account of current user"
// 				aria-controls="menu-appbar"
// 				aria-haspopup="true"
// 				onClick={handleOpenNavMenu}
// 				color="inherit"
// 				>
// 					<MenuIcon />
// 				</IconButton>
// 			</Box>

// 			<Box sx={{ flexGrow: 0 }}>
// 				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
// 					{/* <Avatar alt="Semy Sharp" src='https://upload.wikimedia.org/wikipedia/commons/f/f1/Charles_Darwin_portrait.jpg' /> */}
// 					<Avatar alt="Semy Sharp" src={this.state.avatar} />
// 				</IconButton>
// 				<Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{vertical: 'top',horizontal: 'left'}} keepMounted transformOrigin={{vertical: 'top',horizontal: 'right',}} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} >
// 					{
// 						<Box>
// 							<Profil_Card Login={'billy'}/>
// 						</Box>
// 					}
// 				</Menu>
// 			</Box>
// 		</Toolbar>
// 	</Box>
// </AppBar>
	);
				}
}