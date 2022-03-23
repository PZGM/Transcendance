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


interface UserInfoProps {
    id?: number;
    updateDisplay: any;
};
let width_button = "100px"

export class UserInfo extends Component<UserInfoProps> {

    render () {
        return (
            <>
                <Selecter updateDisplay= {this.props.updateDisplay}></Selecter>
                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
                    <IconButton onClick={ () => {this.props.updateDisplay(0);}}>
                        <ArrowBackIcon/>
                    </IconButton>
                </Stack>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                    <Avatar variant='circular' alt="" src=""/>
                    <Typography variant="h3">
                        <div className='bit9x9'> AFREIRE- </div>
                    </Typography>
                    <Typography variant="button">
                        <div className='bit9x9'> {"Status > Online"} </div>
                    </Typography>
                    <Stack direction='row' justifyContent="flex-end"  alignItems="flex-end" spacing={1}>
                        <ButtonBase centerRipple className={styles.dac} style={{width: width_button, height: '4vh', borderRadius: 0, backgroundColor: "red"}}>
                            <Typography variant="button" color='white'>
                                <div className='bit5x5'> Play Match </div>
                            </Typography>
                        </ButtonBase>
                        <ButtonBase centerRipple className={styles.dac} style={{width: width_button, height: '4vh', borderRadius: 0, backgroundColor: "red"}}>
                            <Typography variant="button" color='white'>
                                <div className='bit5x5'> Send Message </div>
                            </Typography>
                        </ButtonBase>
                        <ButtonBase centerRipple className={styles.dac} style={{width: width_button, height: '4vh', borderRadius: 0, backgroundColor: "red"}}>
                            <Typography variant="button" color='white'>
                                <div className='bit5x5'> remove Friend </div>
                            </Typography>
                        </ButtonBase>
                    </Stack>
                    <Box sx={{ p: 1, border: '3px solid grey' }} width="23vh">
									<Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={2}>

										<Stack direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
											<GamepadIcon />
											<EmojiEventsIcon />
											<FaceIcon />
											<CancelIcon />
											<StarIcon />
										</Stack>

										<Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                                            <Typography  color='white'>
                                                <div className='bit5x5'> games</div>
                                            </Typography>
                                            <Typography color='white'>
                                                <div className='bit5x5'> win </div>
                                            </Typography>
                                            <Typography color='white'>
                                                <div className='bit5x5'> shots </div>
                                            </Typography>
                                            <Typography color='white'>
                                                <div className='bit5x5'> accurancy </div>
                                            </Typography>
                                            <Typography color='white'>
                                                <div className='bit5x5'> rank </div>
                                            </Typography>
										</Stack>

										<Stack direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
											{/* <Typography>{this.state.games}</Typography>
											<Typography>{this.state.win}</Typography>
											<Typography>{this.state.shots}</Typography>
											<Typography>{this.state.accurancy}%</Typography>
											<Typography>{this.state.rank}</Typography> */}
											<Typography>50</Typography>
											<Typography>2</Typography>
											<Typography>40</Typography>
											<Typography>5%</Typography>
											<Typography>1st</Typography>
										</Stack>

									</Stack>
								</Box>

                </Stack>
            </>
        )
    }
}