import { ListSubheader, Avatar, Box, Button, ButtonBase, ButtonGroup, ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton, Stack, Typography } from "@mui/material";
import { Component } from "react";
import { UserAPI } from "../../api/Users.api";
import { MiniStatus } from "../../asset/MiniStatus";
import styles from './../../style/dac.module.css'
import './../../asset/fonts/Fonts.css'

type AddUserDisplayProps = {
	id: number;
	index: number;
	addFriend;
}

interface AddUserDisplayState {
    avatar?: string;
    login?: string;
}

export class AddUserDisplay extends Component<AddUserDisplayProps, AddUserDisplayState>{
	addFriend() {
		UserAPI.addFriend(this.props.id);
		this.props.addFriend(this.props.id);
	}

	eventSource: any;

	constructor(props: AddUserDisplayProps) {
		super(props);
		this.addFriend = this.addFriend.bind(this);
		this.state = {avatar: undefined, login: undefined}
	}

	async fetchUser() {
		try {
			const resp = await UserAPI.getUserById(this.props.id);
			this.setState({
                avatar: (resp) ? resp.img_url : undefined,
                login: (resp) ? resp.login : undefined,
			})
		}
		catch (e) {
			console.log(e);
		}

	}

	componentDidMount()  {
		this.fetchUser();
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
		return (
				<Box mr='2px' className={styles.bdac} sx={{color:'test', borderColor: this.getColor(this.props.index % 5)}}>
					<ListItem 
					key={this.props.id}
					secondaryAction	={
					<Stack spacing={1} direction="row">
					
						<ButtonBase onClick={this.addFriend} centerRipple className={styles.dac} style={{width: '80px', height: '50px', borderRadius: 0, backgroundColor:this.getColor(3)}} >
							<Typography variant="button" color='white'>
							<div className='bit5x5'> Add Friend </div>
							</Typography>
						</ButtonBase>
					</Stack>
					}>
					<ButtonBase centerRipple>
						<Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1}>
								<Avatar variant='circular' alt={this.state.login} src={this.state.avatar}/>
								<Typography variant="button" color={this.getColor(this.props.index % 5)}>
									<div className='bit9x9'> {this.state.login} </div>
								</Typography>
						</Stack>
					</ButtonBase>
				</ListItem>
			</Box>
		);
	}
}