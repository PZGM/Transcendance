import { Box, Grid, Stack} from "@mui/material";
import { Component } from "react";
import { UserAPI } from "../../api/Users.api";
import { Element } from "./Element";

type AchievementProps = {
};


interface AchievementState {
	games: number,
	winRow: number,
	under3min: number,
	golden: number,
	elo: number
};

export class Achievement extends Component<AchievementProps, AchievementState> {
	constructor(props: AchievementProps) {
		super(props);
		this.state = {games: 0, winRow: 0, under3min: 0, golden: 0, elo: 0}
	}
	
	async fetchProfile() {
		const user = await UserAPI.getUserWithStats();
		if (user && user.stats)
			this.setState({
				games: user.stats.games,
				winRow: user.stats.winRow,
				under3min: user.stats.under3min,
				golden: user.stats.golden,
				elo: user.stats.eloScore
			})
	}

	componentDidMount()  {
		this.fetchProfile();
	}


	render (){
		return(

			<Grid container direction="column"
				justifyContent="space-between"
				alignItems="center"
				style={{width: "99%", height: "99%"}}
			>
				<Stack direction="row" style={{width: "100%", height: "33%"}}>
					<Element name="Play 1 match" actual={this.state.games} max={1} color="green"/>
					<Element name="Play 10 match" actual={this.state.games} max={10} color="pink"/>
					<Element name="Play 100 match" actual={this.state.games} max={100} color="red"/>
				</Stack>
				<Stack direction="row" style={{width: "100%", height: "33%"}}>
					<Element name="Win 3 match in row" actual={this.state.winRow} max={3} color="yellow"/>
					<Element name="Win 10 match in row" actual={this.state.winRow} max={10} color="white"/>
					<Element name="Win 15 match in row" actual={this.state.winRow} max={15} color="blue"/>
				</Stack>
				<Stack direction="row" style={{width: "100%", height: "33%"}}>
					<Element name="Win 10 match under 3 min" actual={this.state.under3min} max={10} color="red"/>
					<Element name="Win 5 golden match" actual={this.state.golden} max={5} color="pink"/>
					<Element name="Get 1000 as elo score" actual={this.state.elo - 400} max={600} color="cyan"/>
				</Stack>
			</Grid>

        );
    };
}