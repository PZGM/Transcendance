import { Box, ButtonBase, IconButton, InputBase, Stack, Typography } from "@mui/material";
import { Component} from "react";
import { Navigate } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";
import { UserAPI } from "../../api/Users.api";
import SendIcon from '@mui/icons-material/Send';

interface ChatState {
    chanId?: number
}

interface ChatProps {
    params: any,
    isPrivateMessage: boolean,
};

export class Chat extends Component<ChatProps, ChatState> {
	constructor(props: ChatProps) {
		super(props);
        this.state = {
            chanId: undefined,
        }
	}

	componentDidMount()  {
        const id = this.props.params.name;
        // if (this.props.isPrivateMessage)
        //     chanId = getPrivateMessageChannel(id);
        // else
        this.setState({
            chanId: id,
        })
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