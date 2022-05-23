import { Accordion, AccordionDetails, AccordionSummary, Box, ButtonBase, ClickAwayListener, List, Popper, Stack } from "@mui/material";
import { Component, useEffect, useState} from "react";
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';
import { Link } from "react-router-dom";
import { ChatAPI } from "../../../api/Chat.api";
import '../../../style/buttons.css'
import { UserAPI } from "../../../api/Users.api";
import CreateChannel from "../tools/CreateChannel"
import InfoIcon from '@mui/icons-material/Info';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useLocation } from 'react-router-dom';
import { UserDto } from "../../../api/dto/user.dto";

interface SelecterProps {
};

interface SelecterState {
	channels: string[];
	friends: UserDto;
	name: any;
	open: boolean;
	anchorEl: any;
};

let Hbar = "3.8vh";
let Hi = 15;
let Hchan = 25;

function Selecter (){
	let location = useLocation();
	const [channels, setChannels] = useState<string[]>([]);
	const [friends, setFriends] = useState<UserDto[]>([]);
	const [name, setName] = useState<string>("general");
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<any>(null);

    const getChannels = async () => {
        const channels = await ChatAPI.getChannelsNames();
		if (channels)
			setChannels(channels);
    }

    const getFriends = async () => {
        let friends = await UserAPI.getFriends();
		setFriends(friends);
    }
	
	useEffect(() => {
		if (channels === [])
		getChannels();
		if (friends === [])
			getFriends();
		setName(location.pathname.split('/')[3]);
	})

	const handleClick=(event: React.MouseEvent<HTMLElement>)=> {
		getChannels();
		getFriends();
		setOpen(!open);
		setAnchorEl(event.currentTarget)
	};

	const handleClickAway=()=> {
		setOpen(false);
	}

	const handleSelection = (name: string) => {
		setName(name);
		setOpen(false);
	}

	const renderRowsChan=(list) =>{
		const listItems = list.map((channel: string) =>
		<li key={channel}>
			<Link onClick={()=> {handleSelection(channel)}}	style={{ textDecoration: 'none', color: 'white'}} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + channel}}>
				<div className='bit9x9'> {channel} </div>
			</Link>
		</li>
	  );
	  return listItems;
	}
	
	const renderRowsFriend = (list) => {
		const listItems = list?.map((friend: any) =>
		<>
			<Link onClick={()=> {handleSelection(friend.login)}} style={{ textDecoration: 'none', color: 'white', marginBottom: 1}} to={{pathname: process.env.REACT_APP_MP + friend.login}}>
				<div className='bit9x9'>{friend.login}</div>
			</Link>
		</>
	  );
	  return listItems;
	}
// TODO mettre un filtre pour pas que notre compte apparaissent dans la liste car on peut pas s'envoyer de msg
	return (
		<>
			<Box width="19.5vw" height={Hbar} sx={{backgroundColor: "#03C7D8", display: "flex", justifyContent: "center", alignItems: "center"}}>
				<Stack direction="row" justifyContent="center" alignItems="center"  >
					<Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
						<Link style={{height: Hchan, width: Hi, textDecoration: 'none',fontSize: "large"}} to={{pathname: (location.pathname.search("/home/chat")) ? process.env.REACT_APP_USER + name + "/info" : process.env.REACT_APP_HOME_CHAN + "/" + name + "/info"}}>
							<InfoIcon sx={{backgroundColor: "#03C7D8",color: "white"}}/>
						</Link>
						<ButtonBase onClick={handleClick} style={{height: Hchan,fontSize: "large"}} >
							<div className='bit9x9'>{name}</div>
							<div>{(open == false)? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}</div>
						</ButtonBase>
						<ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClickAway}>
							<Popper sx={{paddingTop: "0.76vh",backgroundColor: "black"}} open={open} anchorEl={anchorEl}>
								<List sx={{maxHeight: "30.5vh", mb: -1, mt: -1}} disablePadding>
									<Accordion onClick={(e) => {e.stopPropagation();}} disableGutters sx={{backgroundColor: "black"}}>
										<AccordionSummary expandIcon={<ArrowDropDownTwoToneIcon style={{color: "white"}} />}>
											<div className='bit9x9' style={{color: "white"}}> Channels </div>
										</AccordionSummary>
										<AccordionDetails>
											<CreateChannel close={handleClickAway}/>
											<List sx={{display: "flex", justifyContent: "center"}}>
												<Stack direction="column">
													{renderRowsChan(channels)}
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
													{renderRowsFriend(friends)}
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

export default Selecter;