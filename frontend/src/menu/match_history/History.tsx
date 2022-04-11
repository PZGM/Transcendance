import { Box, ListItem, ListItemButton, ListItemText, Grid, Divider, Button, TextField, Typography } from "@mui/material";
import { Component } from "react";
import { Helmet } from "react-helmet";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import Menu from "../Menu";
import { UserAPI } from "../../api/Users.api";
import { GameDto } from "../../api/dto/game.dto";

interface HistoryProps {
};

interface HistoryState {
	history: GameDto[],
}

export class History extends Component<HistoryProps,HistoryState> {

	constructor(props: HistoryProps) {
		super(props);
		this.getHistory();
		this.state = {
			history: [],
        }
	}

	async getHistory() {
		const history: GameDto[] = await UserAPI.getHistory();
		console.log(history);
		this.setState({
			history
		})
	}
	render (){
		return(
            <div>
				<Typography>History</Typography>
            </div>
        );
    };
}