import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonBase, FormControl, InputLabel, List, NativeSelect, Select, Stack, Typography } from "@mui/material";
import { Component} from "react";
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';
import { Link } from "react-router-dom";
import SelectUnstyled from '@mui/base/SelectUnstyled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChatAPI } from "../../../api/Chat.api";
import styles from './../../style/dac.module.css'
import '../../../style/buttons.css'
import { UserAPI } from "../../../api/Users.api";
import { Backdrop } from "@mui/material";
import { Dialog } from "@mui/material";
import LaPopUp from "../tools/LaPopUp"
import InfoIcon from '@mui/icons-material/Info';

interface SelecterProps {
	channel: any;
};
interface SelecterState {
	channels: any;
	friends: any;
	name: any;
};

let Hbar = "50px";
let Hi = 15;
let Wi = 15;
let Hchan = 25;
let minWchan = 25;
let maxWchan = 50;
let width_button = "150px"


export class Selecter extends Component<SelecterProps, SelecterState> {
	backdropopen: boolean = false;
	constructor(props: SelecterProps) {
		super(props);
		let name = window.location.pathname.split('/')[3];
		if (!name)
			name = 'Channels'
		this.state = {channels: [], friends: undefined, name};
	}
    async getChannels() {
        let chan = await ChatAPI.getChannels();
		this.setState({channels: chan});
    }
    async getFriend() {
        let friends = await UserAPI.getFriends();
		this.setState({friends: friends});
		console.log("Le user")
		console.log(friends)
    }

	componentDidMount()  {
		// this.getChannels();
		// this.getUser();
	}

	Select() {
		this.getChannels();
		this.getFriend();
	}

	renderRowsChan(list) {
		const listItems = list.map((channel: any) =>
			<Stack direction='row' justifyContent="space-evenly"  alignItems="center" sx={{width: "95%", marginBottom: 1}}>
				<Link onClick={()=> {this.updateName(channel.name)}}	style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + channel.name}}>
					<div className='bit9x9'> {channel.name} </div>
				</Link>
			</Stack>
	  );
	  return listItems;
	}
	
	renderRowsFriend(list) {
		const listItems = list?.map((friend: any) =>
			<Stack direction='row' justifyContent="space-evenly"  alignItems="center" sx={{width: "95%", marginBottom: 1}}>
				<Link onClick={()=> {this.updateName(friend.login)}}	style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_MP + friend.login}}>
					<div className='bit9x9'>{friend.login}</div>
				</Link>
			</Stack>
	  );
	  return listItems;
	}

	updateName(name: string) {
		this.setState({
			name
		})
	}
	render () {
		let marge = (parseInt(Hbar, 10) - Hchan) / 2;
		return (
			<>
				<Box width="100%" height={Hbar} sx={{backgroundColor: "#03C7D8", justifyContent: "center", alignItems: "center"}}>
					<Stack direction="row" justifyContent="center" alignItems="center" sx={{mt: marge.toString().concat("px") }} >
						<Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
							<Link style={{height: Hchan, width: Hi, textDecoration: 'none',fontSize: "large"}} to={{pathname: (window.location.pathname.search("/home/chat")) ? process.env.REACT_APP_USER + "" + this.state.name + "/info" : process.env.REACT_APP_HOME_CHAN + "/" + this.state.name + "/info"}}>
								<InfoIcon sx={{backgroundColor: "#03C7D8",color: "white"}}/>
							</Link>
								<Select autoWidth disableUnderline variant="standard" sx={{height: Hchan, minwidth: minWchan,}} value={"Balote"}
								renderValue={() => {
									// TODO trouver un moyen d'afficher le nom du channel ou de la personne juste ici
									  return <div className='bit9x9'>{this.state.name}</div>;
									//   return <div className='bit9x9'>slt</div>;
								  }}
								onOpen={() =>{this.Select()}} onChange={() =>{this.Select()}}>
									<List sx={{maxHeight: "400px", mb: -1, mt: -1}} disablePadding>
										<Accordion onClick={(e) => {e.stopPropagation();}} disableGutters sx={{backgroundColor: "#9e9e9e"}}>
											<AccordionSummary expandIcon={<ArrowDropDownTwoToneIcon />}>
												Channels
											</AccordionSummary>
											<AccordionDetails>
												<LaPopUp></LaPopUp>
												<List>
													{this.renderRowsChan(this.state.channels)}
												</List>
											</AccordionDetails>
										</Accordion>
										<Accordion onClick={(e) => {e.stopPropagation();}} disableGutters sx={{backgroundColor: "#9e9e9e"}}>
											<AccordionSummary  expandIcon={<ArrowDropDownTwoToneIcon />}>
												MP
											</AccordionSummary>
											<AccordionDetails>
												<List>
													{this.renderRowsFriend(this.state.friends)}
												</List>
											</AccordionDetails>
										</Accordion>
									</List>
								</Select>
						</Stack>
					</Stack>
				</Box>
			</>
		)
	}
}