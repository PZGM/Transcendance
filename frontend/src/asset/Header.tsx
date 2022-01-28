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


// fetch('http://ssh.billyboy.fr:3000/api/users/me', {credentials: 'include'})
//   .then(response => {return response.json()})
//   .then(json => console.log(json))



export default function Header() {
	const [login, setLogin] = useState(null);
	const [avatar, setAvatar] = useState(null);

	// useEffect(() => {
	// 	getLogin();

	// 	async function getLogin() {
	// 		const resp = await fetch("http://ssh.billyboy.fr:3000/api/users/me", {
	// 			method: "GET",
	// 			credentials: "include",
	// 			mode: "no-cors"
	// 		})
			
	// 		const data = await resp.json();
	// 		setUser(data);
	// 	}
	// },[]);

		// fetch('http://ssh.billyboy.fr:3000/api/users/me', {credentials: 'include'})
		// .then(response => {return response.json()})
		// .then(json => this.setState({post: json}))


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


	  console.log(avatar);
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
					<Avatar alt="Semy Sharp" src='https://cdn.intra.42.fr/users/braimbau.jpg' />
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
					{
						<div>
							<Typography>{login}</Typography>
						</div>
					}
				{/* {login.map((login) => {
					return (
						<MenuItem onClick={handleCloseUserMenu}>
							<Typography textAlign="center">{login}</Typography>
						</MenuItem>
					)
				})

				} */}
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