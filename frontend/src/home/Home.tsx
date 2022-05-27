import React, { Component } from "react";
import '../App.css';
import '../style/style.css'
import '../style/home.css'
import MyInfos from "./ChatPannel//header/MyInfos";
import { UserAPI } from "../api/Users.api";
<<<<<<< HEAD
import SendIcon from '@mui/icons-material/Send';
import { Link, Outlet, useParams } from "react-router-dom";
=======
import { Outlet } from "react-router-dom";
>>>>>>> 52efbb5ca0f319dad0730297f16832b8093565f1
import { ChatAPI } from "../api/Chat.api";
import { Game } from "./Game/Game";
import { Stack } from "@mui/material";
import { GameSocketAPI } from "../api/GameSocket.api";
import { Room } from "../api/dto/game.dto";
import Selecter from "./ChatPannel/header/Selecter";


interface HomeProps {
};


interface HomeState {
	avatar?: string,
	login?: string,
	color?: string,
	channel: any,
	display: number,
	room?: Room
}

export const get_env = () : string => {
	let str = process.env.REACT_APP_SETTINGS;
	if (str)
		return str;
	return '';// will return API URL in .env file.
  };

export class Home extends Component<HomeProps, HomeState> {

	gameSocket: GameSocketAPI;

	constructor(props: HomeProps) {
		super(props);
		
		this.gameSocket = new GameSocketAPI({
								receiveGameRoom: this.receiveGameRoom.bind(this),
								updateRoom: this.updateRoom.bind(this)})

		this.state = {
			avatar: undefined,
			login: undefined,
			color: undefined,
      		channel: undefined,
			display: 0,
			room: undefined
		}
	}

	receiveGameRoom(room: Room) {
		console.log(room);
		this.setState({
			room,
			display: 2
		})
	}

	updateRoom (room: Room) {
		this.setState({room})
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
		return (
			<div className="box">
				{/* <PrivateGuard/> */}
				
				<Game	display={this.state.display}
						room={this.state.room}
						gameSocket={this.gameSocket}
				/>

				<Stack sx={{backgroundColor: 'black'}} className='right'>
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
