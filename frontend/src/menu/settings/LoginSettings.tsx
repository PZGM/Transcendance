import { Grid } from "@mui/material";
import { Component } from "react";
import { UserAPI } from "../../api/Users.api";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "../../style/buttons.css";

toast.configure();

type LoginSettingsProps = {
    login?: string
    color: string
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
        if (this.state.input === this.props.login)
            this.setState({editing: false})
        else if (this.state.input !== '')
        {
            let isValid = await UserAPI.updateLogin(this.state.input);
            if (isValid) {
                this.props.updateParentState({ login: this.state.input });
                toast.success(`Login updated to ${this.state.input}`, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    pauseOnHover: false,
                    closeOnClick: true,})
                this.setState({editing: false})
            }
            else
                toast.error("Invalid new login", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    pauseOnHover: false,
                    closeOnClick: true,
                })
        }
        else
        {
            toast.error("Empty login is invalid", {
                position: toast.POSITION.BOTTOM_CENTER,
                pauseOnHover: false,
                closeOnClick: true,
            })
        }

    }

    render() {

        return (
            <Grid container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{height: '33%'}}
            >
                <Grid item xs={4}
                    className="grid_item_style bit9x9 white"
                >
                    NICKNAME
                </Grid>
                
                <Grid item xs={4}
                    className='grid_item_style'
                >
                    {!this.state.editing &&
                        <input
                            id="unstyled"
                            className={"settings_nick_input " + this.props.color}
                            defaultValue={this.props.login}
                            onChange={this.handleChangeLogin}
                            disabled
                        />}
                    {this.state.editing &&
                        <input autoFocus
                            id="unstyled"
                            maxLength={10}
                            className={"settings_nick_input " + this.props.color}
                            defaultValue={this.props.login}
                            onChange={this.handleChangeLogin}
                        />
                    }
                </Grid>

                <Grid item xs={4}
                    className='grid_item_style'
                >
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