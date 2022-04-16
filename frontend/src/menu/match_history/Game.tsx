import { Avatar, Box, ListItem, Stack, Typography } from "@mui/material";
import { Component } from "react";
import { GameDto } from '../../api/dto/game.dto'
import moment from 'moment'
import './../../style/buttons.css'
import './../../style/display.css'
import './../../asset/fonts/fonts.css'

type GameDisplayProps = {
	game: GameDto,
	index: number
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
		if (this.props.index == this.props.game.winnerId)
			return "green";

		return "red";
	}

	render () {

		const GridItemStyle = {
			alignItems: 'center',
			display: "flex",
            width: "100%"
		};

		const w_id: number = this.props.game.winnerId == this.props.game.players[0].id ? 0 : 1;
		const l_id: number = this.props.game.loserId == this.props.game.players[0].id ? 0 : 1;
		const date: string = moment(this.props.game.createdDate).format("DD.MM.YYYY - HH:MM")

		return (

			<div className={"user bor_" + this.getColor()}>
					<ListItem key={this.props.game.id}>
						<Stack direction='row'
							justifyContent="space-between"
							alignItems="center"
							spacing={1}
							style={GridItemStyle}
						>
							<div className="bit9x9 green" style={{fontSize: 'calc(10px + 1.3w)'}}>
								{this.props.game.winnerScore}
							</div>
							
							<Avatar variant='circular'
								alt={this.props.game.players[w_id].login}
								src={this.props.game.players[w_id].avatar}
							/>
							
							<Stack direction='column' style={{width: '100%'}}>
								
								<Stack direction='row'
									justifyContent="space-evenly"
									style={{width: '100%', fontSize: 'calc(10px + 1w)'}}
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
									<div className="bit5x5 white" style={{fontSize: 'calc(10px + 0.8w)'}}>
										{date}
									</div>
								</Stack>
							
							</Stack>
							
							<Avatar variant='circular'
								alt={this.props.game.players[l_id].login}
								src={this.props.game.players[l_id].avatar}/>
							
							<div className="bit9x9 green" style={{fontSize: 'calc(10px + 1.3w)'}}>
								{this.props.game.loserScore}
							</div>
						
						</Stack>
				</ListItem>
			</div>
		);
	}
}

// 