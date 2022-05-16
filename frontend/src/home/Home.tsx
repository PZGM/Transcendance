import { Stack } from "@mui/material";
import React, { Component } from "react";
import '../App.css';
import '../style/style.css'
import '../style/home.css'
import { UserAPI } from "../api/Users.api";
import SendIcon from '@mui/icons-material/Send';
import { Link, Outlet, useParams } from "react-router-dom";
import { height } from "@mui/system";
import { MyInfos } from "./ChatPannel//header/MyInfos";
import { ChatAPI } from "../api/Chat.api";
import { Selecter } from './ChatPannel/header/Selecter'
import { PrivateGuard } from "../components/PrivateGuard";
import { Game } from "./Game/Game";
import { UserInfo } from "./ChatPannel/UserInfo";


interface HomeProps {
};


interface HomeState {
	avatar?: string,
	login?: string,
	display?: number;
	displayId?: number;
	numberBack?: number;
	winnerId: number,
	winnerScore: number,
	loserId: number,
	loserScore: number,
	duration: number,
	channel: any,
	userStatus: number
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
			display: 0,
			displayId: undefined,
			winnerId: 0,
			winnerScore: 0,
			loserId: 0,
			loserScore: 0,
			duration: 0,
      		channel: undefined,
			userStatus: 0
		}
		this.updateHomeState = this.updateHomeState.bind(this);
		this.updateDisplay = this.updateDisplay.bind(this);
		this.handleChangeWinnerId = this.handleChangeWinnerId.bind(this);
		this.handleChangeWinnerScore = this.handleChangeWinnerScore.bind(this);
        this.handleChangeLoserId = this.handleChangeLoserId.bind(this);
        this.handleChangeLoserScore = this.handleChangeLoserScore.bind(this);
        this.handleChangeDuration = this.handleChangeDuration.bind(this);
		//this.createNewGame = this.createNewGame.bind(this);
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
		if (resp)
			this.setState({
				avatar: resp.avatar,
				login: resp.login,
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


	updateDisplay(type: number, id: any, numberBack: number) {
		this.setState({
			display: type,
			displayId: id,
			numberBack: numberBack,
		})
	}

	/*async createNewGame() {
        UserAPI.createNewGame({
			winnerId: this.state.winnerId,
			loserId: this.state.loserId,
			winnerScore: this.state.winnerScore,
			loserScore: this.state.loserScore,
			duration: this.state.duration,
			roomId: "test",
			createdDate: new Date(Date.now()),
			players : [],
		})
    }*/

    handleChangeWinnerId = (e: React.ChangeEvent<HTMLInputElement>) => {
        const log = e.target.value;
        this.setState({
            winnerId: +log
        })
    }

	handleChangeWinnerScore = (e: React.ChangeEvent<HTMLInputElement>) => {
        const log = e.target.value;
        this.setState({
            winnerScore: +log
        })
    }

	handleChangeLoserId = (e: React.ChangeEvent<HTMLInputElement>) => {
        const log = e.target.value;
        this.setState({
            loserId: +log
        })
    }

	handleChangeLoserScore = (e: React.ChangeEvent<HTMLInputElement>) => {
        const log = e.target.value;
        this.setState({
            loserScore: +log
        })
    }

	handleChangeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
        const log = e.target.value;
        this.setState({
            duration: +log
        })
    }

	render () {
		return (
			<div className="box">
				{/* <PrivateGuard/> */}
				
				<Game userStatus={this.state.userStatus}/>

				<Stack sx={{backgroundColor: 'black'}} className='right'>
					<MyInfos avatar={this.state.avatar} login={this.state.login}/>
					<Selecter channelName={(this.state.channel) ? this.state.channel.name : '...'} ></Selecter>
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
