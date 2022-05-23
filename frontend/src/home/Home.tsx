import React, { Component } from "react";
import '../App.css';
import '../style/style.css'
import '../style/home.css'
import MyInfos from "./ChatPannel//header/MyInfos";
import { UserAPI } from "../api/Users.api";
import SendIcon from '@mui/icons-material/Send';
import { Link, Outlet, useParams } from "react-router-dom";

import { ChatAPI } from "../api/Chat.api";
import { Game } from "./Game/Game";
import { Stack } from "@mui/material";
import { Selecter } from "./ChatPannel/header/Selecter";
import { GameSocketAPI } from "../api/GameSocket.api";
import { Room } from "../api/dto/game.dto";


interface HomeProps {
};


interface HomeState {
	avatar?: string,
	login?: string,
	color?: string,
	// display?: number;
	// displayId?: number;
	// numberBack?: number;
	// winnerId: number,
	// winnerScore: number,
	// loserId: number,
	// loserScore: number,
	// duration: number,
	channel: any,
	userStatus: number,
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
		
		this.gameSocket = new GameSocketAPI({receiveGameRoom: this.receiveGameRoom.bind(this),
											updateRoom: this.updateRoom.bind(this)})

		this.state = {
			avatar: undefined,
			login: undefined,
			color: undefined,
			// display: 0,
			// displayId: undefined,
			// winnerId: 0,
			// winnerScore: 0,
			// loserId: 0,
			// loserScore: 0,
			// duration: 0,
      		channel: undefined,
			userStatus: 0,
			room: undefined
		}

		// this.updateHomeState = this.updateHomeState.bind(this);
		// this.updateDisplay = this.updateDisplay.bind(this);
		// this.handleChangeWinnerId = this.handleChangeWinnerId.bind(this);
		// this.handleChangeWinnerScore = this.handleChangeWinnerScore.bind(this);
        // this.handleChangeLoserId = this.handleChangeLoserId.bind(this);
        // this.handleChangeLoserScore = this.handleChangeLoserScore.bind(this);
        // this.handleChangeDuration = this.handleChangeDuration.bind(this);
		//this.createNewGame = this.createNewGame.bind(this);
	}

	receiveGameRoom(room: Room) {
		console.log(room);
		this.setState({
			// display: 2,
			room
		})
	}

	updateRoom (room: Room) {
		this.setState({room})
	}

	async fetchUser() {
		const resp = await UserAPI.getUser();
		if (resp)
			this.setState({
				avatar: resp.avatar,
				login: resp.login,
				color: resp.color,
				userStatus: resp.status
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
				
				<Game	userStatus={this.state.userStatus}
						room={this.state.room}
						gameSocket={this.gameSocket}/>

				<Stack sx={{backgroundColor: 'black'}} className='right'>
					<MyInfos avatar={this.state.avatar} login={this.state.login} color={this.state.color}/>
					<Selecter ></Selecter>
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
