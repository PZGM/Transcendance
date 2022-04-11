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
            <div>
				<Helmet>
					<style>{'body { background-color: black; }'}</style>
				</Helmet>

				<Box m="10%" p="10px" display="flex" width="auto" height="auto" bgcolor="white" sx={{border: '3px solid grey' }}>
					<Grid container direction="row-reverse"   justifyContent="space-between"  alignItems="stretch">
						<Box width="25%">
							<Menu/>
						</Box>
						<Box width="70%">
							<Box sx={{ p: 1, border: '3px solid grey' }}  width="100%">
								<Grid container direction="column" justifyContent="space-between" alignItems="center">
									<MatchRow value={54}/>
									<RowRow value={7}/>
									<CupRow value={6}/>
									{/* <MatchRow value={this.state.games}/>
									<RowRow value={this.state.row}/>
									<CupRow value={this.state.cup}/> */}
								</Grid>
							</Box>
						</Box>
					</Grid>
				</Box>
            </div>
        );
    };
}