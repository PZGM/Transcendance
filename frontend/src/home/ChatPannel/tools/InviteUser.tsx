import * as React from 'react';
import { ButtonBase, Dialog, DialogContent, Stack } from "@mui/material";
import '../../../style/buttons.css'
import '../../../style/colors.css'
import "../../../style/input.css"
import 'react-toastify/dist/ReactToastify.css';

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
			<div className="send_msg_button but_green" onClick={ () => {setOpenInvite(true)}}>
				<img src={require('../../../asset/images/logo512.png')} style={{width: '100%'}} alt='cross'/>
			</div>

			<Dialog open={openInvite} onClose={handleCancelInvite}>
				<DialogContent sx={{backgroundColor: "black",border: 5, borderColor: "#8e00ae"}}>
					<Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
						<div className='bit5x5' style={{color: "white"}}> {"Play against " + props.p1} </div>
						<Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{fontSize: "0.7vw"}}>
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
						<Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{fontSize: "0.7vw"}}>
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