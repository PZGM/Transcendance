import { Avatar, Box, Button, Card, Grid, Typography } from "@mui/material";
import { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FirstRow } from "./First_Row";
import { ThirdRow } from "./Third_Row";
import { SecondRow } from "./Second_Row";

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
				<Button component={Link} to={process.env.REACT_APP_HOME as string} sx={{width: '100%', height: '5%',backgroundColor: 'yellow'}}>
				</Button>

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
							<Box m="auto"  width="70%">
								<Box sx={{ p: 1, border: '3px solid grey' }}  width="100%">
									<Grid container direction="column" justifyContent="space-between" alignItems="center">
										<FirstRow/>
										<SecondRow/>
										<ThirdRow/>
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