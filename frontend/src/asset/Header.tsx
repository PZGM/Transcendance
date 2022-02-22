import { AppBar, Avatar, Box, IconButton, Menu, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useState, Component } from "react";
import {UserAPI} from "../api/Users.api";
import { ProfileCard } from "./Profile_Card";
import { FenceTwoTone } from "@mui/icons-material";

interface HeaderProps {};
  
interface HeaderState {
	avatar?: string,
	login?: string,
	anchorElUser?: null | HTMLElement,
	anchorElNav?: null | HTMLElement,
  }

export class Header extends Component<HeaderProps, HeaderState>{
	constructor(props: HeaderProps) {
		super(props);
		this.state = {avatar: undefined, login: undefined, anchorElUser: null, anchorElNav: null}
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
		if (!resp)
			return;
		this.setState({
			avatar: resp.img_url,
			login: resp.login
		})
	}

	componentDidMount()  {
		this.fetchUser();
	}

  
	handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
	  this.setState({anchorElNav: event.currentTarget});
	};

	handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
	  this.setState({anchorElUser: event.currentTarget});
	};
  
	handleCloseNavMenu = () => {
	  this.setState({anchorElNav: null});
	};
	
	handleCloseUserMenu = () => {
		this.setState({anchorElUser: null});
	};


	render () {
		return (
			<div></div>
			// <AppBar position="static">
			// 	<Box>
			// 		<Toolbar>
			// 			<Box sx={{ flexGrow: 1, display: { xs: 'flex'} }}>
			// 				<IconButton 
			// 				size="large"
			// 				aria-label="account of current user"
			// 				aria-controls="menu-appbar"
			// 				aria-haspopup="true"
			// 				onClick={this.handleOpenNavMenu}
			// 				color="inherit"
			// 				>
			// 					<MenuIcon />
			// 				</IconButton> 
			// 			</Box> 
			// 			<Box sx={{ flexGrow: 0 }}>
			// 				<IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
			// 					<Avatar alt="Semy Sharp" src={this.state.avatar} />
			// 				</IconButton>
			// 				<Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={this.state.anchorElUser} anchorOrigin={{vertical: 'top',horizontal: 'left'}} keepMounted transformOrigin={{vertical: 'top',horizontal: 'right',}} open={Boolean(this.state.anchorElUser)} onClose={this.handleCloseUserMenu} >  
			// 					{ 
			// 						<Box>
			// 							<ProfileCard login={this.state.login} updateHeaderState={this.updateHeaderState}></ProfileCard>
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