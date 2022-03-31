import { Box, Drawer, Typography, Avatar, Button, TextField, IconButton, Stack, Container } from "@mui/material";
import React, { Component } from "react";
import { Helmet } from "react-helmet";
import '../App.css';
import '../style/style.css'
import '../style/home.css'
import {UserAPI} from "../api/Users.api";
import SendIcon from '@mui/icons-material/Send';
import { Link } from "react-router-dom";
import { MiniStatus } from "../asset/MiniStatus";
import { height } from "@mui/system";
import { MyInfos } from "./MyInfos";
import { Profile } from "./Profile";
import { Chat } from "./gestion_chat/Chat";
import { CUmenu } from "./C_U_menu/C_U_menu";
import { ChannelInfo } from "./channel_info/Channel_info";
import { UserInfo } from "./User_info/User_info";
import { ChannelInfoAdmin } from "./Channel_info_admin/Channel_info_admin";
import { AddUserChannel } from "./Channel_info_admin/Add_user_channel";


interface HomeProps {
};


interface HomeState {
	avatar?: string,
	login?: string,
	display?: number;
	displayId?: number;
}


export const get_env = () : string => {
	let str = process.env.REACT_APP_SETTINGS;
	if (str)
		return str;
	return '';// will return API URL in .env file.
  };

export class Home extends Component<HomeProps, HomeState> {
	constructor(props: HomeProps) {
		super(props);
		this.state = {avatar: undefined, login: undefined, display: 0, displayId: undefined}
		this.updateHomeState = this.updateHomeState.bind(this);
		this.updateDisplay = this.updateDisplay.bind(this);
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

	updateDisplay(type: number, id: any) {
		this.setState({
			display: type,
			displayId: id,
		})
	}

	display() {
		if (this.state.display == 0)
			return <Chat updateDisplay={this.updateDisplay}></Chat>
		if (this.state.display == 2)
			return <CUmenu updateDisplay={this.updateDisplay} id={this.state.displayId}/>
		if (this.state.display == 3)
			return <ChannelInfo updateDisplay={this.updateDisplay} id={this.state.displayId}/>
		if (this.state.display == 4)
			return <UserInfo updateDisplay={this.updateDisplay} id={this.state.displayId}/>
		if (this.state.display == 5)
			return <ChannelInfoAdmin updateDisplay={this.updateDisplay} id={this.state.displayId}/>
		if (this.state.display == 6)
			return <AddUserChannel updateDisplay={this.updateDisplay} id={this.state.displayId}/>
		return <Profile updateDisplay={this.updateDisplay} id={this.state.displayId}></Profile>
	}

	render () {
		return (
			<div className="box">
				<Box sx={{backgroundColor: 'pink'}} className='left'>
					<img src={require('../asset/images/pong.png')} className="game" alt=""/>
				</Box>
				<Stack sx={{backgroundColor: 'green'}} className='right'>
					<MyInfos avatar={this.state.avatar} login={"afreire-"}/>
					{/* <MyInfos avatar={this.state.avatar} login={this.state.login}/> */}
					{this.display()}
				</Stack>
			</div>
		)
	}
}