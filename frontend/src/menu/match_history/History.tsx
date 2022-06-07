import { List } from "@mui/material";
import { Component } from "react";
import { GameDisplay } from '../match_history/Game'
import { UserAPI } from "../../api/Users.api";
import { GameDto } from "../../api/dto/game.dto";
import { PrivateGuard } from "../../components/PrivateGuard";
import { UserDto } from "../../api/dto/user.dto";

interface HistoryProps {
};

interface HistoryState {
	history: GameDto[],
	userId: number
}

export class History extends Component<HistoryProps,HistoryState> {

	constructor(props: HistoryProps) {
		super(props);
		this.state = {
			history: [],
			userId: 0
        }
		this.getHistory();
		this.getUserId();
	}

	renderRows(list) {
		const listItems = list.map((game: GameDto) =>
			<div key={game.roomId}>
				<GameDisplay game={game} userId={this.state.userId}/>
			</div>
	  );
	  return listItems;
	}

	async getUserId() {
		const user: UserDto | null = await UserAPI.getMe();
		if (user)
			this.setState({
				userId: user.id
			})
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
				<ol className="friends_list" style={{overflow: 'auto'}}>
						{this.renderRows(this.state.history)}
				</ol>
			</>
		)
    };
}