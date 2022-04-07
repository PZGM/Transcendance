import { Box, ListItem, ListItemButton, ListItemText, Grid, Divider, Button, TextField, Typography } from "@mui/material";
import { Component } from "react";
import { Helmet } from "react-helmet";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import Menu from "../Menu";
import { UserAPI } from "../../api/Users.api";

interface HistoryProps {
};

interface HistoryState {
	winnerId: number,
	winnerScore: number,
	loserId: number,
	loserScore: number,
	duration: number,
	history: string[],
}

export class History extends Component<HistoryProps,HistoryState> {

	constructor(props: HistoryProps) {
		super(props);
		this.getHistory();
        this.handleChangeWinnerId = this.handleChangeWinnerId.bind(this);
		this.handleChangeWinnerScore = this.handleChangeWinnerScore.bind(this);
        this.handleChangeLoserId = this.handleChangeLoserId.bind(this);
        this.handleChangeLoserScore = this.handleChangeLoserScore.bind(this);
        this.handleChangeDuration = this.handleChangeDuration.bind(this);
		this.createNewGame = this.createNewGame.bind(this);
		this.state = {
            winnerId: 0,
			winnerScore: 0,
			loserId: 0,
			loserScore: 0,
			duration: 0,
			history: [],
        }
	}

	async getHistory() {
		const history = await UserAPI.getHistory();
		this.setState({
			history
		})
	}

	async createNewGame() {
        UserAPI.createNewGame({
			winnerId: this.state.winnerId,
			loserId: this.state.loserId,
			winnerScore: this.state.winnerScore,
			loserScore: this.state.loserScore,
			duration: this.state.duration
		})
    }

    handleChangeWinnerId = (e: React.ChangeEvent<HTMLInputElement>) => {
        const log = e.target.value;
        this.setState({
            winnerId: +log
        })
    }

	handleChangeWinnerScore = (e: React.ChangeEvent<HTMLInputElement>) => {
        const log = e.target.value;
        this.setState({
            winnerScore: +log
        })
    }

	handleChangeLoserId = (e: React.ChangeEvent<HTMLInputElement>) => {
        const log = e.target.value;
        this.setState({
            loserId: +log
        })
    }

	handleChangeLoserScore = (e: React.ChangeEvent<HTMLInputElement>) => {
        const log = e.target.value;
        this.setState({
            loserScore: +log
        })
    }

	handleChangeDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
        const log = e.target.value;
        this.setState({
            duration: +log
        })
    }


	render (){
		return(
            <div>
				<Helmet>
					<style>{'body { background-color: white; }'}</style>
				</Helmet>
				<TextField placeholder='winner id' onChange={this.handleChangeWinnerId} />
				<TextField placeholder='winner score' onChange={this.handleChangeWinnerScore} />
				<TextField placeholder='loser id' onChange={this.handleChangeLoserId} />
				<TextField placeholder='loser score' onChange={this.handleChangeLoserScore} />
				<TextField placeholder='duration' onChange={this.handleChangeDuration} />
				<Button onClick={this.createNewGame} variant="contained" style={{borderRadius: 0}} >New!</Button>
				<Box m="10%" p="10px" display="flex" width="100% - 3px" height="100% - 3px" bgcolor="white" sx={{border: '3px solid grey' }}>
					<Grid container direction="row-reverse"   justifyContent="space-between"  alignItems="stretch">
						<Box width="25%">
							<Menu/>
						</Box>
						<Box width="70%">
							<Box sx={{ p: 1, border: '3px solid grey' }}  width="100%" height="100%">
							</Box>
						</Box>
					</Grid>
				</Box>
            </div>
        );
    };
}