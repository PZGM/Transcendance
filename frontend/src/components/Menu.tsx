import { Avatar, Box, Button, Card, Grid } from "@mui/material";
import { Component } from "react";
import { Helmet } from "react-helmet";
import { Profile } from '../menu/profile/Profile'
import { Link } from "react-router-dom";

interface MenuProps {
};

export class Menu extends Component<MenuProps> {
	constructor(props: MenuProps) {
		super(props);
	}
	render (){
		return(
			<div>
				<Helmet>
					<style>{'body { background-color: black; }'}</style>
				</Helmet>

				<Box m={45} display="flex" width={500} height={500} bgcolor="lightblue" sx={{border: '3px solid grey' }}>
					<Box m="auto">
						<Card sx={{ width: 500, height: 500 }} style={{ justifyContent: "center", display: "flex" }}>
							<Grid container direction="row-reverse"   justifyContent="space-evenly"  alignItems="stretch">
								<Box m="auto">
									<Grid container direction="column" justifyContent="space-evenly" alignItems="center">
										<Avatar variant='circular' alt="Semy Sharp" src="/static/images/avatar/1.jpg" sx={{ }}/>
										<Button component={Link} to={process.env.REACT_APP_PROFILE as string}>Profile</Button>
										<Button component={Link} to={process.env.REACT_APP_FRIENDS as string}>Friends</Button>
										<Button component={Link} to={process.env.REACT_APP_SETTINGS as string}>Settings</Button>
										<Button component={Link} to={process.env.REACT_APP_HISTORY as string}>Match History</Button>
										<Button component={Link} to={process.env.REACT_APP_ACHIEVEMENT as string}>Achievement</Button>
									</Grid>
								</Box>
								<Box m="auto">
									<Profile/>
								</Box>
							</Grid>
						</Card>
					</Box>
				</Box>
			</div>
		);
	}
}