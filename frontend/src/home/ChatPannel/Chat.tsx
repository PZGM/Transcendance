import { Box, ButtonBase, IconButton, InputBase, List, Stack, Typography } from "@mui/material";
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

	renderMsg(list)
	{
		list = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
		const listItems = list.map((msg: string) =>
		<>
			<Stack direction="row" spacing={2}>
				<Typography color={"white"}> Afreire- </Typography>
				<Typography color={"white"}> 26/04/2022 15:14 </Typography>
			</Stack>
			<Typography color={"white"}> Hello sucker ! </Typography>
		</>
		);
		return listItems;
	}

	render () {

		return (
            <>
                <Box height="84%">
						<List style={{overflow: 'auto'}} sx={{height: "97%"}}>
						<Stack spacing={1}>
							{this.renderMsg([])}
						</Stack>
						</List>
				</Box>
				  
				<Box height="60px" sx={{backgroundColor: "black"}}>
					<Stack direction="row" spacing={2} sx={{backgroundColor: "black"}}>
						<Link style={{backgroundColor: "black", display: "flex", justifyContent: "center", alignItems: "center"}} to={{pathname: (this.props.isPrivateMessage == true) ? process.env.REACT_APP_USER + "" + this.state.chanName + "/info" : process.env.REACT_APP_HOME_CHAN + "/" + this.state.chanName + "/info"}}
						onClickCapture={() => {this.Select()}}>
							<InfoIcon fontSize="large" sx={{backgroundColor: "black",color: "white"}}/>
						</Link>

						<InputBase inputProps={{style: { color: "white" }}} placeholder="Send Message" sx={{marginLeft: "5px", width: "80%", height: "60px" }}/>
						<IconButton sx={{ color: "white" }}	>
							<SendIcon/>
						</IconButton>
					</Stack>
				</Box>
            </>

		)
	}
}