import { Box, Button, ButtonBase, Grid, IconButton, Input, InputBase, List, Stack, TextField, Typography, Avatar } from "@mui/material";
import { Component} from "react";
import { Selecter } from "../gestion_chat/Selecter";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserDisplay } from "../../menu/friends/UserDisplay";
import styles from './../../style/dac.module.css'
import { red } from "@mui/material/colors";
import AddIcon from '@mui/icons-material/Add';
import buttons from './../../style/buttons.module.css'
import RenderRows from './../RenderRows'

interface   ChannelInfoAdminProps {
    id?: number;
    updateDisplay: any;
	channel: any;
};

let height_Box_Admin = "20vh"
let height_Box_Users = "58vh"

export class ChannelInfoAdmin extends Component<ChannelInfoAdminProps> {
	renderRowsAdmins(list, updateDisplay) {
		list = [1,1]
		const listItems = list.map((id: number) =>
			<>
				<RenderRows first_button="WATCH MATCH" second_button="SEND MESSAGE" third_button="REMOVE FRIEND" updateDisplay={updateDisplay} numberBack={5}></RenderRows>
			</>
	  );
	  return listItems;
	}

	renderRowsUsers(list, updateDisplay) {
		list = [1,1,1,1,1,1,1,1,1]
		const listItems = list.map((id: number) =>
		<>
			<RenderRows first_button="WATCH MATCH" second_button="SEND MESSAGE" third_button="REMOVE FRIEND" updateDisplay={updateDisplay} numberBack={5}></RenderRows>
		</>

	  );
	  return listItems;
	}

    render () {
        return (
            <>
                <Selecter updateDisplay= {this.props.updateDisplay} channel={this.props.channel}></Selecter>
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
                        <IconButton onClick={ () => {this.props.updateDisplay(0);}}>
                            <ArrowBackIcon/>
                        </IconButton>
                    </Stack>
                    <Stack direction="column" justifyContent="center" alignItems="flex-end" spacing={0}>
                        <IconButton onClick={ () => {this.props.updateDisplay(7, 1);}}>
                            <AddIcon/>
                        </IconButton>
                    </Stack>
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
					<Typography variant="h1" color='white'>
						<div className='bit5x5'> {(this.props.channel) ? this.props.channel.name : '...'} </div>
					</Typography>
                </Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<Typography>ADMINS :</Typography>
						<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} height={height_Box_Admin}>
							<List style={{overflow: 'auto'}}>
								{this.renderRowsAdmins([],this.props.updateDisplay)}
								{/* {this.renderRows(this.state.friends)} */}
							</List>
						</Stack>
				</Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<Typography>USERS :</Typography>
					<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} height={height_Box_Users}>
						<List style={{height: "100% -100px", overflow: 'auto'}}>
							{this.renderRowsUsers([],this.props.updateDisplay)}
							{/* {this.renderRows(this.state.friends)} */}
						</List>
					</Stack>
				</Stack>

            </>
        )
    }
}