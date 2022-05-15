import { Component } from "react";
import '../../style/display.css';
import '../../style/buttons.css';

interface PlayButtonProps {

};

interface PlayButtonState {

};



export class PlayButton extends Component<PlayButtonProps, PlayButtonState>
{
	render () {
		return (
			<div className="play_button">
  				Play Game
			</div>
		)
	}
}