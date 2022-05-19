import { Stack } from "@mui/material";
import { Component } from "react";
import '../../style/display.css';
import './pong.scss';

interface LoadingProps {

};

interface LoadingState {

};



export class Loading extends Component<LoadingProps, LoadingState>
{
	render () {
		return (
			<div className="game_frame">
				<Stack direction='column'
					className='grid_item_style'
					justifyContent='space-evenly'
					spacing={3}
					style={{height: '100%',
							width: '100%'}}
				>
					<div className="white">Loading...</div>
					<div style={{height: '50%'}}>
						<div className="field">
							<div className="net"></div>
							<div className="ping"></div>
							<div className="pong"></div>
							<div className="ball"></div>
						</div>
					</div>
				</Stack>
			</div>
		)
	}
}