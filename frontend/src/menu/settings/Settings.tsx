import { Avatar, Box, Button, Card, Divider, Grid, TextField, Typography } from "@mui/material";
import { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";


const widthBox = 700;
const heightBox = 500;

interface SettingsProps {
};



export class Settings extends Component<SettingsProps> {
	constructor(props: SettingsProps) {
		super(props);
	}
	render (){
		return(
            <div>
				<Helmet>
					<style>{'body { background-color: black; }'}</style>
				</Helmet>
				<Button component={Link} to={process.env.REACT_APP_HOME as string} sx={{width: '100%', height: '5%',backgroundColor: 'yellow'}}>
				</Button>

				<Box m="10%" display="flex" width={widthBox} height={heightBox} bgcolor="lightblue" sx={{border: '3px solid grey' }}>
					<Card sx={{ width: "100%", height: "100%" }} style={{ justifyContent: "center", display: "flex" }}>
						<Grid container direction="row-reverse"   justifyContent="space-between"  alignItems="stretch">
							<Box m="auto">
								<Grid container direction="column" justifyContent="space-evenly" alignItems="center">
									<Avatar variant='circular' alt="Semy Sharp" src="/static/images/avatar/1.jpg" sx={{ }}/>
									<Typography>AFREIRE-</Typography>
									<Button component={Link} to={process.env.REACT_APP_PROFILE as string}>Profile</Button>
									<Button component={Link} to={process.env.REACT_APP_FRIENDS as string}>Friends</Button>
									<Button component={Link} to={process.env.REACT_APP_SETTINGS as string}>Settings</Button>
									<Button component={Link} to={process.env.REACT_APP_HISTORY as string}>Match History</Button>
									<Button component={Link} to={process.env.REACT_APP_ACHIEVEMENT as string}>Achievement</Button>
								</Grid>
							</Box>
							<Box m="auto" width="70%">
								<Box sx={{ p: 1, border: '3px solid grey' }}  width="100%" height="100%">
									<Grid container direction="column" justifyContent="space-evenly" alignItems="center">
										<Grid container direction="row" justifyContent="space-between" alignItems="baseline">
											<Typography>NICKNAME</Typography>
											<TextField label="AFREIRE-"></TextField>
											<Button  variant="contained">EDIT</Button>
										</Grid>
										<Divider />
										<Grid container direction="row" justifyContent="space-between" alignItems="baseline">
											<Typography>AVATAR</Typography>
											<Avatar variant='circular' alt="Semy Sharp" src="/static/images/avatar/1.jpg" sx={{ }}/>
											<Button variant="contained">EDIT</Button>
										</Grid>
										<Divider />
										<Grid container direction="row" justifyContent="space-between" alignItems="baseline">
											<Typography>2FA</Typography>
											<Button variant="contained">ON</Button>
											<Button variant="contained">OFF</Button>
										</Grid>
										<Divider />
										<Grid container direction="row" justifyContent="space-between" alignItems="baseline">
											<Typography>STATUS</Typography>
											<Button variant="contained">VISIBLE</Button>
										</Grid>
										<Divider />
										<Grid container direction="column" justifyContent="space-between" alignItems="center">
											<Typography>OTHER AUTH METHODS</Typography>
											<Button  variant="contained" style={{width: '100%', height: '100%'}}>GOOGLE</Button>
											<Button  variant="contained" style={{width: '100%', height: '100%'}}>META</Button>
										</Grid>
									</Grid>
								</Box>
							</Box>
						</Grid>
					</Card>
				</Box>
            </div>
        );
    };
}
