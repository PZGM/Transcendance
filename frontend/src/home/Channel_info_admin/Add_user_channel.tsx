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
import { AddUserChannelDisplay } from "./AddUserChannelDisplay";

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


	renderSearchRows(list) {
		list = [1,1,1,1,1,1,1]

		const listItems = list.map((id: number) =>
			<div key={id}>
				<AddUserChannelDisplay id={id} index={0} addFriend={[]}/>
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
                <Selecter updateDisplay={this.props.updateDisplay}></Selecter>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<IconButton onClick={ () => {this.props.updateDisplay(7);}}>
						<ArrowBackIcon/>
					</IconButton>
				</Stack>
				<Stack justifyContent="center" alignItems="center">
					<InputBase sx={{width: "480px"}} inputProps={{min: 0, style: { textAlign: 'center' }}} className={styles.input} placeholder="Search Friend" onChange={ async (e) => {this.onSearch(e.target.value)}}/>
					<List style={{height: "100% -100px",overflow: 'auto'}}>
						{this.renderSearchRows(this.state.searchResults)}
					</List>
				</Stack>
            </>
        )
    }
}