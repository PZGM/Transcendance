import { Component } from "react";
import { UserAPI } from "../../api/Users.api";
import { LoginSettings } from "./LoginSettings"
import { AvatarSettings } from "./AvatarSettings"
import { ColorSettings } from "./ColorSettings"
import { TwofaSettings } from "./2FASettings";
import { PrivateGuard } from "../../components/PrivateGuard";

type SettingsProps = {
};

interface SettingsState {
	avatar: string
	login?: string
	display: number
	color: string
}

export class Settings extends Component<SettingsProps, SettingsState> {
	editor: any

	constructor(props: SettingsProps) {
		super(props);
		this.updateState = this.updateState.bind(this);
		this.updateDisplay = this.updateDisplay.bind(this);
		this.state = {	avatar: '',
						login: undefined,
						display: 0,
						color: 'white'}
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

	componentDidMount()  {
		this.fetchUser();
	}

	async updateState({login, avatar, color}) {
		if (login)
			this.setState({
				login
			})
		if (avatar)
			this.setState({
				avatar
			})
		if (color)
			this.setState({
				color
			})
	}

	updateDisplay(type: number) {
		this.setState({
			display: type
		})
	}

	// Add transitions
	display() {
		if (this.state.display === 0)
			return (
				<>
					<PrivateGuard/>
					<LoginSettings	login={this.state.login}
									color={this.state.color}
									updateParentState={this.updateState}
					/>
					<AvatarSettings avatar={this.state.avatar}
									updateParentState={this.updateState}
									updateDisplay={this.updateDisplay}
									editing={false}
					/>
					<ColorSettings	key={this.state.color}
									color={this.state.color}
									updateParentState={this.updateState}
					/>
					<TwofaSettings	updateParentState={this.updateState}
									updateDisplay={this.updateDisplay}
									activating={false}
					/>
				</>
			)
		else if (this.state.display === 1)
			return (<AvatarSettings avatar={this.state.avatar}
									updateParentState={this.updateState}
									updateDisplay={this.updateDisplay}
									editing={true}
					/>)
		else if (this.state.display === 2)
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