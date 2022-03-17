import { Box, Button, ButtonBase, Grid, IconButton, Input, InputBase, List, Stack, TextField, Typography, Avatar } from "@mui/material";
import { Component} from "react";
import { Selecter } from "../gestion_chat/Selecter";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserDisplay } from "../../menu/friends/UserDisplay";
import styles from './../../style/dac.module.css'
import { red } from "@mui/material/colors";
import AddIcon from '@mui/icons-material/Add';
import { AddUserDisplay } from "../../menu/friends/AddUserDisplay";
import { UserAPI } from "../../api/Users.api";

interface   AddUserChannelProps {
    id?: number;
    updateDisplay: any;
};
interface AddUserChannelState {
	searchResults: number[];
	searchField?: string;
}

let height_Box_Admin = "20vh"
let height_Box_Users = "58vh"
let width_button = "100px"

export class AddUserChannel extends Component<AddUserChannelProps, AddUserChannelState> {
	
    constructor(props: AddUserChannelProps) {
		super(props);
		this.state = {searchResults: [], searchField: undefined};
		this.renderSearchRows = this.renderSearchRows.bind(this);
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

	renderSearchRows(list) {
		const listItems = list.map((id: number) =>
			<div key={id}>
				<AddUserDisplay id={id} index={0} addFriend={[]}/>
			</div>
	  );
	  return listItems;
	}
	async onSearch(search:string) {
		this.setState({searchField: search});
		if (!search || search === '')
			return;
		let ret = await UserAPI.searchFriend(search);
		this.setState({searchResults: ret});
	}


    render () {
        return (
            <>
                <Selecter></Selecter>
                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
                    <IconButton onClick={ () => {this.props.updateDisplay(5);}}>
                        <ArrowBackIcon/>
                    </IconButton>
                </Stack>
                <InputBase sx={{width: "26vh"}} inputProps={{min: 0, style: { textAlign: 'center' }}} className={styles.input} placeholder="Search Friend" onChange={ async (e) => {this.onSearch(e.target.value)}}/>

                <List style={{height: "100% -100px",overflow: 'auto'}}>
                    {this.renderSearchRows(this.state.searchResults)}
                </List>
            </>
        )
    }
}