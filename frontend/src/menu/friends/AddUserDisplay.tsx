import { Avatar, Stack } from "@mui/material";
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
	addFriend: any;
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
		await UserAPI.addFriend(this.props.user.id);
		this.props.addFriend(this.props.user);
	}

	render ()
	{
		const IconStyle = {
			fontSize: '2vw',
			color: 'white'
		}

		return (
			<li className={"user search_element bor_" + this.props.user.color}
				key={this.props.user.id}>
				<Stack direction='row'
					justifyContent='space-between'
					style={{width: '100%'}}
				>
					<Stack direction='row'
						justifyContent="space-between"
						alignItems="center"
						spacing={1}
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
						<div className="add_friend_button but_green"
							onClick={this.addFriend}
						>
							<Stack direction='row'
								alignItems="center"
								justifyContent="space-evenly"
							>
							
								{(this.state.done) ?
									<DoneIcon sx={IconStyle}/> :
									<PersonAddIcon sx={IconStyle}/>
								}
								
								<div style={{width: '50%'}}>
									{(this.state.done) ? 'Added' : 'Add Friend'}
								</div>
							
							</Stack>
						</div>
					</Stack>
				</Stack>
			</li>
		);
	}
}

