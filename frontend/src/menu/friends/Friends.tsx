import { Avatar, Box, Button, Card, Stack, Grid, ListItem, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import CloseIcon from '@mui/icons-material/Close';

const widthBox = 700;
const heightBox = 500;

interface FriendsProps {
};


function renderRow(props: ListChildComponentProps) {
	const { index, style } = props;
  
	return (
	  <ListItem style={style} key={index} component="div" disablePadding>
		<ListItemButton>
		  <ListItemText primary={`Item ${index + 1}`} />
		</ListItemButton>
	  </ListItem>
	);
  }


export class Friends extends Component<FriendsProps> {
	constructor(props: FriendsProps) {
		super(props);
	}
	render (){
		return(
			<div>
				<Helmet>
					<style>{'body { background-color: black; }'}</style>
				</Helmet>
				{/* <Button component={Link} to={process.env.REACT_APP_HOME as string} sx={{width: '100%', height: '5%',backgroundColor: 'yellow'}}>
				</Button> */}

				<Box m="10%" p="10px" display="flex" width="100% - 3px" height="100% - 3px" bgcolor="white" sx={{border: '3px solid grey' }}>
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
								<Box sx={{ p: 1, border: '3px solid grey' }}  width="100%" height="100%">
									<TextField fullWidth label="Search User"/>
									<FixedSizeList
										height={400}
										width="100%"
										itemSize={46}
										itemCount={200}
										overscanCount={5}
									>
										{renderRow}
									</FixedSizeList>
								</Box>
							</Box>
						</Grid>
				</Box>
			</div>
		);
	};
}
