import { Box, ButtonBase, IconButton, InputBase, Stack, Typography } from "@mui/material";
import { Component} from "react";
import { Link, Navigate } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";
import { UserAPI } from "../../api/Users.api";
import SendIcon from '@mui/icons-material/Send';
import InfoIcon from '@mui/icons-material/Info';

interface ChatState {
    chanName?: number
}

interface ChatProps {
    params: any,
    isPrivateMessage: boolean,
};

export class Chat extends Component<ChatProps, ChatState> {
	constructor(props: ChatProps) {
		super(props);
        this.state = {
            chanName: undefined,
        }
	}

	componentDidMount()  {
	}
	
	async getName() {
        const name = this.props.params.name;
        this.setState({
			chanName: name,
        })
		console.log("NAME : " + name)
    }

	Select() {
		this.getName();
	}

// il faut trouver un moyen d'afficher le chat (je dirais qu'il faut le faire a la discord)

	render () {

		return (
            <>
                {/* <Typography>{`Yo je suis le Chat ${this.state.chanId} this is ${(!this.props.isPrivateMessage) ? 'not' : ''} a private message channel `}</Typography> */}
                <Box height="90%">
					{/* <ButtonBase onClick={ () => {this.props.updateDisplay(1, 0);}}> Go to profile 0</ButtonBase> */}
					{/* <ButtonBase onClick={ () => {this.props.updateDisplay(2, 1);}}> Go to Channel User menu</ButtonBase> */}
					{/* <ButtonBase onClick={ () => {this.props.updateDisplay(3, 1);}}> Go to Channel Info</ButtonBase> */}
					{/* <ButtonBase onClick={ () => {this.props.updateDisplay(4, 1);}}> Go to User Info</ButtonBase> */}
					{/* <ButtonBase onClick={ () => {this.props.updateDisplay(5, 1);}}> Go to Channel Info Admin</ButtonBase> */}
					{/* <ButtonBase onClick={ () => {this.props.updateDisplay(6, 1);}}> Go to Channel Info Admin</ButtonBase> */}
					{/* <ButtonBase onClick={ () => {this.props.updateDisplay(1, 2);}}> Go to profile 2</ButtonBase>
					<ButtonBase onClick={ () => {this.props.updateDisplay(1, 3);}}> Go to profile 3</ButtonBase> */}
				</Box>
				  
				<Box height="60px" sx={{backgroundColor: "red"}}>
					<Stack direction="row" spacing={2}>
						<button onClickCapture={() => {this.Select()}} >
							<Link style={{ textDecoration: 'none', color: 'white' }} to={{pathname: (this.props.isPrivateMessage == true) ? process.env.REACT_APP_USER + "" + this.state.chanName + "/info" : process.env.REACT_APP_HOME_CHAN + "/" + this.state.chanName + "/info"}}>
								<InfoIcon fontSize="large"/>
							</Link>
						</button>

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