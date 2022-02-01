import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, Container } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useState, Component } from "react";
import {UserAPI} from "../api/Users.api";
import Profil_Card from "./Profile_Card";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';




export default function Header() {
	const [login, setLogin] = useState(null);
	const [avatar, setAvatar] = useState(null);
	const [user, setUser] = useState(null);


	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
	  setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
	  setAnchorElUser(event.currentTarget);
	};
  
	const handleCloseNavMenu = () => {
	  setAnchorElNav(null);
	};
	
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	  };


	useEffect(() => {
		async function fetchUser() {

			const resp = await UserAPI.getUser();
			setUser(resp);
		}
		fetchUser();
	}, [user]);
	//   useEffect(() => {
	// 		async function fetchUser() {

	// 			const resp = await UserAPI.getUser();
	// 			setLogin(resp.login);
	// 			setAvatar(resp.img_url);

	// 		}
	// 		fetchUser();
	//   }, [login, avatar]);


	  console.log("yo");
	//   console.log(avatar);
	//   console.log(login);
	  console.log(user);
	  console.log("merde");
	// fetch('http://ssh.billyboy.fr:3000/api/users/me')


	return (
	<AppBar position="static">
	<Box>
		<Toolbar>
			<Box sx={{ flexGrow: 1, display: { xs: 'flex'} }}>
				<IconButton
				size="large"
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleOpenNavMenu}
				color="inherit"
				>
					<MenuIcon />
				</IconButton>
			</Box>

			<Box sx={{ flexGrow: 0 }}>
				<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
					<Avatar alt="Semy Sharp" src='https://upload.wikimedia.org/wikipedia/commons/f/f1/Charles_Darwin_portrait.jpg' />
					{/* <Avatar alt="Semy Sharp" src='{user.url_img}' /> */}
				</IconButton>
				<Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{vertical: 'top',horizontal: 'right'}} keepMounted transformOrigin={{vertical: 'top',horizontal: 'right',}} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} >
					{
						<Profil_Card/>
					}
				</Menu>
			</Box>
		</Toolbar>
	</Box>
</AppBar>
	);
}