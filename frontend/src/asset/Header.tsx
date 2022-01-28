import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useState, Component } from "react";
import {UserAPI} from "../api/Users.api";

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];



// fetch('https://jsonplaceholder.typicode.com/todos/1').then((response) => {
// 	response = response.json()
// 	response.then((result) => {
// 		console.log(result)
// 	})
// })


fetch('http://ssh.billyboy.fr:3000/api/users/me')
  .then(response => {return response.json()})
  .then(json => console.log(json))

export default function Header() {
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


	  const [login,setLogin] = useState([]);
	  useEffect(() => {
			async function fetchLogin() {
				const resp = await UserAPI.getLogin();
				
				setLogin(resp);
			}
			fetchLogin();
	  }, []);


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
					<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
				</IconButton>
				<Menu
				sx={{ mt: '45px' }}
				id="menu-appbar"
				anchorEl={anchorElUser}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorElUser)}
				onClose={handleCloseUserMenu}
				>
				{login.map((login) => {
					return (
						<MenuItem onClick={handleCloseUserMenu}>
							<Typography textAlign="center">{login}</Typography>
						</MenuItem>
					)
				})

				}
				{/* {settings.map((setting) => (
					<MenuItem onClick={handleCloseUserMenu}>
					<Typography textAlign="center">yo</Typography>
					</MenuItem>
				))} */}
				</Menu>
			</Box>
		</Toolbar>
	</Box>
</AppBar>
	);
}