import { Avatar, Box, ButtonBase, IconButton, List, Stack, Typography } from "@mui/material";
import { Component} from "react";
import { Navigate } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";
import { UserAPI } from "../../api/Users.api";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RenderRows from "./tools/RenderRows";
import AddIcon from '@mui/icons-material/Add';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import "../../style/buttons.css"

interface ChanEditState {
    chan?: any
}

interface ChanEditProps {
    params: any,
};

let height_Box_Admin = "20vh"
let height_Box_Users = "58vh"
let width_button = "90px"

export class ChanEdit extends Component<ChanEditProps, ChanEditState> {
	constructor(props: ChanEditProps) {
		super(props);
        this.state = {
            chan: undefined,
        }
	}

	componentDidMount()  {
        const id = this.props.params.name;
        // if (this.props.isPrivateMessage)
        //     chanId = getPrivateMessageChannel(id);
        // else
        this.setState({
            chan: id,
        })
	}

	renderRowsAdmins(list) {
		list = [1,1,1,1]
		const listItems = list.map((id: number) =>
			<>
			<RenderRows first_button="WATCH MATCH" second_button="SEND MESSAGE" third_button="REMOVE FRIEND" ></RenderRows>
			</>
	  );
	  return listItems;
	}

	renderRowsUsers(list) {
		list = [1,1,1,1,1,1,1,1]
		const listItems = list.map((id: number) =>
		<>
		<RenderRows first_button="WATCH MATCH" second_button="SEND MESSAGE" third_button="REMOVE FRIEND" ></RenderRows>
		</>		
	  );
	  return listItems;
	}

	render () {

		return (
            <>
                {/* <Typography>{`Yo je suis le ChanEdit de ${this.state.chan} `}</Typography> */}
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
                        <IconButton onClick={ () => {}}>
                            <ArrowBackIcon/>
                        </IconButton>
                    </Stack>
                    <Stack direction="column" justifyContent="center" alignItems="flex-end" spacing={0}>
                        <IconButton onClick={ () => {}}>
                            <DoneOutlineIcon/>
                        </IconButton>
                    </Stack>
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
					<Typography variant="h1" color='white'>
						<div className='bit5x5'> {this.state.chan} </div>
					</Typography>
                </Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<Typography>ADMINS :</Typography>
						<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} height={height_Box_Admin}>
							<List style={{overflow: 'auto'}}>
								{this.renderRowsAdmins([])}
								{/* {this.renderRows(this.statte.friends)} */}
							</List>
						</Stack>
				</Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0} sx={{marginLeft: "1px", marginRight: "1px"}}>
					<Typography>USERS :</Typography>
					<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" height={height_Box_Users}>
                        <ButtonBase className="home_button" centerRipple style={{width: "480px", height: '60px', borderRadius: 0, backgroundColor: "red"}} onClick={ () => {}}>
                            <Typography variant="button" color='white'>
                                <div className='bit5x5'> Add user </div>
                            </Typography>
                        </ButtonBase>
                        <List style={{overflow: 'auto'}} sx={{height: "800px"}}>
							{this.renderRowsUsers([])}
							{/* {this.renderRows(this.state.friends)} */}
						</List>
					</Stack>
				</Stack>
            </>

		)
	}
}