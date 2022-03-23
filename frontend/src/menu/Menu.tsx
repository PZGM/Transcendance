import { ButtonBase, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import button from '../style/buttons.module.css'
import React from "react";
import { borderRadius } from "@mui/system";

function MenuElement(props) {
	return (
		<button	className={button.menu}>
					<Link 	style={{ textDecoration: 'none',
									 color: 'white' }}
							to={{pathname: `${props.url}`}}>{props.name}</Link>
		</button>
	)
}

export default function Menu() {

	return (

		<React.Fragment>

			<div	onClick={() => window.open(process.env.REACT_APP_HOME, "_self")}
					className={button.exit_button}
					style={{backgroundColor: 'red',
							float: 'right',
							minHeight: '1vw', maxHeight: '2vw',
							minWidth: '1vw', maxWidth: '2vw'
						}}
			>
						<img	src={require('../asset/images/white_x.png')}
								style={{width: '100%'}}/>
			</div>

			<Stack	direction="column"
					justifyContent="space-evenly"
					alignItems="center" 
					spacing={1}
					sx={{width: "100%", height: "100%"}}>
				
				<MenuElement name={"Profile"} url={process.env.REACT_APP_PROFILE}/>
				<MenuElement name={"Friends"} url={process.env.REACT_APP_FRIENDS}/>
				<MenuElement name={"Settings"} url={process.env.REACT_APP_SETTINGS}/>
				<MenuElement name={"Match History"} url={process.env.REACT_APP_HISTORY}/>
				<MenuElement name={"Achievement"} url={process.env.REACT_APP_ACHIEVEMENT}/>
				
			</Stack>

		</React.Fragment>
	);
}