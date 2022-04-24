import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonBase, List, NativeSelect, Select, Stack, Typography } from "@mui/material";
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

interface SelecterProps {
	channel: any;
};
interface SelecterState {
	channels: any;
	friends: any;
	name?: any;
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
		this.state = {channels: [], friends: undefined, name: undefined};
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
				<Link 	style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + channel.name}}>
					<div className='bit9x9'> {channel.name} </div>
				</Link>
			</Stack>
	  );
	  return listItems;
	}
	
	renderRowsFriend(list) {
		const listItems = list?.map((friend: any) =>
			<Stack direction='row' justifyContent="space-evenly"  alignItems="center" sx={{width: "95%", marginBottom: 1}}>
				<Link 	style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_MP + friend.login}}>
					<div className='bit9x9'>{friend.login}</div>
				</Link>
			</Stack>
	  );
	  return listItems;
	}

	render () {
		let marge = (parseInt(Hbar, 10) - Hchan) / 2;
		return (
			<>
				<Box width="100%" height={Hbar} sx={{backgroundColor: "blue", justifyContent: "center", alignItems: "center"}}>
					<Stack direction="row" justifyContent="center" alignItems="center" sx={{mt: marge.toString().concat("px") }} >
						{/* <ButtonBase sx={{backgroundColor: "red", height: Wi, width: Hi}} onClick={ () => {}}>
							<Link 	style={{ textDecoration: 'none',
									 color: 'white' }}
							to={{pathname: `channels_info`}}>
								i
							</Link>
						</ButtonBase> */}
						<Stack direction="row" justifyContent="center" alignItems="center" spacing={0} >
							<Select sx={{backgroundColor: "red", height: Hchan, minwidth: minWchan,}} onOpen={() =>{this.Select()}} label={this.state.name} onChange={() =>{this.Select()}}>
								<List sx={{maxHeight: "400px", mb: -1, mt: -1}} disablePadding>
									<Accordion onClick={(e) => {e.stopPropagation();}} disableGutters sx={{backgroundColor: "#9e9e9e"}}>
										<AccordionSummary expandIcon={<ArrowDropDownTwoToneIcon />}>
											Channels
										</AccordionSummary>
										<AccordionDetails>
											{/* <ButtonBase className="creachan_button" onClick={() => this.handleToggle()}>
												Create Channel
											</ButtonBase> */}
											<LaPopUp></LaPopUp>
											<List>
												{/* {this.renderRowsChan([])} */}
												{this.renderRowsChan(this.state.channels)}
												{/* {this.renderRows(this.state.friends)} */}
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
												{/* {this.renderRowsFriend([])} */}
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