import { Avatar, Box, Stack, Grid, Typography } from "@mui/material";
import React, { Component } from "react";
import GamepadIcon from '@mui/icons-material/Gamepad';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FaceIcon from '@mui/icons-material/Face';
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import { UserAPI } from "../../api/Users.api";
import { UserDto } from "../../api/dto/user.dto"
import "../../style/display.css"
import { NumericLiteral } from "typescript";

type ProfileProps = {
};


interface ProfileState {
	user: UserDto | null
};

function StatElement(props) {
	return (
		<Stack direction="row"
			justifyContent="space-between"
			sx={{width: '80%',
				fontSize: 'calc(10px + 1.5vw)'}}
			className={"bit9x9 " + props.color} >
			<div>{props.logo}</div>
			<div>{props.name}</div>
			<div>{props.data}</div>
		</Stack>
	)
}

export class Profile extends Component<ProfileProps, ProfileState> {
	constructor(props: ProfileProps) {
		super(props);
		this.state = {user: null}
	}

	async fetchProfile() {
		const user = await UserAPI.getUserWithStats();
		this.setState({
			user
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
			spacing: '4',
			fontSize: 'calc(10px + 1vw)',
			width: '100%',
		};

		const IconStyle = {
			width: '40px',
			height: '40px'
		}

		if (!this.state.user || !this.state.user.stats)
			return (
				<div>LOADING...</div>
			)
		else
			return (
				<>
					<Grid item xs={4}
						sx={GridItemStyle}
						justifyContent="center"
					>
						<Avatar	variant='circular'
								alt="Semy Sharp"
								src={this.state.user.avatar}
								sx={{	width: '250px',
										height: '250px'}}
						/>
					</Grid>
					
					<Grid item	xs={2}
								sx={GridItemStyle}>
						<div className={"backto1982 " + this.state.user.color} >{this.state.user.login}</div>
					</Grid>
					
					<Grid item  xs={5}
								justifyContent="space-around"
								direction="column"
								style={{display: 'flex',
										alignItems: 'center'}}
					>
						<StatElement color="red" logo={<GamepadIcon style={IconStyle}/>} name="games" data={this.state.user.stats.games} />
						<StatElement color="green" logo={<EmojiEventsIcon style={IconStyle}/>} name="wins" data={this.state.user.stats.gameWins} />
						<StatElement color="blue" logo={<FaceIcon style={IconStyle}/>} name="avg_time" data={this.state.user.stats.durationAverage} />
						<StatElement color="violet" logo={<CancelIcon style={IconStyle}/>} name="winrate" data={this.state.user.stats.victoryRate} />
						<StatElement color="cyan" logo={<StarIcon style={IconStyle}/>} name="elo_score" data={this.state.user.stats.eloScore} />
						<StatElement color="yellow" logo={<StarIcon style={IconStyle}/>} name="rank" data={this.state.user.stats.rank} />
					</Grid>
				</>
			);
	};
}