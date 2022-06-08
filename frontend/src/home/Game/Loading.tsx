import { Stack } from "@mui/material";
import { Component } from "react";
import { GameSocketAPI } from "../../api/GameSocket.api";
import '../../style/display.css';
import './pong.scss';

interface LoadingProps {
	socket: GameSocketAPI,
	userId: number,
	updateDisplay: any
};

interface LoadingState {

};



export class Loading extends Component<LoadingProps, LoadingState>
{
	handleClick() {
		this.props.socket.leaveQueue(this.props.userId);
		this.props.updateDisplay(0);
	}

	render () {
		return (
			<div className="game_frame">
				<Stack direction='column'
					className='grid_item_style'
					justifyContent='space-evenly'
					style={{height: '100%',
							width: '100%'}}
				>
					<div className="white"
						style={{marginBottom: '5vw'}}>
						Loading...
					</div>
					
					<div style={{marginBottom: '5vw'}}>
						<div className="field">
							<div className="net"></div>
							<div className="ping"></div>
							<div className="pong"></div>
							<div className="ball"></div>
						</div>
					</div>
					
					<div className="leave_queue_button but_red"
						onClick={this.handleClick.bind(this)}>
						Leave queue
					</div>
				</Stack>
			</div>
		)
	}
}