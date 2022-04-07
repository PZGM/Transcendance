import { Avatar, Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { ChangeEvent, Component } from "react";
import { Helmet } from "react-helmet";
import { UserAPI } from "../../api/Users.api";
import MenuButton from "../MenuButton";
import { AvatarSettings } from "./AvatarSettings";
import { LoginSettings } from "./LoginSettings";
import { TwofaSettings } from "./TwofaSettings";



type SettingsProps = {
	login?: string,
};

interface SettingsState {
	fileSelected?: File;
	loginSelected?: string;
	scale: number;
	avatar: string,
	login?: string,
}

export class Settings extends Component<SettingsProps, SettingsState> {
	editor: any

	constructor(props: SettingsProps) {
		super(props);
		this.updateState = this.updateState.bind(this);
		this.state = {avatar: '', login: undefined, fileSelected: undefined, loginSelected: undefined, scale: 1}
	}

	async fetchUser() {
		const resp = await UserAPI.getUser();
		this.setState({
			avatar: resp.avatar,
			login: resp.login
		})
	}

	componentDidMount()  {
		this.fetchUser();
	}

	handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const fileList = e.target.files;

		if (!fileList) return;

		this.setState({
			fileSelected: fileList[0]
		})
	};

	async updateState({login, avatar}) {
		if (login)
			this.setState({
				login: login,
			})
		if (avatar)
		this.setState({
			avatar: avatar,
		})
	}

	handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
		const log = e.target.value;

		this.setState({
			loginSelected: log
		})
	}

	updateLogin = () => {
		if (this.state.loginSelected) {
			UserAPI.updateLogin(this.state.loginSelected);
		}
	}

	render (){
		return(
            <div>
				<Helmet>
					<style>{'body { background-color: black; }'}</style>
				</Helmet>
				<Box m="10%" p="10px" display="flex" width="100% - 3px" height="100% - 3px" bgcolor="white" sx={{border: '3px solid grey' }} minWidth={"500px"} maxWidth={"5000px"}>
					<Grid container direction="row-reverse"   justifyContent="space-between"  alignItems="stretch">
						<Box width="25%" minWidth={"100px"}>
							<MenuButton/>
						</Box>
						<Box width="70%" minWidth={"350px"}>
							<Box sx={{ p: 1, border: '3px solid grey' }}  width="100%">
								<Grid container direction="column" justifyContent="space-between" alignItems="center">
									<LoginSettings login={this.state.login} updateParentState={this.updateState}/>
									<Box height='20px'/>
									<AvatarSettings avatar={this.state.avatar} updateParentState={this.updateState}/>
									<Box height='20px'/>
									<TwofaSettings/>
								</Grid>
							</Box>
						</Box>
					</Grid>
				</Box>
            </div>
        );
    };
}
