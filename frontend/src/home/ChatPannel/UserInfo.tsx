
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { Component} from "react";
import { Link } from "react-router-dom";
import { UserAPI } from "../../api/Users.api";
import { UserDto } from "../../api/dto/user.dto"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GamepadIcon from '@mui/icons-material/Gamepad';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FaceIcon from '@mui/icons-material/Face';
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import "../../style/buttons.css"

interface UserInfoState {
	user: UserDto | null;
	login?: any;
	avatar?: string;
	friend: boolean;
	status: number;
	blocked: boolean
}
interface StatusData {
	status: number;
}
interface UserInfoProps {
	params: any,
};

function StatElement(props) {
	return (
		<Stack direction="row"
			justifyContent="space-evenly"
			alignItems="center"
			sx={{width: '90%', fontSize: '1.5vw'}}
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
			blocked: false,
		}
	}

	async getUser() 
	{
		const user = await UserAPI.getUserByLogin(this.props.params.name);
		if (user)
			this.setState({
				user
			})
	}

	async isFriend(){
		if (!this.state.user)
			return;
		const user:UserDto = this.state.user;
		const me = await UserAPI.getMe({withBlocked: true, withFriends: true});
		if (me){
			if (me.friends.some((user) => {return user.id == user.id}))
				this.setState({friend: true})
			else
				this.setState({friend: false});
			if (me.blockedUsers?.some((user) => {return user.id == user.id}))
				this.setState({blocked: true})
			else
				this.setState({blocked: false})
		}
	}

	async toggleBlock() {
		if (!this.state.user)
			return
        if (this.state.blocked)
            await UserAPI.unblockUser(this.state.user.id)
        else
            await UserAPI.blockUser(this.state.user.id);
        this.setState(prevState => ({
			blocked: !prevState.blocked,
		}));
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
		if (this.eventSource)
			this.eventSource.close();
	}

	async changefriend()
	{
		if (!this.state.user)
			return;
		if (this.state.friend === false)
		{				
			let ret = await UserAPI.addFriend(this.state.user.id);
			this.setState({
				friend: true,
			})
		}
		else
		{
			let ret = await UserAPI.removeFriend(this.state.user.id);
			this.setState({
				friend: false,
			})
		}

	}

	render () {
		const IconStyle = {
			width: '2vw',
			height: '2vh'
		}
		let description = new Map<number, string>([
			[0, 'Unknow'],
			[1, 'Offline'],
			[2, 'Inactive'],
			[3, 'Connected'],
			[4, 'Playing']]);
		let action = new Map<number, string>([
			[0, 'Unknow'],
			[1, 'Offline'],
			[2, 'Inactive'],
			[3, 'Play match'],
			[4, 'Watch match']]);
		let colors = new Map<number, string>([
			[0, 'white'],
			[1, 'red'],
			[2, 'yellow'],
			[3, 'green'],
			[4, 'blue']]);
	
		if (!this.state.user || !this.state.user.stats)
			return (
				<div style={{color: 'white'}}>LOADING...</div>
			)
		else
			return (
				<>
					{/* <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0} sx={{marginTop: 1, marginLeft: 1}}>
						<Link className="but_red" style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_MP + this.state.login }}>
							<ArrowBackIcon/>
						</Link>
					</Stack> */}
					<Stack direction="row" justifyContent="space-between" sx={{marginTop: "0.3vh", marginX: "0.2vw"}}>
						<Link className="but_red" style={{ textDecoration: 'none', color: 'white',height: '2vh', width: '1vw', display: "flex", justifyContent: "center", alignItems: "center"}} to={{pathname: process.env.REACT_APP_MP + this.state.login }}>
							<ArrowBackIcon sx={{height: '1.5vh', width: '1vw'}}/>
						</Link>
					</Stack>

					<Stack direction="column" justifyContent="center" alignItems="center" spacing={5}>
						<Avatar sx={{	width: '10.4vw',
										height: '10.4vw'}} variant='circular' alt="" src={this.state.user.avatar}/>
						<div className='backto1982' style={{color: this.state.user.color, fontSize: "2vw"}}>{this.state.login}</div>
						<Stack direction="row" justifyContent="center" alignItems="center">
							<div className='arcade' style={{color: "white", fontSize: "1.5vw"}}> {"Status > "} </div>
							<div className='arcade' style={{color: colors.get(this.state.status), fontSize: "1.5vw"}}> {description.get(this.state.status)} </div>
						</Stack>
						<Stack direction='row' justifyContent="flex-end" alignItems="flex-end" spacing={1} sx={{fontSize: "0.6vw"}}>
							<div className={"home_button but_" + colors.get(this.state.status)} >
								<div className='bit5x5'> {action.get(this.state.status)} </div>
							</div >
							<Link className="home_button but_white" style={{textDecoration: 'none',color: 'white' }} to={{pathname: process.env.REACT_APP_MP + this.state.login}}>
								<div className='bit5x5'> Send Message </div>
							</Link>
							<div className={"home_button but_" + ((this.state.friend) ? "red" : "yellow")}  onClick={() => {this.changefriend()}}>
								{(this.state.friend) ? <div className='bit5x5'> Remove Friend </div> : <div className='bit5x5'> add Friend </div>}
							</div>
							<div className={"home_button but_" + ((this.state.blocked) ? "red" : "yellow")}  onClick={() => {this.toggleBlock()}}>
								{(this.state.blocked) ? <div className='bit5x5'> Unblock user </div> : <div className='bit5x5'> Block user </div>}
							</div>
						</Stack>
						<Box sx={{ p: 1, border: '3px solid grey' }} width="15vw">
							<Stack direction="column" justifyContent="space-evenly" alignItems="center" spacing={2} >
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