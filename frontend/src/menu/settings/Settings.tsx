import { Grid, Avatar, InputBase } from "@mui/material";
import { ChangeEvent, Component, Fragment } from "react";
import { UserAPI } from "../../api/Users.api";
import Menu from "../Menu";
import background from "./../../asset/images/background.jpg"
import { rgbaToHsva } from "tsparticles"
import { LoginSettings } from "./LoginSettings"
import { AvatarSettings } from "./AvatarSettings"
import { TwofaSettings } from "./2FASettings";
import ReactCSSTransitionGroup from 'react-transition-group';


type SettingsProps = {
	login?: string,
};

interface SettingsState {
	avatar: string
	login?: string
	display: number
}

export class Settings extends Component<SettingsProps, SettingsState> {
	editor: any

	constructor(props: SettingsProps) {
		super(props);
		this.updateState = this.updateState.bind(this);
		this.updateDisplay = this.updateDisplay.bind(this);
		this.state = {avatar: '', login: undefined, display: 0}
	}

	async fetchUser() {
		const resp = await UserAPI.getUser();
		console.log(resp)
		this.setState({
			avatar: resp.avatar,
			login: resp.login
		})
	}

	componentDidMount()  {
		this.fetchUser();
	}

	// handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
	// 	const fileList = e.target.files;

	// 	if (!fileList) return;

	// 	this.setState({
	// 		fileSelected: fileList[0]
	// 	})
	// };

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

	// handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	const log = e.target.value;

	// 	this.setState({
	// 		loginSelected: log
	// 	})
	// }

	// updateLogin = () => {
	// 	if (this.state.loginSelected) {
	// 		UserAPI.updateLogin(this.state.loginSelected);
	// 	}
	// }

	updateDisplay(type: number) {
		console.log(`display [${type}]`)
		this.setState({
			display: type
		})
	}

	// Add transitions
	display() {
		if (this.state.display == 0)
			return (
				<Fragment>
					<LoginSettings	login={this.state.login}
									updateParentState={this.updateState}
									updateDisplay={this.updateDisplay}
					/>
					<AvatarSettings avatar={this.state.avatar}
									updateParentState={this.updateState}
									updateDisplay={this.updateDisplay}
									editing={false}
					/>
					<TwofaSettings	updateParentState={this.updateState}
									updateDisplay={this.updateDisplay}
									activating={false}
					/>
				</Fragment>
			)
		else if (this.state.display == 1)
			return (<AvatarSettings avatar={this.state.avatar}
									updateParentState={this.updateState}
									updateDisplay={this.updateDisplay}
									editing={true}
					/>)
		else if (this.state.display == 2)
			return (<TwofaSettings	updateParentState={this.updateState}
									updateDisplay={this.updateDisplay}
									activating={true}
					/>)
	}

	render ()
	{
		return this.display();
    };
}

/* <Box m="10%" p="10px" display="flex" width="100% - 3px" height="100% - 3px" bgcolor="white" sx={{border: '3px solid grey' }} minWidth={"500px"} maxWidth={"5000px"}>
	<Grid container direction="row-reverse"   justifyContent="space-between"  alignItems="stretch">
		<Box width="25%" minWidth={"100px"}>
			<Menu/>
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
</Box> */