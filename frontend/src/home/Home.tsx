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
import { ChannelEditPage } from "./Channel_info_admin/Channel_editing_page";
import { CreateChannel } from "./C_U_menu/CreateChannel";
import { ChatAPI } from "../api/Chat.api";
import { ConstructionOutlined } from "@mui/icons-material";


interface HomeProps {
};


interface HomeState {
	avatar?: string,
	login?: string,
	display?: number;
	displayId?: number;
	numberBack?: number;
	channel: any;
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
		this.state = {avatar: undefined, login: undefined, display: 0, displayId: undefined, channel: undefined}
		this.updateHomeState = this.updateHomeState.bind(this);
		this.updateDisplay = this.updateDisplay.bind(this);
		this.display = this.display.bind(this);
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

	async getChannel() {
        let chan = await ChatAPI.getChannelById(1);
		this.setState({channel: chan});
		console.log("fuck 1");
		// console.log(this.state.channel.users)
		console.log(this.state.channel.name)
		console.log("fuck 2");
		// console.log(JSON.parse(chan));

		// return JSON.parse(chan);
    }


	componentDidMount()  {
		this.fetchUser();
		this.getChannel();
	}


	updateDisplay(type: number, id: any, numberBack: number) {
		this.setState({
			display: type,
			displayId: id,
			numberBack: numberBack,
		})
	}

	display() {
		if (this.state.display == 0)
			return <Chat updateDisplay={this.updateDisplay} channel={this.state.channel}></Chat>
		if (this.state.display == 2)
			return <CUmenu updateDisplay={this.updateDisplay} id={this.state.displayId} channel={this.state.channel}/>
		if (this.state.display == 3)
			return <ChannelInfo updateDisplay={this.updateDisplay} id={this.state.displayId} channel={this.state.channel}/>
		if (this.state.display == 4)
			return <UserInfo updateDisplay={this.updateDisplay} id={this.state.displayId} numberBack={this.state.numberBack} channel={this.state.channel}/>
		if (this.state.display == 5)
			return <ChannelInfoAdmin updateDisplay={this.updateDisplay} id={this.state.displayId} channel={this.state.channel}/>
		if (this.state.display == 6)
			return <AddUserChannel updateDisplay={this.updateDisplay} id={this.state.displayId}channel={this.state.channel}/>
		if (this.state.display == 7)
			return <ChannelEditPage updateDisplay={this.updateDisplay} id={this.state.displayId}channel={this.state.channel}/>
		if (this.state.display == 8)
			return <CreateChannel updateDisplay={this.updateDisplay} id={this.state.displayId}channel={this.state.channel}/>
		return <Profile updateDisplay={this.updateDisplay} id={this.state.displayId} ></Profile>
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