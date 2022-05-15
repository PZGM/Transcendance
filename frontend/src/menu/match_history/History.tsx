import { List } from "@mui/material";
import { Component } from "react";
import { GameDisplay } from '../match_history/Game'
import { UserAPI } from "../../api/Users.api";
import { GameDto } from "../../api/dto/game.dto";
import { PrivateGuard } from "../../components/PrivateGuard";

interface HistoryProps {
};

interface HistoryState {
	history: GameDto[],
}

export class History extends Component<HistoryProps,HistoryState> {

	renderRows(list) {
		const listItems = list.map((game: GameDto) =>
			<div key={game.id}>
				<GameDisplay game={game} index={0}/>
			</div>
	  );
	  return listItems;
	}

	constructor(props: HistoryProps) {
		super(props);
		this.getHistory();
		this.state = {
			history: [],
        }
	}

	async getHistory() {
		const history: GameDto[] = await UserAPI.getHistory();
		this.setState({
			history
		})
	}
	render (){
		return (
			<>
				<PrivateGuard/>
				<List style={{overflow: 'auto'}}>
						{this.renderRows(this.state.history)}
				</List>
			</>
		)
    };
}