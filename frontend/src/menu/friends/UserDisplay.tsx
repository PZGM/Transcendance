import { Avatar, Stack } from "@mui/material";
import { Component } from "react";
import { UserAPI } from "../../api/Users.api";
import { UserDto } from '../../api/dto/user.dto'
import './../../style/buttons.css'
import './../../style/display.css'
import './../../style/colors.css'
import { Link } from "react-router-dom";
import { statusEnum } from "../../home/ChatPannel/Chat";

type UserDisplayProps = {
	user: UserDto;
	deleteFriend;
}

interface UserDisplayState {
	status: number;
}

interface StatusData {
    status: number;
}

export class UserDisplay extends Component<UserDisplayProps, UserDisplayState>{

	eventSource: any;

	constructor(props: UserDisplayProps) {
		super(props);
		this.removeFriend = this.removeFriend.bind(this);
		this.state = {status: this.props.user.status}
	}

	removeFriend() {
		UserAPI.removeFriend(this.props.user.id);
		this.props.deleteFriend(this.props.user.id);
	}

	componentDidMount()  {
		this.eventSource = new EventSource((process.env.REACT_APP_UPDATE_STATUS as string) + this.props.user.id, {withCredentials: true});
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

	componentWillUnmount() {
		this.eventSource.close();
	}

	render ()
	{	
		let colors = new Map<number, string>([
			[0, 'white'],
			[1, 'red'],
			[2, 'yellow'],
			[3, 'green'],
			[4, 'blue'],
			[5, 'cyan'],
			[6, 'violet']]);

		return (
			<li className={"friend_element bor_" + this.props.user.color}
				key={this.props.user.id}>
				<Stack direction='row'
					justifyContent='space-between'
					style={{width: '100%'}}
				>
					<Stack direction='row'
						justifyContent="space-between"
						alignItems="center"
						style={{width: '10vw'}}
					>
						<Avatar variant='circular'
							src={this.props.user.avatar}
							style={{height: '2.7vw', width: '2.7vw'}}
						/>
						<div className={'backto1982 ' + this.props.user.color}>
							{this.props.user.login}
						</div>
					
					</Stack>

					<Stack>
						<Stack direction='row'
							flexDirection='row'
							justifyContent="space-between"
							alignItems="center"
							style={{width: '16vw'}}>
							<div className={"friends_button but_" + colors.get(this.state.status)}>
								{statusEnum[this.state.status]}
							</div>
							<Link className="friends_button but_blue" style={{textDecoration: 'none'}} to={{pathname: process.env.REACT_APP_MP + this.props.user.login}}>
                                <div className='bit5x5'> Send Message </div>
                            </Link>
							<div	className="friends_button but_red"
									onClick={this.removeFriend}>
								Remove Friend
							</div>
						
						</Stack>
					</Stack>
				</Stack>
			</li>
		);
	}
}

// 