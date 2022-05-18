import { Stack, Grid } from "@mui/material";
import { Component } from "react";
import { UserAPI } from "../api/Users.api";
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../style/buttons.css"
import "../style/display.css"


interface UserInitProps {
};

interface UserInitState {
    avatar: string
	login?: string
    input: string
	display: number
	color: string
    redirect: boolean
};

export class UserInit extends Component<UserInitProps, UserInitState> {

    constructor(props: UserInitProps) {
		super(props);

        this.handleChangeLogin = this.handleChangeLogin.bind(this)
		this.updateLogin = this.updateLogin.bind(this)

		this.state = {	avatar: '',
						login: undefined,
                        input: '',
						display: 0,
						color: 'white',
                        redirect: false    
                    }
	}

	async fetchUser() {
		const resp = await UserAPI.getUser();
		if (resp)
			this.setState({
				avatar: resp.avatar,
				login: resp.login,
				color: resp.color,
                input: resp.login
			})
	}

	componentDidMount()  {
		this.fetchUser();
	}

    handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = e.target.value.replace(/\W/g, "");

        this.setState({
            input: e.target.value
        })
    }

    async updateLogin(): Promise<boolean>
    {
        if (this.state.input !== '')
        {
            let isValid = await UserAPI.updateLogin(this.state.input);
            if (isValid) {
                this.setState({ login: this.state.input });
                toast.success(`Login set to ${this.state.input}`, {
                    position: toast.POSITION.BOTTOM_CENTER,
                    pauseOnHover: false,
                    closeOnClick: true,})
                return true
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

        return false
    }

    getClassName(color: string): string | undefined
	{
        if (color === this.state.color)
            return "bc_" + color + " color_selected"

		return "but_" + color
	}

    onClick(color: string)
    {
        this.setState({color});
        UserAPI.updateColor(color)
    }

    async save()
    {
        if (await this.updateLogin())
        {
            toast.success(`Color set to ${this.state.color}`, {
                position: toast.POSITION.BOTTOM_CENTER,
                pauseOnHover: false,
                closeOnClick: true,
            })
            this.setState({redirect: true})
        }
    }

	render ()
    {

		return (

            <div className="background">
                {/* Redirect to home */}
                { this.state.redirect ? (<Navigate to={{pathname: process.env.REACT_APP_HOME}}/>) : null }
				
                <div className="frame_div">
                    <Grid container
                        justifyContent="space-evenly"
                        wrap="nowrap"
                        className="userinit_frame"
                        direction="column"
                    >
                        <Grid item xs={3}
                            className="grid_item_style">
                            CHOOSE YOUR...
                        </Grid>
                        
                        <Grid item xs={3}
                            className="grid_item_style">
                            <Grid container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{height: '33%'}}
                            >
                                <Grid item xs={4}
                                    className="grid_item_style"
                                >
                                    NICKNAME
                                </Grid>
                                
                                <Grid item xs={8}
                                    className="grid_item_style"
                                >
                                    <input autoFocus
                                        id="unstyled"
                                        maxLength={10}
                                        className={"userinit_nick_input " + this.state.color}
                                        defaultValue={this.state.login}
                                        onChange={this.handleChangeLogin}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        
                        <Grid item xs={3}
                            className="grid_item_style">
                            <Grid container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{height: '33%'}}
                            >
                                <Grid item xs={4}
                                    className="grid_item_style"
                                >
                                    COLOR
                                </Grid>
                                
                                <Grid item xs={8}
                                    className="grid_item_style"
                                >
                                    <Stack direction="row"
                                        justifyContent="space-around"
                                        alignItems="center"
                                        style={{width: '100%'}}
                                    >
                                        <div className={"colors_button " + this.getClassName('green')}
                                            onClick={() => {this.onClick('green')}}/> 
                                        <div className={"colors_button " + this.getClassName('red')}
                                            onClick={() => {this.onClick('red')}}/> 
                                        <div className={"colors_button " + this.getClassName('pink')}
                                            onClick={() => {this.onClick('pink')}}/>
                                        <div className={"colors_button " + this.getClassName('yellow')}
                                            onClick={() => {this.onClick('yellow')}}/>
                                        <div className={"colors_button " + this.getClassName('white')}
                                            onClick={() => {this.onClick('white')}}/> 
                                        <div className={"colors_button " + this.getClassName('cyan')}
                                            onClick={() => {this.onClick('cyan')}}/>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={3}
                            className="grid_item_style">
                            <div className="settings_edit_button but_green"
                                onClick={this.save.bind(this)}>
                                SAVE
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    };
}