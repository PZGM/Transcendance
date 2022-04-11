import { Avatar, Box, ListItem, Stack, Typography } from "@mui/material";
import { Component } from "react";
import { UserAPI } from "../../api/Users.api";
import { UserDto } from '../../api/dto/user.dto'
import styles from './../../style/buttons.module.css'
import './../../asset/fonts/fonts.module.css'

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

	getColor(status: number) {
		let colors = new Map<number, string>([
			[0, 'grey'],
			[1, 'red'],
			[2, 'yellow'],
			[3, 'green'],
			[4, 'blue']]);
		return getComputedStyle(document.documentElement).getPropertyValue(`--${colors.get(status)}`)
	}

	render () {
		let description = new Map<number, string>([
			[0, 'unknow'],
			[1, 'offline'],
			[2, 'inactive'],
			[3, 'connected'],
			[4, 'playing']]);
			console.log(`index = ${this.props.index}`);
			console.log(`chibre = ${this.props.index % 5}`);	
			console.log(`color = ${this.getColor(this.props.index % 5)}`);
		return (
			<Box mr='2px' className={styles.bdac} sx={{borderColor: this.getColor(this.props.index % 5)}}>
					<ListItem 
					key={this.props.user.id}
					secondaryAction	={
					<Stack spacing={1} direction="row">
						<div	className={styles.button}
								style={{	width: '100px',
											height: '50px',
											backgroundColor: this.getColor(this.state.status)
										}}
						>
							{description.get(this.state.status)}
						</div>
						
						<div 	className={styles.button}
								style={{	width: '90px',
											height: '50px',
											backgroundColor: this.getColor(0),
										}}
						>
							Send Message
						</div>                    
						
						<div	className={styles.button}
								onClick={this.removeFriend}
								style={{	width: '90px',
											height: '50px',
											backgroundColor: this.getColor(1),
										}}
						>
							Remove Friend
						</div>
					
					</Stack>
					}>
					
					<div>
						<Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1}>
								<Avatar variant='circular' alt={this.props.user.login} src={this.props.user.avatar}/>
								<Typography variant="button" color={this.getColor(this.props.index % 5)}>
									<div className='bit9x9'> {this.props.user.login} </div>
								</Typography>
						</Stack>
					</div>
				
				</ListItem>
			</Box>
		);
	}
}

// 