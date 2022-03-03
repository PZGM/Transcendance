import { Avatar, Box, Stack, Grid, Typography } from "@mui/material";
import { Component } from "react";
import GamepadIcon from '@mui/icons-material/Gamepad';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FaceIcon from '@mui/icons-material/Face';
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import { Helmet } from "react-helmet";
import { UserAPI } from "../../api/Users.api";
import MenuButton from "../MenuButton";

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
			avatar: user.img_url
		})
	}

	componentDidMount()  {
		this.fetchProfile();
	}

	render (){
		return(
			<div>
				<Helmet>
					<style>{'body { background-color: black; }'}</style>
				</Helmet>

				<Box m="10%" p="10px" display="flex" width="100% - 3px" maxHeight="100% - 3px" bgcolor="white" sx={{border: '3px solid grey' }}>
					<Grid container direction="row-reverse"   justifyContent="space-between"  alignItems="stretch">
						<Box width="25%">
							<MenuButton/>
						</Box>
						<Box width="70%">
							<Grid container direction="column" justifyContent="center" alignItems="center">
								{/* <Avatar  variant='circular' alt="Semy Sharp" src="/static/images/avatar/1.jpg" sx={{diaplay:"flex"}}/> */}
								<Avatar  variant='circular' alt="Semy Sharp" src={this.state.avatar} sx={{diaplay:"flex"}}/>
								{/* <Typography align="center">AFREIRE-</Typography> */}
								<Typography align="center">{this.state.login}</Typography>
								<Box sx={{ p: 1, border: '3px solid grey' }}  width="100%">
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
											{/* <Typography>{this.state.games}</Typography>
											<Typography>{this.state.win}</Typography>
											<Typography>{this.state.shots}</Typography>
											<Typography>{this.state.accurancy}%</Typography>
											<Typography>{this.state.rank}</Typography> */}
											<Typography>50</Typography>
											<Typography>2</Typography>
											<Typography>40</Typography>
											<Typography>5%</Typography>
											<Typography>1st</Typography>
										</Stack>

									</Stack>
								</Box>
							</Grid>
						</Box>
					</Grid>
				</Box>
			</div>
		);
	};
}

