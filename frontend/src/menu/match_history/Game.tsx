import { Avatar, ListItem, Stack } from "@mui/material";
import { Component } from "react";
import { GameDto } from '../../api/dto/game.dto'
import moment from 'moment'
import './../../style/buttons.css'
import './../../style/display.css'
import './../../asset/fonts/fonts.css'

type GameDisplayProps = {
	game: GameDto,
	userId: number
}

interface GameDisplayState {
	status: number;
}

export class GameDisplay extends Component<GameDisplayProps, GameDisplayState>{

	eventSource: any;

	constructor(props: GameDisplayProps) {
		super(props);

		this.getColor.bind(this);
	}

	getColor(): string
	{
		if (this.props.userId === this.props.game.winnerId)
			return "green";

		return "red";
	}

	render () {

		const w_id: number = this.props.game.winnerId === this.props.game.players[0].id ? 0 : 1;
		const l_id: number = this.props.game.loserId === this.props.game.players[0].id ? 0 : 1;
		console.log(this.props.game.createdDate)
		const date: string = moment(this.props.game.createdDate).format("DD.MM.YYYY - HH:MM")

		return (
			<li className={"user bor_" + this.getColor()}
				key={this.props.game.roomId}>
				<Stack direction='row'
					justifyContent="space-between"
					alignItems="center"
					spacing={1}
					className='grid_item_style'
				>
					<div className="bit9x9 green" style={{fontSize: '1.6vw'}}>
						{this.props.game.winnerScore}
					</div>
					
					<Avatar variant='circular'
						sx={{height: '2vw', width: '2vw'}}
						alt={this.props.game.players[w_id].login}
						src={this.props.game.players[w_id].avatar}
					/>
					
					<Stack direction='column' style={{width: '100%'}}>
						
						<Stack direction='row'
							justifyContent="space-between"
							style={{width: '100%', fontSize: '1.3vw'}}
						>
							<div className="bit9x9 red">
								{this.props.game.players[w_id].login}
							</div>
							<div className="arcade blue">
								vs
							</div>
							<div className="bit9x9 pink">
								{this.props.game.players[l_id].login}
							</div>
						</Stack>
						
						<Stack direction='row'
							justifyContent="center"
							style={{width: '100%'}}>
							<div className="bit5x5 white" style={{fontSize: '1vw'}}>
								{date}
							</div>
						</Stack>
					
					</Stack>
					
					<Avatar variant='circular'
						sx={{height: '2vw', width: '2vw'}}
						alt={this.props.game.players[l_id].login}
						src={this.props.game.players[l_id].avatar}/>
					
					<div className="bit9x9 green" style={{fontSize: '1.6vw'}}>
						{this.props.game.loserScore}
					</div>
				
				</Stack>
			</li>
		);
	}
}

// 