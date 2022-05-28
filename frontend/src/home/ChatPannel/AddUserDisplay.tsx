import { Avatar, Stack } from "@mui/material";
import { Component } from "react";
import './../../style/buttons.css';
import './../../style/display.css';
import './../../asset/fonts/fonts.css'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DoneIcon from '@mui/icons-material/Done';
import { UserDto } from "../../api/dto/user.dto";
import { ChatAPI } from "../../api/Chat.api";
import { toast } from "react-toastify";


type AddUserDisplayProps = {
	user: UserDto;
	channelId: number;
	addUser: any;
}

interface AddUserDisplayState {
	done: boolean;
}

export class AddUserDisplay extends Component<AddUserDisplayProps, AddUserDisplayState>{

	eventSource: any;

	constructor(props: AddUserDisplayProps) {
		super(props);
		this.addUser = this.addUser.bind(this);
		this.state = {done: false}
	}

	async addUser() {
		if (this.state.done)
			return;
		if (await ChatAPI.inviteUser(this.props.channelId, this.props.user.id))
		{
			this.setState({done: true});
			this.props.addUser(this.props.user);
		}
		else
		toast.error("Can't invite this user", {
			position: toast.POSITION.BOTTOM_CENTER,
			pauseOnHover: false,
			closeOnClick: true,
		})
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
							onClick={this.addUser}
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
									{(this.state.done) ? 'Added' : 'Add User'}
								</div>
							
							</Stack>
						</div>
					</Stack>
				</Stack>
			</li>
		);
	}
}

