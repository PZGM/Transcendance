import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonBase, ClickAwayListener, Fade, FormControl, Grow, InputLabel, List, ListSubheader, Menu, MenuItem, NativeSelect, Popover, Popper, Select, SelectChangeEvent, Stack, Typography } from "@mui/material";
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
import CreateChannel from "../tools/CreateChannel"
import InfoIcon from '@mui/icons-material/Info';

interface SelecterProps {
	channel: any;
};
interface SelecterState {
	channels: any;
	friends: any;
	name: any;
	open: boolean;
	anchorEl: any;
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
		this.handleClick = this.handleClick.bind(this);
		this.handleClickAway = this.handleClickAway.bind(this);
		let name = window.location.pathname.split('/')[3];
		if (!name)
			name = 'Channels'
		this.state = {channels: [], friends: [], name, open: false, anchorEl: null};	}

    async getChannels() {
        let chan = await ChatAPI.getChannels();
		console.log(chan)
		this.setState({channels: chan});
    }

    async getFriends() {
        let friends = await UserAPI.getFriends();
		this.setState({friends: friends});
    }

	componentDidMount()  {
		this.getChannels();
		this.getFriends();
	}

	updateName(name: string) {
		this.setState({
			name
		})
	}
 
	handleClick(event: React.MouseEvent<HTMLElement>) {
		this.getChannels();
		this.getFriends();
		this.setState({
			open: !this.state.open,
			anchorEl: event.currentTarget,
		})
		console.log(`OPEN ${this.state.open}`)
	  };

	handleClickAway() {
		console.log('click away')
		this.setState({
			open: false
		})
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
				<Link onClick={()=> {this.updateName(friend.login)}} style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_MP + friend.login}}>
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
				<Box width="100%" height={Hbar} sx={{backgroundColor: "#03C7D8", justifyContent: "center", alignItems: "center"}}>
					<Stack direction="row" justifyContent="center" alignItems="center" sx={{mt: marge.toString().concat("px") }} >
						<Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
							<Link style={{height: Hchan, width: Hi, textDecoration: 'none',fontSize: "large"}} to={{pathname: (window.location.pathname.search("/home/chat")) ? process.env.REACT_APP_USER + "" + this.state.name + "/info" : process.env.REACT_APP_HOME_CHAN + "/" + this.state.name + "/info"}}>
								<InfoIcon sx={{backgroundColor: "#03C7D8",color: "white"}}/>
							</Link>
							<ButtonBase onClick={this.handleClick} style={{height: Hchan,fontSize: "large"}} >
								<div className='bit9x9'>{this.state.name}</div>
							</ButtonBase>
							<ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={this.handleClickAway}>
								<Popper sx={{marginTop: "10px"}}open={this.state.open} anchorEl={this.state.anchorEl}>
									<List sx={{maxHeight: "400px", mb: -1, mt: -1}} disablePadding>
										<Accordion onClick={(e) => {e.stopPropagation();}} disableGutters sx={{backgroundColor: "#9e9e9e"}}>
											<AccordionSummary expandIcon={<ArrowDropDownTwoToneIcon />}>
												Channels
											</AccordionSummary>
											<AccordionDetails>
												<CreateChannel/>
												<List>
													{this.renderRowsChan(this.state.channels)}
												</List>
											</AccordionDetails>
										</Accordion>
										<Accordion onClick={(e) => {e.stopPropagation();}} disableGutters sx={{backgroundColor: "#9e9e9e"}}>
											<AccordionSummary  expandIcon={<ArrowDropDownTwoToneIcon />}>
												Chats
											</AccordionSummary>
											<AccordionDetails>
												<List>
													{this.renderRowsFriend(this.state.friends)}
												</List>
											</AccordionDetails>
										</Accordion>
									</List>
								</Popper>
							</ClickAwayListener>
						</Stack>
					</Stack>
				</Box>
			</>
		)
	}
}