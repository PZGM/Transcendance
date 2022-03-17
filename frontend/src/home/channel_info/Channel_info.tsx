import { Box, Button, ButtonBase, Grid, IconButton, Input, InputBase, List, Stack, TextField, Typography, Avatar } from "@mui/material";
import { Component} from "react";
import { Selecter } from "../gestion_chat/Selecter";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserDisplay } from "../../menu/friends/UserDisplay";
import styles from './../../style/dac.module.css'
import { red } from "@mui/material/colors";


interface ChannelInfoProps {
    id?: number;
    updateDisplay: any;
};

let height_Box_Admin = "20vh"
let height_Box_Users = "58vh"
let width_button = "100px"

export class ChannelInfo extends Component<ChannelInfoProps> {
	renderRowsAdmins(list) {
		list = [1,1,1,1,1]
		const listItems = list.map((id: number) =>
			<div key={id}>
				{/* <UserDisplay id={id} index={0} deleteFriend={this.deleteFriend}/> */}
				<Box width="346px" className={styles.bdac} sx={{color:'test'}}>
					<Stack  direction="row" spacing={2}>
					<Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1} width="10vh">
							<Avatar variant='circular' alt="" src=""/>
							<Typography variant="button">
								<div className='bit9x9'> Braimbault </div>
							</Typography>
						</Stack>
						<Stack direction='row' justifyContent="flex-end"  alignItems="flex-end" spacing={1} width="86%">
							<ButtonBase centerRipple className={styles.dac} style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
								<Typography variant="button" color='white'>
								<div className='bit5x5'> WATCH MATCH </div>
								</Typography>
							</ButtonBase>
							<ButtonBase centerRipple className={styles.dac} style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
								<Typography variant="button" color='white'>
								<div className='bit5x5'> SEND MESSAGE </div>
								</Typography>
							</ButtonBase>
							<ButtonBase centerRipple className={styles.dac} style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
								<Typography variant="button" color='white'>
								<div className='bit5x5'> REMOVE FRIEND </div>
								</Typography>
							</ButtonBase>
						</Stack>
					</Stack>
				</Box>
			</div>
	  );
	  return listItems;
	}

	renderRowsUsers(list) {
		list = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
		const listItems = list.map((id: number) =>
			<div key={id}>
				{/* <UserDisplay id={id} index={0} deleteFriend={this.deleteFriend}/> */}
				<Box width="100%" className={styles.bdac} sx={{color:'test'}}>
					<Stack  direction="row" justifyContent="center" alignItems="center" spacing={2}>
						<Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1} width="10vh">
							<Avatar variant='circular' alt="" src=""/>
							<Typography variant="button">
								<div className='bit9x9'> Braimbault </div>
							</Typography>
						</Stack>
						<Stack direction='row' justifyContent="flex-end"  alignItems="flex-end" spacing={1} width="15vh">
							<ButtonBase centerRipple className={styles.dac} style={{width: width_button, height: '4vh', borderRadius: 0, backgroundColor: "red"}}>
								<Typography variant="button" color='white'>
									<div className='bit5x5'> WATCH MATCH </div>
								</Typography>
							</ButtonBase>
							<ButtonBase centerRipple className={styles.dac} style={{width: width_button, height: '4vh', borderRadius: 0, backgroundColor: "red"}}>
								<Typography variant="button" color='white'>
									<div className='bit5x5'> SEND MESSAGE </div>
								</Typography>
							</ButtonBase>
							<ButtonBase centerRipple className={styles.dac} style={{width: width_button, height: '4vh', borderRadius: 0, backgroundColor: "red"}}>
								<Typography variant="button" color='white'>
									<div className='bit5x5'> REMOVE FRIEND </div>
								</Typography>
							</ButtonBase>
						</Stack>
					</Stack>
				</Box>
			</div>
	  );
	  return listItems;
	}

    render () {
        return (
            <>
                <Selecter></Selecter>
                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
                    <IconButton onClick={ () => {this.props.updateDisplay(0);}}>
                        <ArrowBackIcon/>
                    </IconButton>
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
				<Typography variant="h1" color='white'>
								<div className='bit5x5'> 42 </div>
								</Typography>
                </Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<Typography>ADMINS :</Typography>
						<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} height={height_Box_Admin}>
							<List style={{height: "100% -100px", overflow: 'auto'}}>
								{this.renderRowsAdmins([])}
								{/* {this.renderRows(this.state.friends)} */}
							</List>
						</Stack>
				</Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<Typography>USERS :</Typography>
					<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} height={height_Box_Users}>
						<List style={{height: "100% -100px", overflow: 'auto'}}>
							{this.renderRowsUsers([])}
							{/* {this.renderRows(this.state.friends)} */}
						</List>
					</Stack>
				</Stack>

            </>
        )
    }
}