import { Grid } from "@mui/material";
import { Component} from "react";
import { UserAPI } from "../api/Users.api";
import Menu from "./Menu";
import background from "./../asset/images/background.jpg"
import { Outlet } from "react-router-dom";


export class Frame extends Component{

	render ()
	{
		return(

			// Background
			<div style={{
				backgroundImage: `url(${background})`,
				backgroundSize: 'cover',
				height: '100vh',
				width: '100vw',
				backgroundRepeat: 'norepeat',
				}}
			>
				<div style={{
					height: '100vh',
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					}}
				>
				<Grid	container
						justifyContent="space-between"
						wrap="nowrap"
						sx={{
								border: '0.5vw solid rgba(0, 70, 109, 1)',
								outline: '0.5vw solid rgba(0, 80, 117, 1)',
								backgroundColor: 'black',
								height: 'undefined',
								width: 'undefined',
								minWidth: "900px", minHeight: "900px",
								maxWidth: "1500px", maxHeight: "1500px"
							}}
				>

						<Grid	item xs={6}
								sx={{	m: 2,
										p: 2,
										border: '0.4vw solid rgba(142, 0, 172, 1)',
										outline: '0.4vw solid rgba(142, 0, 172, 0.5)',
										backgroundColor: 'black'
									}}
						>
							<Grid container
								direction="column"
								justifyContent="space-between"
								sx={{height: '100%'}}
								wrap="nowrap"
							>
								<Outlet/>
							</Grid>

						</Grid>

						<Grid item xs={5} sx={{m: 3, position: 'relative'}}>
							<Menu/>
						</Grid>
				</Grid>

				</div>
            </div>
        );
    };
}