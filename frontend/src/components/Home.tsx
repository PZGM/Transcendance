import { Box, Container, Drawer, Grid, Typography, Avatar, Button, TextField, IconButton } from "@mui/material";
import React, { useEffect, useState, Component } from "react";
import { Helmet } from "react-helmet";
import '../App.css';
import '../style/style.css'
import {UserAPI} from "../api/Users.api";
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import { Link, NavLink } from "react-router-dom";
import { MiniStatus } from "../asset/MiniStatus";

const drawerWidth = 500;

interface HomeProps {
};


interface HomeState {
	avatar?: string,
	login?: string,
}


export const get_env = () : string => {
	let str = process.env.REACT_APP_SETTINGS;
	if (str)
		return str;
	return '';// will return API URL in .env file.
  };

// const Ava = styled('Ava')({
// 	display: 'flex',
// 	width: '20%',
// });


export class Home extends Component<HomeProps, HomeState> {
	constructor(props: HomeProps) {
		super(props);
		this.state = {avatar: undefined, login: undefined}
		this.updateHomeState = this.updateHomeState.bind(this);
	}

	async updateHomeState({login, avatar} : HomeState) {
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



	render () {
		return (
			<div>
				<Helmet>
					<style>{'body { background-color: black; }'}</style>
				</Helmet>

				<Drawer 
				sx={{
					'& .MuiDrawer-paper': {
						width: '25%',
					},
				}}
				variant="permanent"
				anchor="right"
				>

					{/* options genereal need trouver un moyen d'ouvrir les settings sans refresh la page*/}
					<Button component={Link} to={process.env.REACT_APP_PROFILE as string} sx={{width: '100%', height: '5%',backgroundColor: 'yellow'}}>
						<Avatar variant='circular' alt="Semy Sharp" src={this.state.avatar} sx={{ }}/>
						{/* <Typography>yo</Typography> */}
					</Button>
					<Box sx={{height:'95%'}}>
						{/* Channels et  */}
						<Button sx={{width: '100%', height: '5%',backgroundColor: 'red',}}>
							<Button sx={{width: '2%', height: '2%',backgroundColor: 'black',}}>yo</Button>
							<Typography>yo</Typography>
						</Button>
						<Box sx={{width: '100%', height: '87.5%',backgroundColor: 'blue',}}>

						</Box>
						<Box>
							<TextField label="Send a msg" sx={{width: '85%',height: '12%',}} variant="filled"/>
							<IconButton size="medium">
								<SendIcon fontSize="inherit"/>
							</IconButton>
						</Box>
					</Box>
					<MiniStatus id={1} ></MiniStatus>
					<MiniStatus id={2} ></MiniStatus>
					<MiniStatus id={3} ></MiniStatus>
				</Drawer>
			</div>
		)
	}
}