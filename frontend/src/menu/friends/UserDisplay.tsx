import { Avatar, Box, ListItem, Stack, Typography } from "@mui/material";
import { Component } from "react";
import { UserAPI } from "../../api/Users.api";
import { UserDto } from '../../api/dto/user.dto'
import './../../style/buttons.css'
import './../../style/display.css'
import './../../style/colors.css'

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
		let description = new Map<number, string>([
			[0, 'unknow'],
			[1, 'offline'],
			[2, 'inactive'],
			[3, 'connected'],
			[4, 'playing']]);

		return (
			<li className={"friend_element bor_red"}
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
						
						<div className={'backto1982 red'}>
							{/* {this.props.user.login} */}
							FMANETTI
						</div>
					
					</Stack>

					<Stack>
						<Stack direction='row'
							flexDirection='row'
							justifyContent="space-between"
							alignItems="center"
							style={{width: '16vw'}}>
							<div	className={"friends_button but_red"}>
								{description.get(this.state.status)}
							</div>
							
							<div 	className="friends_button but_white">
								Send Message
							</div>                    
							
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