import { Avatar, Box, ListItem, Stack, Typography } from "@mui/material";
import { Component } from "react";
import { UserAPI } from "../../api/Users.api";
import { UserDto } from '../../api/dto/user.dto'
import { GameDto } from '../../api/dto/game.dto'
import styles from './../../style/buttons.module.css'
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

	getColor(status: number) {
		let colors = new Map<number, string>([
			[0, 'grey'],
			[1, 'red'],
			[2, 'yellow'],
			[3, 'green'],
			[4, 'blue']]);
		return getComputedStyle(document.documentElement).getPropertyValue(`--${colors.get(status)}`)
	}

	render () {
		return (
			<Box mr='2px' className={styles.bdac} sx={{borderColor: this.getColor(this.props.index % 5)}}>
					<ListItem key={this.props.game.id}>
					
					<div>
						<Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1}>
								<Avatar variant='circular' alt={this.props.game.players[0].login} src={this.props.game.players[0].avatar}/>
								<Avatar variant='circular' alt={this.props.game.players[1].login} src={this.props.game.players[0].avatar}/>
						</Stack>
					</div>
				
				</ListItem>
			</Box>
		);
	}
}

// 