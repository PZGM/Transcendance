import { Avatar, Box, Button, Card, Grid, ListItem, ListItemButton, ListItemText, TextField, Typography } from "@mui/material";
import { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FixedSizeList, ListChildComponentProps } from "react-window";

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

				<Box m="20%" display="flex" width={widthBox} height={heightBox} bgcolor="lightblue" sx={{border: '3px solid grey' }}>
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
							<Box m="auto">
								<Box sx={{ p: 1, border: '3px solid grey' }}  width="115%" height="100%">
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
					</Card>
				</Box>
			</div>
		);
	};
}
