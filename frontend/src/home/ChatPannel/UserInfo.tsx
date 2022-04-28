import { Avatar, Box, ButtonBase, IconButton, Stack, Typography } from "@mui/material";
import { Component} from "react";
import { Link, Navigate } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";
import { UserAPI } from "../../api/Users.api";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GamepadIcon from '@mui/icons-material/Gamepad';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FaceIcon from '@mui/icons-material/Face';
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import "../../style/buttons.css"

interface UserInfoState {
    user?: any
    login?: string;
    avatar?: string;
    friend: boolean;
}


interface UserInfoProps {
    params: any,
};

let width_button = "100px"

export class UserInfo extends Component<UserInfoProps, UserInfoState> {
	constructor(props: UserInfoProps) {
		super(props);
        this.state = {
            user: undefined,
            friend: false,
        }
	}

	componentDidMount()  {
        const id = this.props.params.name;
        // if (this.props.isPrivateMessage)
        //     chanId = getPrivateMessageChannel(id);
        // else
        this.setState({
            user: id,
        })
	}

// TODO faire un getuserbylogin pour recup la photo , le status et les stats

    changefriend()
    {
        {/* TODO faire une ternaire pour savoir si c'est un ami ou pas et donc l'ajouter ou le remove */}

        console.log("je suis dedans")
        if (this.state.friend == false)
        {
            this.setState({
                friend: true,
            })
        }
        else
        {
            this.setState({
                friend: false,
            })
        }

    }

//TODO need a get user grace a l'id et puis apres on use le user et c'est fini (voir aussi les stats de fabrizio pour avoir les bon truc)

	render () {

		return (
            <>
                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
                    <Link 	style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_MP + this.state.user }}>
                        <ArrowBackIcon/>
					</Link>
                </Stack>
                <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                    <Avatar variant='circular' alt="" src=""/>
                    {/* <Avatar variant='circular' alt="" src={}/> */}
                    <Typography variant="h3" color="white">
                        <div className='bit9x9'>{this.state.user}</div>
                    </Typography>
                    <Typography variant="button" color="white">
                        <div className='bit9x9'> {"Status > Online"} </div>
                    </Typography>
                    <Stack direction='row' justifyContent="flex-end"  alignItems="flex-end" spacing={1}>
                        <div className="home_button but_red" >
                            <div className='bit5x5'> Play Match </div>
                        </div >
                        {/*  <ButtonBase centerRipple className="home_button" style={{width: width_button, height: '4vh', borderRadius: 0, backgroundColor: "red"}}> */}
                        <Link className="home_button but_red" style={{textDecoration: 'none',color: 'white' }} to={{pathname: process.env.REACT_APP_MP + this.state.user}}>
                            <div className='bit5x5'> Send Message </div>
                        </Link>
                        {/* <ButtonBase centerRipple  className="home_button but_red" style={{width: width_button, height: '4vh', borderRadius: 0, backgroundColor: "red"}} onClick={() => {this.changefriend()}}> */}
                        <div className="home_button but_red"  onClick={() => {this.changefriend()}}>
                            {(this.state.friend) ? <div className='bit5x5'> Add Friend </div> : <div className='bit5x5'> remove Friend </div>}
                        </div>
                    </Stack>
                    <Box sx={{ p: 1, border: '3px solid grey' }} width="23vh">
                        <Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={2}>
                            <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={2} sx={{ color: "white" }}>
                                <GamepadIcon/>
                                <EmojiEventsIcon />
                                <FaceIcon />
                                <CancelIcon />
                                <StarIcon />
                            </Stack>

                            <Stack direction="column" justifyContent="center" alignItems="center" spacing={2} sx={{ color: "white" }}>
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

                            <Stack direction="column" justifyContent="space-between" alignItems="center" spacing={2} sx={{ color: "white" }}>
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