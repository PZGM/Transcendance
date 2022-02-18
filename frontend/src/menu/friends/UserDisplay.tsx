import { Avatar, Box, Button, ButtonGroup, ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton, Stack, Typography } from "@mui/material";
import { Component } from "react";
import { UserAPI } from "../../api/Users.api";
import { MiniStatus } from "../../asset/MiniStatus";
import styles from './../../style/dac.module.css'
import './../../asset/fonts/Fonts.css'

type UserDisplayProps = {
	id: number;
	index: number;
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

	constructor(props: UserDisplayProps) {
		super(props);
		this.state = {status: 0, avatar: undefined, login: undefined}
	}

	async fetchUser() {
		try {
			const resp = await UserAPI.getUserById(this.props.id);
			this.setState({
				status: (resp) ? resp.status : 0,
                avatar: (resp) ? resp.img_url : undefined,
                login: (resp) ? resp.login : undefined,
			})
		}
		catch (e) {
			console.log('hey salut');
		}

	}

	componentDidMount()  {
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
			[1, 'disco'],
			[2, 'inactive'],
			[3, 'connected'],
			[4, 'playing']]);
		return (
			<Box mr='2px' className={styles.bdac} sx={{borderColor: this.getColor(this.props.index % 5)}}>
            <ListItem 
            key={this.props.id}
			secondaryAction	={
			<Stack spacing={1} direction="row">
				<Button className={styles.dac} style={{width: '120px', height: '50px', borderRadius: 0, backgroundColor: this.getColor(this.state.status)}}>
					<Typography variant="button" color='white'>
					<div className='bit5x5'> {description.get(this.state.status)} </div>
					</Typography>
				</Button>
				<Button className={styles.dac} style={{width: '80px', height: '50px', borderRadius: 0, backgroundColor:'grey'}} >
				<Typography variant="button" color='white'>
					<div className='bit5x5'> Send Message </div>
					</Typography>
				</Button>                    
				<Button className={styles.dac} style={{width: '80px', height: '50px', borderRadius: 0, backgroundColor:'red'}} >
					<Typography variant="button" color='white'>
					<div className='bit5x5'> Remove Friend </div>
					</Typography>
				</Button>
			</Stack>
			}>
			<Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1} >
				<Avatar variant='circular' alt={this.state.login} src={this.state.avatar}/>
				<Typography variant="button" color='white'>
					<div className='bit9x9'> {this.state.login} </div>
				</Typography>
			</Stack>
        </ListItem>
		 </Box>
		);
	}
}