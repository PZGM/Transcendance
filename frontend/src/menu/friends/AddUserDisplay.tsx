import { Avatar, Box, ButtonBase, ListItem, Stack, Typography } from "@mui/material";
import { Component } from "react";
import { UserAPI } from "../../api/Users.api";
import './../../style/buttons.css';
import './../../style/display.css';
import './../../asset/fonts/fonts.css'
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
				<div className={"user bor_" + this.getColor(this.props.index % 5)}>
					<ListItem 
						key={this.props.user.id}
						secondaryAction	=
						{
							// <Stack direction="row">
								<div className="add_friend_button but_green"
									onClick={this.addFriend}
								>
									<Stack direction='row'
										alignItems="center"
									>
									
										{(this.state.done) ?
											<DoneIcon sx={{ fontSize: 40, color: 'white', ml: '10px'}}/> :
											<PersonAddIcon sx={{ fontSize: 40, color: 'white', ml: '10px'}}/>
										}
										
										<div>
											{(this.state.done) ? 'Added' : 'Add Friend'}
										</div>
									
									</Stack>
								</div>
							// </Stack>
						}
					>
					<Stack direction='row'
						justifyContent="space-between"
						alignItems="center"
						spacing={1}
					>
						<Avatar variant='circular'
							alt={this.props.user.login}
							src={this.props.user.avatar}
						/>
						
						<div className={'backto1982 ' + this.props.user.color}>
							{this.props.user.login}
						</div>
					
					</Stack>

				</ListItem>
			</div>
		);
	}
}

