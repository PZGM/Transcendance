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
	channelName: string;
};

interface SelecterState {
	channels: string[];
	friends: any;
	name: any;
	open: boolean;
	anchorEl: any;
};

let Hbar = "3.8vh";
let Hi = 15;
let Hchan = 25;


export class Selecter extends Component<SelecterProps, SelecterState> {
	backdropopen: boolean = false;
	constructor(props: SelecterProps) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleClickAway = this.handleClickAway.bind(this);
		let name = window.location.pathname.split('/')[3];
		if (!name)
			name = 'Channels'
		this.state = {channels: [], friends: [], name, open: false, anchorEl: null};	
	}

    async getChannels() {
        const channels = await ChatAPI.getChannelsNames();
		if (channels)
			this.setState({channels: channels});
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
	  };

	handleClickAway() {
		this.setState({
			open: false
		})
	}
	renderRowsChan(list) {
		const listItems = list.map((channel: string) =>
		<li key={channel}>
			<Link onClick={()=> {this.updateName(channel)}}	style={{ textDecoration: 'none', color: 'white'}} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + channel}}>
				<div className='bit9x9'> {channel} </div>
			</Link>
		</li>
	  );
	  return listItems;
	}
	
	renderRowsFriend(list) {
		const listItems = list?.map((friend: any) =>
		<>
			<Link onClick={()=> {this.updateName(friend.login)}} style={{ textDecoration: 'none', color: 'white', marginBottom: 1}} to={{pathname: process.env.REACT_APP_MP + friend.login}}>
				<div className='bit9x9'>{friend.login}</div>
			</Link>
		</>
	  );
	  return listItems;
	}
// TODO mettre un filtre pour pas que notre compte apparaissent dans la liste car on peut pas s'envoyer de msg
	render () {
		return (
			<>
				<Box width="100%" height={Hbar} sx={{backgroundColor: "#03C7D8",display: "flex", justifyContent: "center", alignItems: "center"}}>
					<Stack direction="row" justifyContent="center" alignItems="center"  >
						<Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
							<Link style={{height: Hchan, width: Hi, textDecoration: 'none',fontSize: "large"}} to={{pathname: (window.location.pathname.search("/home/chat")) ? process.env.REACT_APP_USER + "" + this.state.name + "/info" : process.env.REACT_APP_HOME_CHAN + "/" + this.state.name + "/info"}}>
								<InfoIcon sx={{backgroundColor: "#03C7D8",color: "white"}}/>
							</Link>
							<ButtonBase onClick={this.handleClick} style={{height: Hchan,fontSize: "large"}} >
								<div className='bit9x9'>{this.state.name}</div>
							</ButtonBase>
							<ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={this.handleClickAway}>
								<Popper sx={{paddingTop: "0.76vh",backgroundColor: "black"}} open={this.state.open} anchorEl={this.state.anchorEl}>
									<List sx={{maxHeight: "30.5vh", mb: -1, mt: -1}} disablePadding>
										<Accordion onClick={(e) => {e.stopPropagation();}} disableGutters sx={{backgroundColor: "black"}}>
											<AccordionSummary expandIcon={<ArrowDropDownTwoToneIcon style={{color: "white"}} />}>
												<div className='bit9x9' style={{color: "white"}}> CHannels </div>
											</AccordionSummary>
											<AccordionDetails>
												<CreateChannel/>
												<List sx={{display: "flex", justifyContent: "center"}}>
													<Stack direction="column">
														{this.renderRowsChan(this.state.channels)}
													</Stack>
												</List>
											</AccordionDetails>
										</Accordion>
										<Accordion onClick={(e) => {e.stopPropagation();}} disableGutters sx={{backgroundColor: "black"}}>
											<AccordionSummary  expandIcon={<ArrowDropDownTwoToneIcon style={{color: "white"}}/>}>
												<div className='bit9x9' style={{color: "white"}}> Chats </div>
											</AccordionSummary>
											<AccordionDetails>
												<List sx={{display: "flex", justifyContent: "center"}}>
													<Stack direction="column">
														{this.renderRowsFriend(this.state.friends)}
													</Stack>
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