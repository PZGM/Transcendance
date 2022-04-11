import { Box, Button, ButtonBase, Grid, IconButton, Input, InputBase, List, Stack, TextField, Typography, Avatar } from "@mui/material";
import { Component} from "react";
import { Selecter } from "../gestion_chat/Selecter";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserDisplay } from "../../menu/friends/UserDisplay";
import styles from './../../style/dac.module.css'
import { red } from "@mui/material/colors";
import AddIcon from '@mui/icons-material/Add';
import './../../style/buttons.css'
import RenderRows from './../RenderRows'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
interface   ChannelEditPageProps {
    id?: number;
    updateDisplay: any;
};

let height_Box_Admin = "20vh"
let height_Box_Users = "58vh"
let width_button = "90px"

export class ChannelEditPage extends Component<ChannelEditPageProps> {
	renderRowsAdmins(list, updateDisplay) {
		list = [1,1,1,1]
		const listItems = list.map((id: number) =>
			<>
			<RenderRows first_button="WATCH MATCH" second_button="SEND MESSAGE" third_button="REMOVE FRIEND" updateDisplay={updateDisplay} numberBack={7}></RenderRows>
			</>
	  );
	  return listItems;
	}

	renderRowsUsers(list, updateDisplay) {
		list = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
		const listItems = list.map((id: number) =>
		<>
		<RenderRows first_button="WATCH MATCH" second_button="SEND MESSAGE" third_button="REMOVE FRIEND" updateDisplay={updateDisplay} numberBack={7}></RenderRows>
		</>		
	  );
	  return listItems;
	}

    render () {
        return (
            <>
                <Selecter updateDisplay= {this.props.updateDisplay}></Selecter>
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
                        <IconButton onClick={ () => {this.props.updateDisplay(5);}}>
                            <ArrowBackIcon/>
                        </IconButton>
                    </Stack>
                    <Stack direction="column" justifyContent="center" alignItems="flex-end" spacing={0}>
                        <IconButton onClick={ () => {this.props.updateDisplay(5, 1);}}>
                            <DoneOutlineIcon/>
                        </IconButton>
                    </Stack>
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
					<Typography variant="h1" color='white'>
						<div className='bit5x5'> edit42 </div>
					</Typography>
                </Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<Typography>ADMINS :</Typography>
						<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} height={height_Box_Admin}>
							<List style={{overflow: 'auto'}}>
								{this.renderRowsAdmins([],this.props.updateDisplay)}
								{/* {this.renderRows(this.statte.friends)} */}
							</List>
						</Stack>
				</Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0} sx={{marginLeft: "1px", marginRight: "1px"}}>
					<Typography>USERS :</Typography>
					<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" height={height_Box_Users}>
                        <ButtonBase className="button" centerRipple style={{width: "480px", height: '60px', borderRadius: 0, backgroundColor: "red"}} onClick={ () => {this.props.updateDisplay(6);}}>
                            <Typography variant="button" color='white'>
                                <div className='bit5x5'> Add user </div>
                            </Typography>
                        </ButtonBase>
                        <List style={{overflow: 'auto'}} sx={{height: "800px"}}>
							{this.renderRowsUsers([],this.props.updateDisplay)}
							{/* {this.renderRows(this.state.friends)} */}
						</List>
					</Stack>
				</Stack>
            </>
        )
    }
}