import { AppBar, Avatar, Box, IconButton, Menu, Toolbar } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useState } from "react";
import {UserAPI} from "../api/Users.api";
import Profil_Card from "./Profile_Card";




export default function Header() {
	const [login, setLogin] = useState<string | undefined>(undefined);
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
			setLogin(resp.login);
			setAvatar(resp.img_url);
		}
		fetchUser();
	}, [login, avatar]);

	  console.log("yo");
	  console.log("merde");


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
					{/* <Avatar alt="Semy Sharp" src='https://upload.wikimedia.org/wikipedia/commons/f/f1/Charles_Darwin_portrait.jpg' /> */}
					<Avatar alt="Semy Sharp" src='{avatar}' />
				</IconButton>
				<Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{vertical: 'top',horizontal: 'left'}} keepMounted transformOrigin={{vertical: 'top',horizontal: 'right',}} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu} >
					{
						<Box>
							<Profil_Card Login={login}/>
						</Box>
					}
				</Menu>
			</Box>
		</Toolbar>
	</Box>
</AppBar>
	);
}