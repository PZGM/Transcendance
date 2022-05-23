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


enum color {
    'white',
    'red',
    'yellow',
    'green',
    'blue'
}

enum description {
    'unknow',
    'offline',
    'invite idle',
    'invite',
    'watch match'
}

enum Difficulty {
	Easy,
	Medium,
	Hard
}


function Invite(props) {
	// le temps est en min pour l'instant
	const [openInvite, setOpenInvite] = React.useState(false);
    const [dif, setDif] = React.useState(Difficulty[0])

	const handleCancelInvite= () =>
	{
		setOpenInvite(false);
	}


	const handleInvite= () =>
	{
		setOpenInvite(false);
	}

	return (
		<>
			<div className={"home_button but_" + color[props.status]} onClick={()=> {if (props.status === 2 || props.status === 3) {setOpenInvite(true);}}}>
				<div className='bit5x5'> {description[props.status]} </div>
			</div>
			<Dialog open={openInvite} onClose={handleCancelInvite} sx={{backgroundColor: "black",border: 5, borderColor: "#8e00ae"}}>
				<DialogContent sx={{backgroundColor: "black",border: 5, borderColor: "#8e00ae"}}>
					<Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
						<div className='bit5x5' style={{color: "white"}}> {"Play against " + props.p1} </div>
						<Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
							<ButtonBase centerRipple className={"home_button but_" + ((dif === Difficulty[0])? "blue": "cyan")} style={{backgroundColor: (dif === Difficulty[0])? "blue": "cyan"}} onClick={() => {setDif(Difficulty[0])}}>
								{ (dif === Difficulty[0]) ? <div className='bit5x5'style={{color: "white"}}> Easy </div>:
								<div className='bit5x5'> Easy </div>}
							</ButtonBase>
							<ButtonBase centerRipple className={"home_button but_" + ((dif === Difficulty[1])? "blue": "cyan")} style={{backgroundColor: (dif === Difficulty[1])? "blue": "cyan"}} onClick={() => {setDif(Difficulty[1])}}>
								{ (dif === Difficulty[1]) ? <div className='bit5x5'style={{color: "white"}}> Medium </div>:
								<div className='bit5x5'> Medium </div>}
							</ButtonBase>
							<ButtonBase centerRipple className={"home_button but_" + ((dif === Difficulty[2])? "blue": "cyan")} style={{backgroundColor: (dif === Difficulty[2])? "blue": "cyan"}} onClick={() => {setDif(Difficulty[2])}}>
								{ (dif === Difficulty[2]) ? <div className='bit5x5'style={{color: "white"}}> Hard </div>:
								<div className='bit5x5'> Hard </div>}
							</ButtonBase>
						</Stack>
						<Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
							<div className="home_button but_red" onClick={handleCancelInvite}>
								<div className='bit5x5' > Cancel </div>
							</div>
							<div onClick={handleInvite} className="home_button but_red">
								<div className='bit5x5'> Invite </div>
							</div>
						</Stack>
					</Stack>
				</DialogContent>
			</Dialog>
		</>
	);
}

export default Invite;