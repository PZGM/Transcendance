import { Avatar, Box, Button, Card, Grid, Stack, InputBase, ListItem, ListItemButton, ListItemText, styled, TextField, Typography } from "@mui/material";
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


function renderRow(props: ListChildComponentProps) {
	const { index, style } = props;
  
	return (
		<div style={style}>
			<UserDisplay id={index + 1} index={index}/>
		</div>
	);
  }

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
				<Grid container
					sx={{border: '10px solid rgba(0, 70, 109, 1)', outline: '10px solid rgba(0, 80, 117, 1)', backgroundColor: 'black', height: '80vh', width: '100wh' }}>
							
							<Box m="2%" width='60%' sx={{p: 1, border: '9px solid rgba(142, 0, 172, 1)', outline: '9px solid rgba(142, 0, 172, 0.5)', backgroundColor: 'black'}}>
								<InputBase
									fullWidth
									inputProps={{min: 0, style: { textAlign: 'center' }}}
									className={styles.input}
									placeholder="Search Friend"
								/>
								<FixedSizeList
									height={800}
									width='100%'
									itemSize={75}
									itemCount={15}
									overscanCount={5}
								>
									{renderRow}
								</FixedSizeList>
							</Box>

							<Box m="2%" width='20%'>
								<Grid container direction="column" justifyContent="space-evenly" alignItems="center">
									<Avatar variant='circular' alt="Semy Sharp" src="/static/images/avatar/1.jpg" sx={{ }}/>
									{/* <Typography>{this.state.login}</Typography> */}
									<Typography>AFREIRE-</Typography>
									<Button component={Link} to={process.env.REACT_APP_PROFILE as string}><div className='arcademenu'>Profile</div></Button>
									<Button component={Link} to={process.env.REACT_APP_FRIENDS as string}><div className='arcademenu'>Friends</div></Button>
									<Button component={Link} to={process.env.REACT_APP_SETTINGS as string}><div className='arcademenu'>Settings</div></Button>
									<Button component={Link} to={process.env.REACT_APP_HISTORY as string}><div className='arcademenu'>Match History</div></Button>
									<Button component={Link} to={process.env.REACT_APP_ACHIEVEMENT as string}><div className='arcademenu'>Achievments</div></Button>
								</Grid>
							</Box>
								

				</Grid>
				<Grid container></Grid>

				</Stack>
			</div>
		);
	};
}
