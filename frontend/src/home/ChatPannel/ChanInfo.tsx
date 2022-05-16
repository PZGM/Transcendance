import { Stack, List } from "@mui/material";
import { Component} from "react";
import { Link, Navigate } from "react-router-dom";
import { UserAPI } from "../../api/Users.api";
import RenderRows from "./tools/RenderRows";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { UserDto } from "../../api/dto/user.dto";
import { ChatAPI } from "../../api/Chat.api";

interface ChanInfoState {
	chan?: any;
	friends: any;
	redirect: string;
}

interface ChanInfoProps {
	params: any,
};

let height_Box_Admin = "20vh"
// let height_Box_Users = "50vh"
let height_Box_Users = "60vh"

export class ChanInfo extends Component<ChanInfoProps, ChanInfoState> {
	index:number = 0;

	constructor(props: ChanInfoProps) {
		super(props);
		this.state = {
			chan: undefined,
			friends: [],
			redirect: '',
		}
		this.deleteFriend = this.deleteFriend.bind(this);
		this.addFriend = this.addFriend.bind(this);
	}

// TODO il faut recup les info du chan grace a un getchannelbyid et une fois fais peut etre revoir renderrows pour voir ce que ca donne
	getColor(status: number): string | undefined
	{
		let colors = new Map<number, string>([
			[0, 'white'],
			[1, 'red'],
			[2, 'yellow'],
			[3, 'green'],
			[4, 'blue']]);

		return colors.get(status)
	}

	componentDidMount()  {
		const id = this.props.params.name;
		// if (this.props.isPrivateMessage)
		//     chanId = getPrivateMessageChannel(id);
		// else
		this.setState({
			chan: id,
		})
	}

	async addFriend(user: UserDto) {
		await UserAPI.addFriend(user.id);
		let newFriends: UserDto[] = this.state.friends;
		newFriends.push(user);
		this.setState({
			friends: newFriends
		}); 
	}

	deleteFriend(duser: UserDto) {
		UserAPI.removeFriend(duser.id);
		const newFriends: UserDto[] = this.state.friends.filter((user) => {
			return user.id !== duser.id;
		});

		this.setState({
			friends: newFriends
		});
	}

	renderRowsAdmins(list) {
		list=[1,1,1,1,1,11,1,1,1,1,1,11,1,1,1,1,1,11,1,1,1,1,1,11,1]
		const listItems = list?.map((admin: UserDto) =>
		<li key={admin.id}>
			<RenderRows index={this.index++} getColor={this.getColor} user={admin}  third_button="REMOVE FRIEND" ></RenderRows>
		</li>
	  );
	  return listItems;
	}

	renderRowsUsers(list) {
		list=[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
		const listItems = list?.map((user: UserDto) =>
		<li key={user.id}>
			<RenderRows index={this.index++} getColor={this.getColor} user={user} first_button="WATCH MATCH" second_button="SEND MESSAGE" third_button="REMOVE FRIEND"></RenderRows>
		</li>
	  );
	  return listItems;
	}

	async leave() {
		await ChatAPI.leaveChannel(this.state.chan);
		this.setState({
			redirect: '/home'
		})
	}

	render () {

		return (
			<>
			    { this.state.redirect ? (<Navigate to={this.state.redirect} />) : null }
				<Stack direction="row" justifyContent="space-between">
					<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
						<Link 	style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.chan }}>
							<ArrowBackIcon/>
						</Link>
					</Stack>
{/* TODO faire une ternaire pour savoir s'il est admin afin d'afficher l'icone */}
					{ (false) ? <></> :<Stack direction="column" justifyContent="center" alignItems="flex-end" spacing={0}>
						<Link 	style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.chan + "/edit" }}>
							<AddIcon/>
						</Link>
					</Stack>}
				</Stack>
				<Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
						{/* <div className='bit5x5'> {(this.props.channel) ? this.props.channel.name : '...'} </div> */}
						{/* <Typography variant="h1" color='white'> */}
							<div className="bit9x9" style={{color: "white", fontSize: "2.5vw"}}>{this.state.chan}</div>
						{/* </Typography> */}
				</Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<div className="bit5x5" style={{color: "white"}}>ADMINS :</div>
					<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} height={height_Box_Admin}>
						<List style={{overflow: 'auto'}}>
							{this.renderRowsAdmins([])}
{/* TODO envoyer le state admin du channel */}
							{/* {this.renderRows(this.state.friends)} */}
						</List>
					</Stack>
				</Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<div className="bit5x5" style={{color: "white"}}>USERS :</div>
					<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} height={height_Box_Users}>
						<List style={{ overflow: 'auto'}}>
							{this.renderRowsUsers([])}
{/* TODO envoyer le state user du channel */}
							{/* {this.renderRows(this.state.friends)} */}
						</List>
					</Stack>
				</Stack>
				<Stack justifyContent="center" alignItems="center" sx={{marginTop: "0.5vh" }}>
					<div onClick={this.leave} className="add_user_button but_red" >
						<div className='bit5x5'>Leave</div>
					</div>
				</Stack>
			</>

		)
	}
}