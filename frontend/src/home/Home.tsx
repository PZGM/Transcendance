import React, { Component } from "react";
import '../App.css';
import '../style/style.css'
import '../style/home.css'
import MyInfos from "./ChatPannel//header/MyInfos";
import { UserAPI } from "../api/Users.api";
import { Link, Outlet, useParams } from "react-router-dom";
import { ChatAPI } from "../api/Chat.api";
import { Game } from "./Game/Game";
import { Stack } from "@mui/material";
import { GameSocketAPI } from "../api/GameSocket.api";
import { Room } from "../api/dto/game.dto";
import Selecter from "./ChatPannel/header/Selecter";
import { PrivateGuard } from "../components/PrivateGuard";


interface HomeProps {
};


interface HomeState {
	avatar?: string,
	login?: string,
	color?: string,
	channel: any
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

		this.state = {
			avatar: undefined,
			login: undefined,
			color: undefined,
      		channel: undefined
		}
	}

	async fetchUser() {
		const resp = await UserAPI.getMe();
		if (resp)
			this.setState({
				avatar: resp.avatar,
				login: resp.login,
				color: resp.color
			})
	}

	async getChannel() {
        let chan = await ChatAPI.getChannelById(1);
		this.setState({channel: chan});
    }

	componentDidMount()  {
		this.fetchUser();
		this.getChannel();
	}

	render () {
		console.log('RENDER HOME')
		return (
			<div className="box">
				<PrivateGuard/>
				
				<Game key={this.state.login}/>

				<Stack direction="column" className='chat_panel'>
					<MyInfos avatar={this.state.avatar} login={this.state.login} color={this.state.color}/>
					<Selecter/>
					<Outlet/>
				</Stack>
			</div>
		)
	}
}

// chat (chan + mp) (chat ID / User ID)
// channel info (chan ID)
// user info (user ID)
// edit channel [to protect admin only] (chan ID)
// add user in channel [to protect admin only] (chan ID)