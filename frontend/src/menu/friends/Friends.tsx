import { Avatar, Box, Button, Card, Grid, Stack, InputBase, List, ListItemButton, ListItemText, styled, TextField, Typography } from "@mui/material";
import { sizing } from '@mui/system';
import { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { UserDisplay } from "./UserDisplay";
import styles from './../../style/dac.module.css'
import background from "./../../asset/images/background.jpg"

const widthBox = 700;
const heightBox = 500;

interface FriendsProps {
};

export class Friends extends Component<FriendsProps> {
	constructor(props: FriendsProps) {
		super(props);
	}
	render (){
		return(
			<div style={{
				backgroundImage: `url(${background})`,
				// backgroundPosition: 'center',
				backgroundSize: 'cover',
				height: '100vh',
				width: '100vw',
				backgroundRepeat: 'norepeat'
			}}>
				<Stack
					direction="column"
					justifyContent="space-between"
					alignItems="center"
					className="test"
					sx={{mx: '10%'}}
				>
				<Grid container></Grid>
				<Grid container justifyContent="space-between" alignItems="stretch"
					sx={{border: '10px solid rgba(0, 70, 109, 1)', outline: '10px solid rgba(0, 80, 117, 1)', backgroundColor: 'black'}}>
							
						<Grid item xs={8}>
							{/* <Box m="2%" width='100%' sx={{p: 1, border: '9px solid rgba(142, 0, 172, 1)', outline: '9px solid rgba(142, 0, 172, 0.5)', backgroundColor: 'black'}}> */}
								<InputBase
									fullWidth
									inputProps={{min: 0, style: { textAlign: 'center' }}}
									className={styles.input}
									placeholder="Search Friend"
								/>
								<List style={{height: '100%'}}>
                                    <UserDisplay id={1} index={0}/>
                                    <UserDisplay id={2} index={1}/>
                                    <UserDisplay id={3} index={2}/>

                                </List>
							{/* </Box> */}
						</Grid>

						<Grid item xs={2}>
							{/* <Box m='2%' width='100%' sx={{p: 1, border: '9px solid rgba(142, 0, 172, 1)', outline: '9px solid rgba(142, 0, 172, 0.5)', backgroundColor: 'black'}}> */}
								<Grid container direction="column" justifyContent="center" alignItems="center">
									<Avatar variant='circular' alt="Semy Sharp" src="/static/images/avatar/1.jpg" sx={{ }}/>
									{/* <Typography>{this.state.login}</Typography> */}
									<Typography>AFREIRE-</Typography>
									<Button component={Link} to={process.env.REACT_APP_PROFILE as string}><div className='arcademenu'>Profile</div></Button>
									<Button component={Link} to={process.env.REACT_APP_FRIENDS as string}><div className='arcademenu'>Friends</div></Button>
									<Button component={Link} to={process.env.REACT_APP_SETTINGS as string}><div className='arcademenu'>Settings</div></Button>
									<Button component={Link} to={process.env.REACT_APP_HISTORY as string}><div className='arcademenu'>Match History</div></Button>
									<Button component={Link} to={process.env.REACT_APP_ACHIEVEMENT as string}><div className='arcademenu'>Achievments</div></Button>
								</Grid>
							{/* </Box> */}
						</Grid>
								

				</Grid>
				<Grid container></Grid>

				</Stack>
			</div>
		);
	};
}
