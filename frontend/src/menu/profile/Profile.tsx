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
import background from "./../../asset/images/background.jpg"

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

function StatElement(props) {
	return (
		<Stack direction="row">
			<img>{props.logo}</img>
			<div>{props.name}</div>
			<div>{props.data}</div>
		</Stack>
	)
}

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

	render ()
	{
		
		const GridItemStyle = {
			color: 'white',
			alignItems: 'center',
			display: "flex",
			justifyContent: 'center',
			fontFamily: 'Bit9x9',
			fontSize: 'calc(10px + 1vw)',
			width: '100%'
		};

		return (

			<div style={{
				backgroundImage: `url(${background})`,
				backgroundSize: 'cover',
				height: '100vh',
				width: '100vw',
				backgroundRepeat: 'norepeat',
				}}
			>
				<div style={{
					height: '100vh',
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					}}
				>
				<Grid	container
						justifyContent="space-between"
						wrap="nowrap"
						sx={{
								border: '0.5vw solid rgba(0, 70, 109, 1)',
								outline: '0.5vw solid rgba(0, 80, 117, 1)',
								backgroundColor: 'black',
								height: 'undefined',
								width: 'undefined',
								minWidth: "800px", minHeight: "800px",
								maxWidth: "1500px", maxHeight: "1500px"
							}}
				>

						<Grid	item xs={6}
								sx={{	m: 2,
										p: 2,
										backgroundColor: 'black'
									}}
						>
							{/* Settings */}
							<Grid container
								direction="column"
								justifyContent="space-evenly"
								sx={{height: '100%'}}
							>
								<Grid item xs={3}
									sx={GridItemStyle}
									justifyContent="center">
									<Avatar	variant='circular'
											alt="Semy Sharp"
											src={this.state.avatar}
											sx={{	width: '200px',
													height: '200px'}}
									/>
								</Grid>
								<Grid item	xs={1}
											sx={GridItemStyle}>
									AVATAR
								</Grid>
								<Grid item xs={6}
								sx={{	m: 2,
										p: 2,
										border: '0.4vw solid rgba(142, 0, 172, 1)',
										outline: '0.4vw solid rgba(142, 0, 172, 0.5)', 
										backgroundColor: 'black'
									}}>
									<Stack sx={GridItemStyle}
										direction="row" justifyContent="space-evenly" alignItems="center" spacing={2}>

										<Stack sx={GridItemStyle}
											direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
											<GamepadIcon />
											<EmojiEventsIcon />
											<FaceIcon />
											<CancelIcon />
											<StarIcon />
										</Stack>

										<Stack sx={GridItemStyle}
											direction="column" justifyContent="flex-start" alignItems="center" spacing={2}>
											<Typography>GAMES</Typography>
											<Typography>WIN</Typography>
											<Typography>SHOTS</Typography>
											<Typography>ACCURANCY</Typography>
											<Typography>RANK</Typography>
										</Stack>

										<Stack sx={GridItemStyle}
											direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
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

								</Grid>
							</Grid>

						</Grid>

						<Grid item xs={5} sx={{m: 3, position: 'relative'}}>
							<Menu/>
						</Grid>
				</Grid>

				</div>
            </div>
		);
	};
}

