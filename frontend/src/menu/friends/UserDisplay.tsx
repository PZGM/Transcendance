import { Avatar, Box, ListItem, Stack, Typography } from "@mui/material";
import { Component } from "react";
import { UserAPI } from "../../api/Users.api";
import style from './../../style/buttons.module.css'
import './../../asset/fonts/fonts.module.css'

type UserDisplayProps = {
	id: number;
	index: number;
	deleteFriend;
}

interface UserDisplayState {
	status: number;
    avatar?: string;
    login?: string;
}

interface StatusData {
    status: number;
}

export class UserDisplay extends Component<UserDisplayProps, UserDisplayState>{

	eventSource: any;
	_isMounted: boolean;

	constructor(props: UserDisplayProps) {
		super(props);
		this._isMounted = false;
		this.removeFriend = this.removeFriend.bind(this);
		this.state = {status: 0, avatar: undefined, login: undefined}
	}

	removeFriend() {
		UserAPI.removeFriend(this.props.id);
		this.props.deleteFriend(this.props.id);
	}

	async fetchUser() {
			const resp = await UserAPI.getUserById(this.props.id);
			this._isMounted && this.setState({
				status: (resp) ? resp.status : 0,
                avatar: (resp) ? resp.img_url : undefined,
                login: (resp) ? resp.login : undefined,
			})
	}

	componentDidMount()  {
		this._isMounted = true;
		this.fetchUser();
		this.eventSource = new EventSource((process.env.REACT_APP_UPDATE_STATUS as string) + this.props.id, {withCredentials: true});
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
		this._isMounted = false;
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
		return (
				<Box	mr='2px'
						className={style.bdac}
						sx={{	color:'test',
								borderColor: this.getColor(this.props.index % 5)}}
				>
					<ListItem 
					key={this.props.id}
					secondaryAction	={
					<Stack spacing={1} direction="row">
						<div	className={style.button}
								style={{	width: '100px',
											height: '50px',
											backgroundColor: this.getColor(this.state.status)
										}}
						>
							{description.get(this.state.status)}
						</div>
						
						<div 	className={style.button}
								style={{	width: '90px',
											height: '50px',
											backgroundColor: this.getColor(0),
										}}
						>
							Send Message
						</div>                    
						
						<div	className={style.button}
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
								<Avatar variant='circular' alt={this.state.login} src={this.state.avatar}/>
								<Typography variant="button" color={this.getColor(this.props.index % 5)}>
									<div className='bit9x9'> {this.state.login} </div>
								</Typography>
						</Stack>
					</div>
				
				</ListItem>
			</Box>
		);
	}
}

// 