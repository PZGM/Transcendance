import { Avatar, Box, Button, Stack, Card, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
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
import CloseIcon from '@mui/icons-material/Close';


const widthBox = 700;
const heightBox = 500;

const theme = createTheme({
	palette: {
		primary: {
			main: '#E50033',
		}
	},
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

				<Box m="10%" p="10px" display="flex" width="100% - 3px" maxHeight="100% - 3px" bgcolor="white" sx={{border: '3px solid grey' }}>
					<Grid container direction="row-reverse"   justifyContent="space-between"  alignItems="stretch">
						<Box width="25%">
								<Stack direction="column" justifyContent="space-evenly" alignItems="center" spacing={2}>
									<Stack direction="row" justifyContent="flex-end" alignItems="flex-start" sx={{width: "100%"}}>
										<Button component={Link} to={process.env.REACT_APP_HOME as string} sx={{backgroundColor: 'red'}}><CloseIcon/></Button>
									</Stack>
									<Avatar variant='circular' alt="Semy Sharp" src="/static/images/avatar/1.jpg" sx={{ }}/>
									{/* <Typography>{this.state.login}</Typography> */}
									<Typography>AFREIRE-</Typography>
									<Button component={Link} to={process.env.REACT_APP_PROFILE as string}>Profile</Button>
									<Button component={Link} to={process.env.REACT_APP_FRIENDS as string}>Friends</Button>
									<Button component={Link} to={process.env.REACT_APP_SETTINGS as string}>Settings</Button>
									<Button component={Link} to={process.env.REACT_APP_HISTORY as string}>Match History</Button>
									<Button component={Link} to={process.env.REACT_APP_ACHIEVEMENT as string}>Achievement</Button>
									<Box></Box>
								</Stack>
						</Box>
						<Box width="70%">
							<Grid container direction="column" justifyContent="center" alignItems="center">
								<Avatar  variant='circular' alt="Semy Sharp" src="/static/images/avatar/1.jpg" sx={{diaplay:"flex"}}/>
								<Typography align="center">AFREIRE-</Typography>
								<Box sx={{ p: 1, border: '3px solid grey' }}  width="100%">
									<Stack direction="row" justifyContent="space-evenly" alignItems="center" spacing={2}>

										<Stack direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
											<GamepadIcon />
											<EmojiEventsIcon />
											<FaceIcon />
											<CancelIcon />
											<StarIcon />
										</Stack>

										<Stack direction="column" justifyContent="flex-start" alignItems="center" spacing={2}>
											<Typography>GAMES</Typography>
											<Typography>WIN</Typography>
											<Typography>SHOTS</Typography>
											<Typography>ACCURANCY</Typography>
											<Typography>RANK</Typography>
										</Stack>

										<Stack direction="column" justifyContent="space-between" alignItems="center" spacing={2}>
											<Typography>50</Typography>
											<Typography>2</Typography>
											<Typography>40</Typography>
											<Typography>5%</Typography>
											<Typography>1st</Typography>
										</Stack>

									</Stack>
								</Box>
							</Grid>
						</Box>
					</Grid>
				</Box>
			</div>
		);
	};
}

