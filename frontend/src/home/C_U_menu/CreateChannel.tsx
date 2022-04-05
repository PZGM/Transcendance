import { Box, Button, ButtonBase, Grid, IconButton, Input, InputBase, List, Stack, TextField, Typography, Avatar } from "@mui/material";
import { Component} from "react";
import { Selecter } from "../gestion_chat/Selecter";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserDisplay } from "../../menu/friends/UserDisplay";
import styles from './../../style/dac.module.css'
import { red } from "@mui/material/colors";
import GamepadIcon from '@mui/icons-material/Gamepad';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FaceIcon from '@mui/icons-material/Face';
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import buttons from '../../style/buttons.module.css'

let width_button = "90px"

interface CreateChannelProps {
    id?: number;
    updateDisplay: any;
};

export class CreateChannel extends Component<CreateChannelProps> {

    render () {
        return (
            <>
                <Selecter updateDisplay={this.props.updateDisplay}></Selecter>
                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
                    <IconButton onClick={ () => {this.props.updateDisplay(2);}}>
                        <ArrowBackIcon/>
                    </IconButton>
                </Stack>
                <Stack>
                    <Typography>Name</Typography>
                    <ButtonBase centerRipple className={buttons.button} style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
                        <Typography variant="button" color='white'>
                            <div className='bit5x5'> Public </div>
                        </Typography>
                    </ButtonBase>
                    <ButtonBase centerRipple className={buttons.button} style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
                        <Typography variant="button" color='white'>
                            <div className='bit5x5'> Private </div>
                        </Typography>
                    </ButtonBase>
                    <ButtonBase centerRipple className={buttons.button} style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
                        <Typography variant="button" color='white'>
                            <div className='bit5x5'> Protected </div>
                        </Typography>
                    </ButtonBase>

                </Stack>
            </>
        )
    }
}