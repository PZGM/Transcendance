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
			<div className="field">
				<div className="net"></div>
				<div className="ping"></div>
				<div className="pong"></div>
				<div className="ball"></div>
			</div>
		)
	}
}