import { Grid, InputBase } from "@mui/material";
import { Component, useEffect } from "react";
import { UserAPI } from "../../api/Users.api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../style/buttons.css";
import style from "../../style/settings.module.css"

toast.configure()

type LoginSettingsProps = {
    login?: string
	updateParentState: any
    updateDisplay: any
};

interface LoginSettingsState {
	input: string,
    editing: boolean
}

export class LoginSettings extends Component<LoginSettingsProps, LoginSettingsState> {
	
    constructor(props: LoginSettingsProps) {
		super(props);
        this.handleChangeLogin = this.handleChangeLogin.bind(this)
		this.updateLogin = this.updateLogin.bind(this)
		console.log(props)
        console.log(props.login)
        this.state = {
            input: '',
            editing: false
        }
	}

    handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/\W/g, "");

        this.setState({
            input: e.target.value
        })
    }
    
    async updateLogin() {
        console.log(this.state.input)
        console.log(this.props.login)
        if (this.state.input == this.props.login)
            this.setState({editing: false})
        else if (this.state.input != '')
        {
            let isValid = await UserAPI.updateLogin(this.state.input);
            if (isValid) {
                this.props.updateParentState({ login: this.state.input });
                toast.success(`Login updated to ${this.state.input}`, {
                    position: toast.POSITION.BOTTOM_CENTER})
                this.setState({editing: false})
            }
            else
                toast.error("Invalid new login", {
                    position: toast.POSITION.BOTTOM_CENTER
                })
        }
        else
        {
            toast.error("Empty login is invalid", {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }

    }

    render() {

        // Da togliere
        const GridItemStyle = {
			alignItems: 'stretch',
			display: "flex",
			justifyContent: 'center',
			fontSize: 'calc(10px + 1vw)'
		};

        return (
            <Grid container
									direction="row"
									justifyContent="space-between"
									alignItems="center"
									sx={{height: '33%'}}
								>
									<Grid item xs={4} className="bit9x9 white" style={GridItemStyle}> NICKNAME </Grid>
									<Grid item xs={4} className={style.griditem}>
                                        {!this.state.editing &&
                                            <input
                                                id="unstyled"
                                                className="settings_nick_input"
                                                defaultValue={this.props.login}
                                                onChange={this.handleChangeLogin}
                                                disabled
                                            />}
                                        {this.state.editing &&
                                            <input autoFocus
                                                id="unstyled"
                                                className="settings_nick_input"
                                                defaultValue={this.props.login}
                                                onChange={this.handleChangeLogin}
                                            />
                                        }
									</Grid>
									<Grid item xs={4} className={style.griditem}>
                                        {!this.state.editing &&
                                            <div className="settings_button but_blue"
                                                onClick={ () => {this.setState({input: this.props.login || '',
                                                                                editing: true})}
                                                        }>
                                                EDIT
                                            </div>}
                                        {this.state.editing &&
                                            <div className="settings_button but_green"
                                                onClick={() => {this.updateLogin()}}>
                                                SAVE
                                            </div>}
									</Grid>
								</Grid>
        )
    }
}