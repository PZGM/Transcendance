import { Avatar, Box, ListItem, Stack, Typography } from "@mui/material";
import { Component } from "react";
import { UserAPI } from "../../api/Users.api";
import { UserDto } from '../../api/dto/user.dto'
import { GameDto } from '../../api/dto/game.dto'
import './../../style/buttons.css'
import './../../style/display.css'
import './../../asset/fonts/fonts.module.css'

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
	}

	getColor(status: number): string | undefined
	{
		let colors = new Map<number, string>([
			[0, 'white'],
			[1, 'red'],
			[2, 'yellow'],
			[3, 'green'],
			[4, 'blue']]);

		return colors.get(status)
	}

	render () {

		const GridItemStyle = {
			color: 'white',
			alignItems: 'center',
			display: "flex",
			fontFamily: 'Bit9x9',
			fontSize: 'calc(10px + 1vw)',
            width: "100%"
		};

		const w_id: number = this.props.game.winnerId - 1;
		const l_id: number = this.props.game.loserId - 1;

		return (

			<div className={"user b_" + this.getColor(this.props.index % 5)}>
					<ListItem key={this.props.game.id}>
						<Stack direction='row'
							justifyContent="space-between"
							alignItems="center"
							spacing={1}
							style={GridItemStyle}
						>
							<div className="bit9x9 green">
								{this.props.game.loserScore}
							</div>
							
							<Avatar variant='circular'
								alt={this.props.game.players[w_id].login}
								src={this.props.game.players[w_id].avatar}
							/>
							
							<Stack direction='column' style={{width: '100%'}}>
								
								<Stack direction='row'
									justifyContent="space-evenly"
									style={{width: '100%'}}
								>
									<div className="bit9x9 red"> {this.props.game.players[w_id].login} </div>
									<div className="arcade blue"> vs </div>
									<div className="bit9x9 pink"> {this.props.game.players[l_id].login} </div>
								</Stack>
								<Stack direction='row' justifyContent="center" style={{width: '100%'}}>
									<div className="bit5x5 white">
										{this.props.game.createdDate} - 10:30</div>
								</Stack>
							</Stack>
							
							<Avatar variant='circular'
								alt={this.props.game.players[l_id].login}
								src={this.props.game.players[l_id].avatar}/>
							<div className="bit9x9 green"> {this.props.game.loserScore} </div>
						</Stack>
				</ListItem>
			</div>
		);
	}
}

// 