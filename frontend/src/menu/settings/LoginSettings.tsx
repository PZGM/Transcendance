import { Grid, InputBase } from "@mui/material";
import { Component } from "react";
import { UserAPI } from "../../api/Users.api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import button from "../../style/buttons.module.css"

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
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
		this.updateLogin = this.updateLogin.bind(this)
		this.state = {
            input: this.props.login || '',
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
        if (this.state.input == this.props.login)
            toast.error("This is already your login", {
                position: toast.POSITION.BOTTOM_CENTER
            })
        else if (this.state.input != '') {
            let isValid = await UserAPI.updateLogin(this.state.input);
            if (isValid) {
                this.props.updateParentState({ login: this.state.input });
                toast.success(`Login updated to ${this.state.input}`, {
                    position: toast.POSITION.BOTTOM_CENTER
                })
            }
            else
                toast.error("Invalid new login", {
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
									<Grid item xs={4} sx={GridItemStyle}> NICKNAME </Grid>
									<Grid item xs={4} sx={GridItemStyle}>
										{!this.state.editing && "Fmanetti"}
                                        {this.state.editing &&
                                            <InputBase autoFocus    defaultValue="FMANETTI"
                                                                    sx={{fontFamily: 'Bit9x9',
                                                                        fontSize: 'calc(10px + 1vw)',
                                                                        color: 'white',
                                                                        textAlign: 'center'}}
                                                                    onChange={this.handleChangeLogin}
                                                                    inputProps={{style: { textAlign: 'center' }}}
                                            />
                                        }
									</Grid>
									<Grid item xs={4} sx={GridItemStyle}>
                                        {!this.state.editing &&
                                            <div className={button.button}
                                                style={{width: '100px',
                                                        height: '70px',
                                                        backgroundColor: 'rgb(20, 121, 249)',
                                                        fontFamily: 'backto1982',
                                                        fontSize: '20px'}}
                                                onClick={ () => {this.setState({editing: true})}}>
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