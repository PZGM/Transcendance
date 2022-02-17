import { Avatar, Box, Button, Card, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Component } from "react";
import GamepadIcon from '@mui/icons-material/Gamepad';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FaceIcon from '@mui/icons-material/Face';
import CancelIcon from '@mui/icons-material/Cancel';
import StarIcon from '@mui/icons-material/Star';
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { createTheme } from '@mui/material/styles';


const widthBox = 700;
const heightBox = 500;

const theme = createTheme({
	palette: {
		primary: {
			main: '#E50033',
		}
	}
});



interface ProfileProps {
};

export class Profile extends Component<ProfileProps> {
	constructor(props: ProfileProps) {
		super(props);
	}
	render (){
		return(
			<div>
				<Helmet>
					<style>{'body { background-color: black; }'}</style>
				</Helmet>

				<Button variant="contained" component={Link} to={process.env.REACT_APP_HOME as string} sx={{width: '100%', height: '5%'}} color="primary">
				</Button>

				<Box m="20%" display="flex" width={widthBox} height={heightBox} bgcolor="lightblue" sx={{border: '3px solid grey' }}>
					<Card sx={{ width: "100%", height: "100%" }} style={{ justifyContent: "center", display: "flex" }}>
						<Grid container direction="row-reverse"   justifyContent="space-evenly"  alignItems="stretch">
							<Box m="auto">
								<Grid container direction="column" justifyContent="space-evenly" alignItems="center">
									<Button component={Link} to={process.env.REACT_APP_PROFILE as string}>Profile</Button>
									<Button component={Link} to={process.env.REACT_APP_FRIENDS as string}>Friends</Button>
									<Button component={Link} to={process.env.REACT_APP_SETTINGS as string}>Settings</Button>
									<Button component={Link} to={process.env.REACT_APP_HISTORY as string}>Match History</Button>
									<Button component={Link} to={process.env.REACT_APP_ACHIEVEMENT as string}>Achievement</Button>
								</Grid>
							</Box>
							<Box m="auto"  width="70%">
								<Grid container direction="column" justifyContent="center" alignItems="center">
									<Avatar  variant='circular' alt="Semy Sharp" src="/static/images/avatar/1.jpg" sx={{diaplay:"flex"}}/>
									<Typography align="center">AFREIRE-</Typography>
									<Box sx={{ p: 1, border: '3px solid grey' }}  width="100%">
										<List>
											<ListItem>
												<ListItemIcon>
													<GamepadIcon />
												</ListItemIcon>
												<ListItemText primary="GAMES"/>
												<ListItemText>50</ListItemText>
											</ListItem>
											
											<ListItem>
												<ListItemIcon>
													<EmojiEventsIcon />
												</ListItemIcon>
												<ListItemText primary="WINS"/>
												<ListItemText>2</ListItemText>
											</ListItem>

											<ListItem>
												<ListItemIcon>
													<FaceIcon />
												</ListItemIcon>
												<ListItemText primary="SHOTS"/>
												<ListItemText>40</ListItemText>
											</ListItem>

											<ListItem>
												<ListItemIcon>
													<CancelIcon />
												</ListItemIcon>
												<ListItemText primary="ACCURACY"/>
												<ListItemText>5%</ListItemText>
											</ListItem>

											<ListItem>
												<ListItemIcon>
													<StarIcon />
												</ListItemIcon>
												<ListItemText primary="RANK"/>
												<ListItemText>1st</ListItemText>
											</ListItem>
										</List>
									</Box>
								</Grid>
							</Box>
						</Grid>
					</Card>
				</Box>




			</div>
		);
	};
}