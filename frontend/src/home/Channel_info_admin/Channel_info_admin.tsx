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
};

let height_Box_Admin = "20vh"
let height_Box_Users = "58vh"
let width_button = "90px"

export class ChannelInfoAdmin extends Component<ChannelInfoAdminProps> {
	renderRowsAdmins(list) {
		list = [1,1]
		const listItems = list.map((id: number) =>
			// <Box width="472px" className={styles.bdac} sx={{color:'test'}} ml="5px" mr="2px">
			//  	<Stack  direction="row" justifyContent="center" alignItems="center" spacing={2}>
			//  		<ButtonBase> 
			//  			<Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1}>
			//  				<Avatar variant='circular' alt="" src=""/>
			//  				<Typography variant="button">
			//  					<div className='bit9x9'> Braimbault </div>
			//  				</Typography>
			//  			</Stack>
			//  		</ButtonBase>
			//  		<Stack direction='row' justifyContent="flex-end"  alignItems="flex-end" spacing={1}>
			//  			<ButtonBase centerRipple className={buttons.button} style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
			//  				<Typography variant="button" color='white'>
			//  					<div className='bit5x5'> WATCH MATCH </div>
			//  				</Typography>
			//  			</ButtonBase>
			//  			<ButtonBase centerRipple className={buttons.button} style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
			//  				<Typography variant="button" color='white'>
			//  					<div className='bit5x5'> SEND MESSAGE </div>
			//  				</Typography>
			//  			</ButtonBase>
			//  			<ButtonBase centerRipple className={buttons.button} style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
			//  				<Typography variant="button" color='white'>
			//  					<div className='bit5x5'> REMOVE FRIEND </div>
			//  				</Typography>
			//  			</ButtonBase>
			//  		</Stack>
			//  	</Stack>
			// </Box>
			<div>
			<RenderRows></RenderRows>
			</div>
	  );
	  return listItems;
	}

	renderRowsUsers(list, updateDisplay) {
		list = [1,1,1,1,1,1,1,1,1]
		const listItems = list.map((id: number) =>
			// <div key={id}>
			<Box width="472px" className={styles.bdac} sx={{color:'test'}} ml="5px" mr="2px">
				<Stack  direction="row" justifyContent="center" alignItems="center" spacing={2}>
					<ButtonBase onClick={ () => {updateDisplay(4, 1);}} >
						<Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1}>
							<Avatar variant='circular' alt="" src=""/>
							<Typography variant="button">
								<div className='bit9x9'> Braimbault </div>
							</Typography>
						</Stack>
					</ButtonBase>
					<Stack direction='row' justifyContent="flex-end"  alignItems="flex-end" spacing={1}>
						<ButtonBase centerRipple className={buttons.button} style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
							<Typography variant="button" color='white'>
								<div className='bit5x5'> WATCH MATCH </div>
							</Typography>
						</ButtonBase>
						<ButtonBase centerRipple className={buttons.button} style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
							<Typography variant="button" color='white'>
								<div className='bit5x5'> SEND MESSAGE </div>
							</Typography>
						</ButtonBase>
						<ButtonBase centerRipple className={buttons.button} style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
							<Typography variant="button" color='white'>
								<div className='bit5x5'> REMOVE FRIEND </div>
							</Typography>
						</ButtonBase>
					</Stack>
				</Stack>
			</Box>
			// </div>
	  );
	  return listItems;
	}

    render () {
        return (
            <>
                <Selecter updateDisplay= {this.props.updateDisplay}></Selecter>
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
						<div className='bit5x5'> 42 </div>
					</Typography>
                </Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<Typography>ADMINS :</Typography>
						<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} height={height_Box_Admin}>
							<List style={{overflow: 'auto'}}>
								{this.renderRowsAdmins([])}
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