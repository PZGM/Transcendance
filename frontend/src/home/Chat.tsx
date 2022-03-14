import { Box, Button, ButtonBase, Grid, IconButton, Input, InputBase, Stack, TextField, Typography } from "@mui/material";
import { Component} from "react";
import { Selecter } from "./gestion_chat/Selecter";
import SendIcon from '@mui/icons-material/Send';


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
				<Selecter></Selecter>
				<Box height="1500px">
					<Typography>{`Yo je suis le Chat`}</Typography>
					<ButtonBase onClick={ () => {this.props.updateDisplay(1, 0);}}> Go to profile 0</ButtonBase>
					<ButtonBase onClick={ () => {this.props.updateDisplay(1, 1);}}> Go to profile 1</ButtonBase>
					<ButtonBase onClick={ () => {this.props.updateDisplay(1, 2);}}> Go to profile 2</ButtonBase>
					<ButtonBase onClick={ () => {this.props.updateDisplay(1, 3);}}> Go to profile 3</ButtonBase>
				</Box>
				
				<Box height="60px" sx={{backgroundColor: "red"}}>
					<Stack direction="row" spacing={2}>
						<InputBase inputProps={{style: { textAlign: 'center' }}} placeholder="Send Message" sx={{marginLeft: "5px", width: "80%", height: "60px" }}/>
						<IconButton>
							<SendIcon/>
						</IconButton>
					</Stack>
				</Box>
			</>
		)
	}
}