import { Box, Grid} from "@mui/material";
import { Component } from "react";
import { Helmet } from "react-helmet";
import { MatchRow } from "./First_Row";
import { RowRow } from "./Second_Row";
import { CupRow } from "./Third_Row";
import { UserAPI } from "../../api/Users.api";
import Menu from "../Menu";

type AchievementProps = {
};


interface AchievementState {
	games: number,
	row: number,
	cup: number,
	login?: string,
	avatar?: string,
};

export class Achievement extends Component<AchievementProps, AchievementState> {
	constructor(props: AchievementProps) {
		super(props);
		this.state = {games: 0, row: 0, cup: 0, login: undefined, avatar: undefined}
	}
	
	async fetchProfile() {
		const resp = await UserAPI.getAchievement();
		const user = await UserAPI.getUser();
		this.setState({
			games: resp.games,
			row: resp.row,
			cup: resp.cup,
			login: user.login,
			avatar: user.avatar
		})
	}

	componentDidMount()  {
		this.fetchProfile();
	}


	render (){
		return(

			<Grid container direction="column" justifyContent="space-between" alignItems="center">
				<MatchRow value={54}/>
				<RowRow value={7}/>
				<CupRow value={6}/>
			</Grid>

        );
    };
}