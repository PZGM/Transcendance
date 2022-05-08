import { Grid } from "@mui/material";
import { Component} from "react";
import Menu from "./Menu";
import background from "./../asset/images/background.jpg"
import { Outlet } from "react-router-dom";
import "../style/display.css";


export class Frame extends Component{

	render ()
	{
		return (

			<div className="background">
				<div className="frame_div">
					<Grid	container
							justifyContent="space-between"
							wrap="nowrap"
							className="frame"
					>
						<Grid	item xs={6}
								className="internal_frame"
								m={2}
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

						<Grid item xs={5} sx={{	m: 3,
												position: 'relative'}}
						>
							<Menu/>
						</Grid>
					</Grid>
				</div>
            </div>
        );
    };
}