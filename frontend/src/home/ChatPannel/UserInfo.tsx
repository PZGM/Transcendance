import { Avatar, Box, ButtonBase, IconButton, Stack, Typography } from "@mui/material";
import { Component} from "react";
import { Link, Navigate } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";
import { UserAPI } from "../../api/Users.api";
import { UserDto } from "../../api/dto/user.dto"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GamepadIcon from '@mui/icons-material/Gamepad';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FaceIcon from '@mui/icons-material/Face';
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import "../../style/buttons.css"
import ReturnButton from "./tools/ReturnButton";

interface UserInfoState {
    user: UserDto | null;
    login?: any;
    avatar?: string;
    friend: boolean;
    status: number;
}
interface StatusData {
    status: number;
}
interface UserInfoProps {
    params: any,
};

let width_button = "100px"

function StatElement(props) {
	return (
		<Stack direction="row"
			justifyContent="space-between"
            alignItems="center"
        	sx={{width: '80%', fontSize: 'calc(1vw)'}}
			className={"bit9x9 " + props.color} >
			<div>{props.logo}</div>
			<div>{props.name}</div>
			<div>{props.data}</div>
		</Stack>
	)
}
export class UserInfo extends Component<UserInfoProps, UserInfoState> {
    eventSource: any;

	constructor(props: UserInfoProps) {
		super(props);
        this.state = {
            user: null,
            login: "",
            friend: false,
            status: 0,
        }
	}

    async getUser() 
    {
        const user = await UserAPI.getUserByLogin(this.props.params.name);
        if (user)
            this.setState({
                user
            })
        console.log(user?.stats)
    }

    async isFriend(){
        const friends = await UserAPI.getFriends();
        const me = await UserAPI.getUser();
        if (me){
            if (friends.find(user => user.login === me.login) == undefined)
                this.setState({friend: false})
            else
            this.setState({friend: true})
        }
    }

	async componentDidMount()  {
        await this.getUser();
        await this.isFriend();

        const name = this.props.params.name;
        this.setState({
            login: name,
        })
        if (this.state.user){
            this.eventSource = new EventSource((process.env.REACT_APP_UPDATE_STATUS as string) + this.state.user.id, {withCredentials: true});
            this.eventSource.onmessage = (e: { data: string; }) => {
                console.log("salut je suis dans l'event")
                console.log(e.data)
                let jsonObj: any = JSON.parse(e.data);
                let status: StatusData = jsonObj as StatusData;
                if (status.status < 0 || status.status > 4)
                    status.status = 0;
                this.setState({
                    status: status.status,
                })
            };
            this.eventSource.onerror = (e: any) => {
                this.setState({
                    status: 0,
                })
            }
        }

	}

	componentWillUnmount() {
		this.eventSource.close();
	}

    async changefriend()
    {
        if (this.state.friend == false)
        {
            if (this.state.user){
                const ret = await UserAPI.addFriend(this.state.user.id);
                this.setState({
                    friend: true,
                })
            }
        }
        else
        {
            if (this.state.user){
                UserAPI.removeFriend(this.state.user.id);
                this.setState({
                    friend: false,
                })
            }
        }

    }

	render () {
        const IconStyle = {
			width: '1vw',
			height: '1vw'
		}
		let description = new Map<number, string>([
			[0, 'unknow'],
			[1, 'offline'],
			[2, 'inactive'],
			[3, 'connected'],
			[4, 'playing']]);

        if (!this.state.user || !this.state.user.stats)
			return (
				<div style={{color: 'white'}}>LOADING...</div>
			)
		else
            return (
                <>
                    <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
                        <Link 	style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_MP + this.state.login }}>
                            <ArrowBackIcon/>
                        </Link>
                    </Stack>
                    <Stack direction="column" justifyContent="center" alignItems="center" spacing={5}>
                        <Avatar sx={{	width: '10.4vw',
										height: '10.4vw'}} variant='circular' alt="" src={this.state.user.avatar}/>
                        <Typography variant="h3" color="white">
                            <div className='bit9x9'>{this.state.login}</div>
                        </Typography>
                        <Typography variant="h4" color="white">
                            <div className='bit9x9'> {"Status > "+ description.get(this.state.status)} </div>
                        </Typography>
                        <Stack direction='row' justifyContent="flex-end"  alignItems="flex-end" spacing={1}>
                            <div className="home_button but_red" >
                                <div className='bit5x5'> Play Match </div>
                            </div >
                            <Link className="home_button but_red" style={{textDecoration: 'none',color: 'white' }} to={{pathname: process.env.REACT_APP_MP + this.state.login}}>
                                <div className='bit5x5'> Send Message </div>
                            </Link>
                            <div className="home_button but_red"  onClick={() => {this.changefriend()}}>
                                {(this.state.friend) ? <div className='bit5x5'> Remove Friend </div> : <div className='bit5x5'> add Friend </div>}
                            </div>
                        </Stack>
                        <Box sx={{ p: 1, border: '3px solid grey' }} width="23vh">
                            <Stack direction="column" justifyContent="space-evenly" alignItems="center" spacing={2}>
                                <StatElement color="red" logo={<GamepadIcon style={IconStyle}/>} name="games" data={this.state.user.stats.games} />
                                <StatElement color="green" logo={<EmojiEventsIcon style={IconStyle}/>} name="wins" data={this.state.user.stats.gameWins} />
                                <StatElement color="blue" logo={<FaceIcon style={IconStyle}/>} name="avg_time" data={this.state.user.stats.durationAverage} />
                                <StatElement color="violet" logo={<CancelIcon style={IconStyle}/>} name="winrate" data={this.state.user.stats.victoryRate} />
                                <StatElement color="cyan" logo={<StarIcon style={IconStyle}/>} name="elo_score" data={this.state.user.stats.eloScore} />
                                <StatElement color="yellow" logo={<StarIcon style={IconStyle}/>} name="rank" data={this.state.user.stats.rank} />
                            </Stack>
                        </Box>
                    </Stack>
                    </>

            )
	}
}