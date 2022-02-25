import { Avatar, Box, Stack, Button, Card, Grid, Typography } from "@mui/material";
import { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FirstRow } from "./First_Row";
import { ThirdRow } from "./Third_Row";
import { SecondRow } from "./Second_Row";
import CloseIcon from '@mui/icons-material/Close';

const widthBox = 700;
const heightBox = 500;

interface AchievementProps {
};

export class Achievement extends Component<AchievementProps> {
	constructor(props: AchievementProps) {
		super(props);
	}
	render (){
		return(
            <div>
				<Helmet>
					<style>{'body { background-color: black; }'}</style>
				</Helmet>

				<Box m="10%" p="10px" display="flex" width="auto" height="auto" bgcolor="white" sx={{border: '3px solid grey' }}>
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
							<Box sx={{ p: 1, border: '3px solid grey' }}  width="100%">
								<Grid container direction="column" justifyContent="space-between" alignItems="center">
									<FirstRow/>
									<SecondRow/>
									<ThirdRow/>
								</Grid>
							</Box>
						</Box>
					</Grid>
				</Box>
            </div>
        );
    };
}