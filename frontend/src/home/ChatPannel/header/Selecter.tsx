import { Accordion, AccordionDetails, AccordionSummary, Box, ButtonBase, ClickAwayListener, List, Popper, Stack } from "@mui/material";
import { useEffect, useState} from "react";
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';
import { Link } from "react-router-dom";
import { ChatAPI } from "../../../api/Chat.api";
import '../../../style/buttons.css'
import { UserAPI } from "../../../api/Users.api";
import CreateChannel from "../tools/CreateChannel"
import InfoIcon from '@mui/icons-material/Info';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserDto } from "../../../api/dto/user.dto";


interface SelecterState {
	channels: string[];
	friends: UserDto;
	name: any;
	open: boolean;
	anchorEl: any;
};

let Hi = 15;
let Hchan = 25;

function Selecter (props){
	let navigate = useNavigate();
	let location = useLocation();
	const [channels, setChannels] = useState<string[]>([]);
	const [friends, setFriends] = useState<UserDto[]>([]);
	const [name, setName] = useState<string>("general");
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<any>(null);

    const getChannels = async () => {
        const channels = await ChatAPI.getChannelsNames();
		setChannels(channels);
    }

    const getFriends = async () => {
        let friends = await UserAPI.getFriends();
		setFriends(friends);
    }
	
	useEffect(() => {
		setName(location.pathname.split('/')[3]);
		if(location.pathname.search("/home/chat") && name === props.login)
			navigate('404')
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

	const handleSelectionChan = (name: string) => {
		setName(name);
		setOpen(false);
		navigate(process.env.REACT_APP_HOME_CHAN + "/" + name);
	}
	const handleSelectionUser = (name: string) => {
		setName(name);
		setOpen(false);
		navigate(process.env.REACT_APP_MP + name);
	}

	const handleSelectionFriend = (name: string) => {
		setName(name);
		setOpen(false);
		navigate(process.env.REACT_APP_HOME_PRIVATE_MESSAGE + "/" + name);
	}

	const renderRowsChan=(list) =>{
		const listItems = list.map((channel: string) =>
		<li key={channel}>
			<div className={"creajoin_button"} onClick={()=> {handleSelectionChan(channel)}}	style={{ textDecoration: 'none', color: 'white'}}>
				<div className='bit9x9'> {channel} </div>
			</div>
		</li>
	  );
	  return listItems;
	}
	
	const renderRowsFriend = (list) => {
		const listItems = list?.map((friend: UserDto) =>
		<li key={friend.login}>
			<div className={"creajoin_button"} onClick={()=> {handleSelectionFriend(friend.login)}} style={{ textDecoration: 'none', color: 'white'}}>
				<div className='bit9x9'>{friend.login}</div>
			</div>
		</li>
	  );
	  return listItems;
	}

	return (
		<>
			<Box className="selecter">
				<Stack direction="row" justifyContent="center" alignItems="center"  >
					<Stack direction="row" justifyContent="center" alignItems="center" spacing={2} >
						<Link style={{height: Hchan, width: Hi, textDecoration: 'none',fontSize: "large"}} to={{pathname: (location.pathname.search("/home/chat")) ? process.env.REACT_APP_USER + name + "/info" : process.env.REACT_APP_HOME_CHAN + "/" + name + "/info"}}>
							<InfoIcon sx={{backgroundColor: "#03C7D8",color: "white"}}/>
						</Link>
						<ButtonBase onClick={handleClick} style={{height: Hchan,fontSize: "large"}} >
							<div className='bit9x9'>{name}</div>
							<div>{(open === false)? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>}</div>
						</ButtonBase>
						<ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClickAway}>
							<Popper sx={{paddingTop: "0.76vh",backgroundColor: "black",border: 5, borderColor: "#8e00ae", paddingBottom: 1}} open={open} anchorEl={anchorEl}>
								<List sx={{maxHeight: "30.5vh", mb: -1, mt: -1}} disablePadding>
									<Accordion onClick={(e) => {e.stopPropagation();}} disableGutters sx={{backgroundColor: "black"}}>
										<AccordionSummary expandIcon={<ArrowDropDownTwoToneIcon style={{color: "white"}} />}>
											<div className='bit9x9' style={{color: "white"}}> Channels </div>
										</AccordionSummary>
										<AccordionDetails>
											<CreateChannel close={handleClickAway}/>
											<Stack direction="column"  justifyContent="center" alignItems="center" spacing={1}>
												{renderRowsChan(channels)}
											</Stack>
										</AccordionDetails>
									</Accordion>
									<Accordion onClick={(e) => {e.stopPropagation();}} disableGutters sx={{backgroundColor: "black"}}>
										<AccordionSummary  expandIcon={<ArrowDropDownTwoToneIcon style={{color: "white"}}/>}>
											<div className='bit9x9' style={{color: "white"}}> Chats </div>
										</AccordionSummary>
										<AccordionDetails>
											<Stack direction="column" justifyContent="center" alignItems="center" spacing={1}>
												{renderRowsFriend(friends)}
											</Stack>
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