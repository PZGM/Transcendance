import { ButtonBase, Typography } from "@mui/material";
import { Component} from "react";



interface ChatProps {
	updateDisplay: any;
};


export class Chat extends Component<ChatProps> {
	constructor(props: ChatProps) {
		super(props);
	}

	componentDidMount()  {
	}



	render () {
		return (
            <>
				<Typography>{`Yo je suis le Chat`}</Typography>
                <ButtonBase onClick={ () => {this.props.updateDisplay(1, 0);}}> Go to profile 0</ButtonBase>
				<ButtonBase onClick={ () => {this.props.updateDisplay(1, 1);}}> Go to profile 1</ButtonBase>
                <ButtonBase onClick={ () => {this.props.updateDisplay(1, 2);}}> Go to profile 2</ButtonBase>
                <ButtonBase onClick={ () => {this.props.updateDisplay(1, 3);}}> Go to profile 3</ButtonBase>

			</>
		)
	}
}