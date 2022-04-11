import { Avatar, Box, ButtonBase, ListItem, Stack, Typography } from "@mui/material";
import { Component } from "react";
import { UserAPI } from "../../api/Users.api";
import styles from './../../style/dac.module.css'
import './../../asset/fonts/fonts.module.css'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DoneIcon from '@mui/icons-material/Done';
import { UserDto } from "../../api/dto/user.dto";


type AddUserDisplayProps = {
	user: UserDto;
	index: number;
	addFriend;
}

interface AddUserDisplayState {
	done: boolean;
}

export class AddUserDisplay extends Component<AddUserDisplayProps, AddUserDisplayState>{

	eventSource: any;

	constructor(props: AddUserDisplayProps) {
		super(props);
		this.addFriend = this.addFriend.bind(this);
		this.state = {done: false}
	}

	async addFriend() {
		if (this.state.done)
			return;
		this.setState({done: true});
		let ret = await UserAPI.addFriend(this.props.user.id);
		this.props.addFriend(this.props.user);
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
					key={this.props.user.id}
					secondaryAction	={
					<Stack spacing={1} direction="row">
						<ButtonBase onClick={this.addFriend} centerRipple className={styles.button} style={{width: '140px', height: '50px', borderRadius: 0, backgroundColor:this.getColor(3)}} >
							<Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1}>
								{(this.state.done) ?
									<DoneIcon sx={{ fontSize: 40, color: 'white', ml: '10px'}}/> :
									<PersonAddIcon sx={{ fontSize: 40, color: 'white', ml: '10px'}}/>
								}
								<Typography variant="button" color='white'>
								<div className='bit5x5'>{(this.state.done) ? 'Added' : 'Add Friend'}</div>
								</Typography>
							</Stack>
						</ButtonBase>
					</Stack>
					}>
					<ButtonBase centerRipple>
						<Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1}>
								<Avatar variant='circular' alt={this.props.user.login} src={this.props.user.avatar}/>
								<Typography variant="button" color={this.getColor(this.props.index % 5)}>
									<div className='bit9x9'> {this.props.user.login} </div>
								</Typography>
						</Stack>
					</ButtonBase>
				</ListItem>
			</Box>
		);
	}
}

