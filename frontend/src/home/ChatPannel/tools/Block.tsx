import * as React from 'react';
import { Button, ButtonBase, Dialog, DialogContent, Stack } from "@mui/material";
import '../../../style/buttons.css'
import '../../../style/colors.css'
import { UserAPI } from '../../../api/Users.api';
import { ChatAPI } from '../../../api/Chat.api';
import "../../../style/input.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import JoinChannel from './JoinChannel'
// TODO Faire une jolie pop up avec un msg d'erreur si le nom du chan est deja use ou si un mdp n'a pas ete donne pour un chan 

function BlockUser(props) {
	// le temps est en min pour l'instant
	const [openBlock, setOpenBlock] = React.useState(false);
	const [time, setTime] = React.useState(60);
	

	const handleCancelBlock= () =>
	{
		setTime(60);
		setOpenBlock(false);
	}


	const handleBlock= () =>
	{
		setTime(60);
		setOpenBlock(false);
	}

	return (
		<>
			<div className={"home_button but_red"} onClick={()=> {setOpenBlock(true)}}>
				<div className='bit5x5'> Block </div>
			</div>
			<Dialog open={openBlock} onClose={handleCancelBlock}>
				<DialogContent sx={{backgroundColor: "black",border: 5, borderColor: "#8e00ae"}}>
					<Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
						<div className='bit5x5' style={{color: "white"}}> For how long ? </div>
						<Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
							<ButtonBase centerRipple className={"home_button but_" + ((time === 60)? "blue": "cyan")} style={{backgroundColor: (time === 60)? "blue": "cyan"}} onClick={() => {setTime(60)}}>
								{ (time === 60) ? <div className='bit5x5'style={{color: "white"}}> 1H </div>:
								<div className='bit5x5'> 1H </div>}
							</ButtonBase>
							<ButtonBase centerRipple className={"home_button but_" + ((time === 480)? "blue": "cyan")} style={{backgroundColor: (time === 480)? "blue": "cyan"}} onClick={() => {setTime(480)}}>
								{ (time === 480) ? <div className='bit5x5'style={{color: "white"}}> 8H </div>:
								<div className='bit5x5'> 8H </div>}
							</ButtonBase>
							<ButtonBase centerRipple className={"home_button but_" + ((time === 42)? "blue": "cyan")} style={{backgroundColor: (time === 42)? "blue": "cyan"}} onClick={() => {setTime(42)}}>
								{ (time === 42) ? <div className='bit5x5'style={{color: "white"}}> for life </div>:
								<div className='bit5x5'> for life </div>}
							</ButtonBase>
						</Stack>
						<Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
							<div className="home_button but_red" onClick={handleCancelBlock}>
								<div className='bit5x5' > Cancel </div>
							</div>
							<div onClick={handleBlock} className="home_button but_red">
								<div className='bit5x5'> Block </div>
							</div>
						</Stack>
					</Stack>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default BlockUser;


