import { ButtonBase, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import button from '../style/buttons.module.css'
import React from "react";
import { borderRadius } from "@mui/system";


export default function MenuButton() {

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
				
				<button	className={button.menu}
						onClick={() => window.open(process.env.REACT_APP_PROFILE, "_self")}>
							Profile </button>
				<button	className={button.menu}
						onClick={() => window.open(process.env.REACT_APP_FRIENDS, "_self")}>
							Friends </button>
				<button	className={button.menu}
						onClick={() => window.open(process.env.REACT_APP_SETTINGS, "_self")}>
								Settings </button>
				<button	className={button.menu}
						onClick={() => window.open(process.env.REACT_APP_HISTORY, "_self")}>
							Match History </button>
				<button	className={button.menu}
						onClick={() => window.open(process.env.REACT_APP_ACHIEVEMENT, "_self")}>
							Achievement </button>
			</Stack>

		</React.Fragment>
	);
}