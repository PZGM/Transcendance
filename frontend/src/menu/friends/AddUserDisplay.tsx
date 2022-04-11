import { Avatar, Box, ButtonBase, ListItem, Stack, Typography } from "@mui/material";
import { Component } from "react";
import { UserAPI } from "../../api/Users.api";
import './../../style/buttons.css';
import './../../style/display.css';
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

	render () {
		return (
				<div className={"user b_" + this.getColor(this.props.index % 5)}>
					<ListItem 
					key={this.props.user.id}
					secondaryAction	=
					{
						<Stack spacing={1} direction="row">
							<div onClick={this.addFriend} className="friends_button green">
								<Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1}>
									{(this.state.done) ?
										<DoneIcon sx={{ fontSize: 40, color: 'white', ml: '10px'}}/> :
										<PersonAddIcon sx={{ fontSize: 40, color: 'white', ml: '10px'}}/>
									}
									<Typography variant="button" color='white'>
									<div className='bit5x5'>{(this.state.done) ? 'Added' : 'Add Friend'}</div>
									</Typography>
								</Stack>
							</div>
						</Stack>
					}>
					<ButtonBase centerRipple>
						<Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1}>
								<Avatar variant='circular' alt={this.props.user.login} src={this.props.user.img_url}/>
								<Typography color={this.getColor(this.props.index % 5)}>
									<div className='bit9x9'> {this.props.user.login} </div>
								</Typography>
						</Stack>
					</ButtonBase>
				</ListItem>
			</div>
		);
	}
}

