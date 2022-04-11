import { Box, Button, ButtonBase, Grid, IconButton, Input, InputBase, List, Stack, TextField, Typography, Avatar } from "@mui/material";
import { Component} from "react";
import { Selecter } from "../gestion_chat/Selecter";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserDisplay } from "../../menu/friends/UserDisplay";
import './../../style/dac.css'
import { red } from "@mui/material/colors";
import GamepadIcon from '@mui/icons-material/Gamepad';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FaceIcon from '@mui/icons-material/Face';
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import '../../style/buttons.css'
import { AddUserChannelDisplay } from "../Channel_info_admin/AddUserChannelDisplay";
import { UserAPI } from "../../api/Users.api";
import { ChatAPI } from "../../api/Chat.api";

let width_button = "90px"

interface CreateChannelProps {
    id?: number;
    updateDisplay: any;
    channel: any;

};

interface CreateChannelState {
    name: string;
    owner?: any;
    visibility: string;
    password?: any;
}
export class CreateChannel extends Component<CreateChannelProps,CreateChannelState> {
	constructor(props: CreateChannelProps) {
		super(props);
		this.state = {name: "", owner: undefined, visibility: "public", password: undefined}
	}

    leslog(){
        console.log(this.state.name);
        console.log(this.state.visibility);
    }
    async Sendchannel() {
        const resp = await UserAPI.getUser();
        // console.log(this.state.name);
        // console.log(resp);
        // console.log(this.state.visibility);

        await ChatAPI.addChannel(this.state.name, resp ,this.state.visibility, [],[], this.state.password);
    }
    render () {
        return (
            <>
                <Selecter updateDisplay={this.props.updateDisplay}  channel={this.props.channel}></Selecter>
                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
                    <IconButton onClick={ () => {this.props.updateDisplay(2);}}>
                        <ArrowBackIcon/>
                    </IconButton>
                </Stack>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={5} sx={{marginTop: 1}}>
                    <Stack justifyContent="center" alignItems="center">
                        <InputBase sx={{width: "480px"}} inputProps={{min: 0, style: { textAlign: 'center' }}} className="input" placeholder="Channel Name" onChange={ async (e) => {this.setState({name: e.target.value})}}/>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                        <ButtonBase centerRipple className="home_button red" onClick={() => {this.setState({visibility: "public"})}}>
                            <Typography variant="button" color='white'>
                                <div className='bit5x5'> Public </div>
                            </Typography>
                        </ButtonBase>
                        <ButtonBase centerRipple className="home_button red" onClick={() => {this.setState({visibility: "private"})}}>
                            <Typography variant="button" color='white'>
                                <div className='bit5x5'> Private </div>
                            </Typography>
                        </ButtonBase>
                        <ButtonBase centerRipple className="home_button red" onClick={() => {this.setState({visibility: "protected"})}}>
                            <Typography variant="button" color='white'>
                                <div className='bit5x5'> Protected </div>
                            </Typography>
                        </ButtonBase>
                    </Stack>
                    <Stack justifyContent="center" alignItems="center">
                        <InputBase sx={{width: "480px"}} inputProps={{min: 0, style: { textAlign: 'center' }}} className="lockinput" placeholder="Password" onChange={ async (e) => {this.setState({password: e.target.value})}}/>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                        <ButtonBase centerRipple className="home_button red" style={{width: "450px", height: '50px', borderRadius: 0, backgroundColor: "red"}} onClick={() => {this.Sendchannel()}}>
                            <Typography variant="button" color='white'>
                                <div className='bit5x5'> Create </div>
                            </Typography>
                        </ButtonBase>
                    </Stack>
                </Stack>
            </>
        )
    }
}