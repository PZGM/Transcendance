import { Avatar, Box, ButtonBase, ListItem, Stack, Typography } from "@mui/material";
import { Component } from "react";
import { UserAPI } from "../../api/Users.api";
import './../../style/dac.css'
import './../../asset/fonts/fonts.module.css'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DoneIcon from '@mui/icons-material/Done';


type AddUserChannelDisplayProps = {
	id: number;
	index: number;
	addFriend;
}

interface AddUserChannelDisplayState {
    avatar?: string;
    login?: string;
	done: boolean;
}

export class AddUserChannelDisplay extends Component<AddUserChannelDisplayProps, AddUserChannelDisplayState>{

	eventSource: any;
	_isMounted: boolean;

	constructor(props: AddUserChannelDisplayProps) {
		super(props);
		this._isMounted = false;
		this.addFriend = this.addFriend.bind(this);
		this.state = {avatar: undefined, login: undefined, done: false}
	}

	async fetchUser() {
		const resp = await UserAPI.getUserById(this.props.id);
		this._isMounted && this.setState({
			avatar: (resp) ? resp.avatar : undefined,
			login: (resp) ? resp.login : undefined,
		})

	}

	async addFriend() {
		if (this.state.done)
			return;
		this.setState({done: true})
		let ret = await UserAPI.addFriend(this.props.id);
		console.log(ret);
		this.props.addFriend(this.props.id);
	}

	componentDidMount()  {
		this._isMounted = true;
		this.fetchUser();
	}

	componentWillUnmount() {
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
		return (
				<Box width="480px" mr='2px' className="bdac" sx={{color:'test', borderColor: this.getColor(this.props.index % 5)}}>
					<ListItem 
					key={this.props.id}
					secondaryAction	={
					<Stack spacing={1} direction="row">
						<ButtonBase onClick={this.addFriend} centerRipple className="button" style={{width: '140px', height: '50px', borderRadius: 0, backgroundColor:this.getColor(3)}} >
							<Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1}>
								{(this.state.done) ?
									<DoneIcon sx={{ fontSize: 40, color: 'white', ml: '10px'}}/> :
									<PersonAddIcon sx={{ fontSize: 40, color: 'white', ml: '10px'}}/>
								}
								<Typography variant="button" color='white'>
								<div className='bit5x5'>{(this.state.done) ? 'Added' : 'Add to Channel'}</div>
								</Typography>
							</Stack>
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

