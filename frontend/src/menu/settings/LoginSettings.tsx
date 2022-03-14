import { Avatar, Button, Grid, IconButton, Input, InputBase, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, Component } from "react";
import { Navigate } from "react-router-dom";
import { UserAPI } from "../../api/Users.api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AvatarEditor from "react-avatar-editor";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from "axios";

type LoginSettingsProps = {
    login?: string,
	updateParentState: any,
};

interface LoginSettingsState {
	input: string;
}

export class LoginSettings extends Component<LoginSettingsProps, LoginSettingsState> {
	constructor(props: LoginSettingsProps) {
		super(props);
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
		this.updateLogin = this.updateLogin.bind(this)
		this.state = {
            input: '',
        }
	}

    handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        const log = e.target.value;
    
        this.setState({
            input: log
        })
    }
    
    async updateLogin() {
        console.log(this.state.input);
        console.log(this.props.login);
        if (this.state.input == this.props.login)
            toast.error("This is already your login", {
                position: toast.POSITION.BOTTOM_CENTER
            })
        else if (this.state.input != '') {
            let isValid = await UserAPI.updateLogin(this.state.input);
            if (isValid)
                this.props.updateParentState({ login: this.state.input });
            else
                toast.error("Invalid new login", {
                    position: toast.POSITION.BOTTOM_CENTER
                })
        }
    }

    render() {
        return (
            <>
                <ToastContainer />
                <Stack direction="row" justifyContent="space-between" alignItems="baseline">
                    <TextField defaultValue={this.props.login} onChange={this.handleChangeLogin} />
                    <Button onClick={this.updateLogin} variant="contained" style={{borderRadius: 0}} >Edit</Button>
                </Stack>
            </>
        )
    }
}
