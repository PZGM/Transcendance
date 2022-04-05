import { Grid, InputBase } from "@mui/material";
import { Component, useEffect } from "react";
import { UserAPI } from "../../api/Users.api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import button from "../../style/buttons.module.css";
import style from "../../style/settings.module.css"

toast.configure()

type LoginSettingsProps = {
    login?: string,
	updateParentState: any
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
        const log = e.target.value;
    
        this.setState({
            input: log
        })
    }
    
    async updateLogin() {
        console.log(this.state.input)
        console.log(this.props.login)
        if (this.state.input == this.props.login)
        {
            toast.error("This is already your login", {
                position: toast.POSITION.BOTTOM_CENTER
            })
            this.setState({editing: false})
        }
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

        const GridItemStyle = {
			color: 'white',
			alignItems: 'stretch',
			display: "flex",
			justifyContent: 'center',
			fontFamily: 'Bit9x9',
			fontSize: 'calc(10px + 1vw)'
		};

        return (
            <Grid container
									direction="row"
									justifyContent="space-between"
									alignItems="center"
									sx={{height: '33%'}}
								>
									<Grid item xs={4} className={style.griditem}> NICKNAME </Grid>
									<Grid item xs={4} className={style.griditem}>
                                        {!this.state.editing && this.props.login}
                                        {this.state.editing &&
                                            <InputBase autoFocus    className={style.nick}
                                                                    defaultValue={this.props.login}
                                                                    sx={{fontFamily: 'Bit9x9',
                                                                        fontSize: 'calc(10px + 1vw)',
                                                                        color: 'white',
                                                                        textAlign: 'center',
                                                                        border: '10px red'
                                                                        }}
                                                                    onChange={this.handleChangeLogin}
                                                                    inputProps={{style: { textAlign: 'center',
                                                                                        border: '10px red' }}}
                                            />
                                        }
									</Grid>
									<Grid item xs={4} className={style.griditem}>
                                        {!this.state.editing &&
                                            <div className={button.button}
                                                style={{width: '100px',
                                                        height: '70px',
                                                        backgroundColor: 'rgb(20, 121, 249)',
                                                        fontFamily: 'backto1982',
                                                        fontSize: '20px'}}
                                                onClick={ () => {this.setState({
                                                                            input: this.props.login || '',
                                                                            editing: true})}
                                                        }>
                                                EDIT
                                            </div>}
                                        {this.state.editing &&
                                            <div className={button.button}
                                                style={{width: '100px',
                                                        height: '70px',
                                                        backgroundColor: 'green',
                                                        fontFamily: 'backto1982',
                                                        fontSize: '20px'}}
                                                onClick={() => {this.updateLogin()}}>
                                                SAVE
                                            </div>}
									</Grid>
								</Grid>
        )
    }
}