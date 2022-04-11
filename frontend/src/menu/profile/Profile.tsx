import { Avatar, Box, Stack, Grid, Typography } from "@mui/material";
import { Component } from "react";
import GamepadIcon from '@mui/icons-material/Gamepad';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FaceIcon from '@mui/icons-material/Face';
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import { Helmet } from "react-helmet";
import { UserAPI } from "../../api/Users.api";
import Menu from "../Menu";

type ProfileProps = {
};


interface ProfileState {
	games: number,
	win: number,
	shots: number,
	accurancy: number,
	rank: number,
	login?: string,
	avatar?: string,
};

export class Profile extends Component<ProfileProps, ProfileState> {
	constructor(props: ProfileProps) {
		super(props);
		this.state = {games: 0, win: 0, shots: 0, accurancy: 0, rank: 0, login: undefined, avatar: undefined}
	}

	async fetchProfile() {
		const resp = await UserAPI.getProfile();
		const user = await UserAPI.getUser();
		this.setState({
			games: resp.games,
			win: resp.win,
			shots: resp.shots,
			accurancy: resp.accurancy,
			rank: resp.rank,
			login: user.login,
			avatar: user.avatar
		})
	}

	componentDidMount()  {
		this.fetchProfile();
	}

	render (){
		return(
			<Grid container direction="column" justifyContent="center" alignItems="center">
				{/* <Avatar  variant='circular' alt="Semy Sharp" src="/static/images/avatar/1.jpg" sx={{diaplay:"flex"}}/> */}
				<Avatar  variant='circular' alt="Semy Sharp" src={this.state.avatar} sx={{diaplay:"flex"}}/>
				{/* <Typography align="center">AFREIRE-</Typography> */}
				<Typography align="center">{this.state.login}</Typography>
				<Box sx={{ p: 1, border: '3px solid grey' }}  width="100% - 2">
					<Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={2}>

						<Stack direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
							<GamepadIcon />
							<EmojiEventsIcon />
							<FaceIcon />
							<CancelIcon />
							<StarIcon />
						</Stack>

						<Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={2}>
							<Typography>GAMES</Typography>
							<Typography>WIN</Typography>
							<Typography>SHOTS</Typography>
							<Typography>ACCURANCY</Typography>
							<Typography>RANK</Typography>
						</Stack>

						<Stack direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
							<Typography>50</Typography>
							<Typography>2</Typography>
							<Typography>40</Typography>
							<Typography>5%</Typography>
							<Typography>1st</Typography>
						</Stack>

					</Stack>
				</Box>
			</Grid>
		);
	};
}

