import { Avatar, Box, ListItem, Stack, Typography } from "@mui/material";
import { Component } from "react";
import { UserAPI } from "../../api/Users.api";
import { UserDto } from '../../api/dto/user.dto'
import './../../style/buttons.css'
import './../../style/display.css'
import './../../style/colors.css'

type UserDisplayProps = {
	user: UserDto;
	index: number;
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

	render ()
	{	
		let description = new Map<number, string>([
			[0, 'unknow'],
			[1, 'offline'],
			[2, 'inactive'],
			[3, 'connected'],
			[4, 'playing']]);
		return (
				<div className={"user b_" + this.getColor(this.props.index % 5)}
				>
					<ListItem 
						key={this.props.user.id}
						secondaryAction	=
						{	
							<Stack spacing={1} direction="row">
								<div	className={"friends_button " + this.getColor(this.state.status)}>
									{description.get(this.state.status)}
								</div>
								
								<div 	className="friends_button white">
									Send Message
								</div>                    
								
								<div	className="friends_button red"
										onClick={this.removeFriend}>
									Remove Friend
								</div>
							
							</Stack>
						}
					>
					<div>
						<Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1}>
								<Avatar variant='circular' alt={this.props.user.login} src={this.props.user.avatar}/>
								<Typography variant="button" color={this.getColor(this.props.index % 5)}>
									<div className='bit9x9'> {this.props.user.login} </div>
								</Typography>
						</Stack>
					</div>
				
				</ListItem>
			</div>
		);
	}
}

// 