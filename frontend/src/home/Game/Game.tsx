import { Component } from "react";
import '../../style/display.css';
import { PlayButton } from './PlayButton';
import { Loading } from './Loading';
import { Play } from './Play';
import { RoomDto } from '../../api/dto/game.dto';

interface GameProps {
	room: RoomDto;
};

interface GameState {
	display: number;
};



export class Game extends Component<GameProps, GameState>
{
	constructor(props: GameProps) {
		super(props);

		this.state = {
			display: 2,
		}
	}

	display()
	{
		if (this.state.display == 0)
			return <PlayButton/>
		else if (this.state.display == 1)
			return <Loading/>
		else if (this.state.display == 2)
			return <Play room={this.props.room}/>
	}

    /* render the jsx */
    render()
	{
		return (
			<div className="background">
				<div className="frame_div">
					{this.display()}
				</div>
            </div>
		)
	}

}