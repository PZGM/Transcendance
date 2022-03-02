import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';


export default function Display(props) {

	let val;
	let max = props.max;

	if (props.val > props.max)
		val = props.max;
	else
		val = props.val;

	return (
		<Grid container direction="column" justifyContent="space-between" alignItems="center">
			<Typography align="center">{props.desc}</Typography>
			<Box sx={{border: '3px solid grey'}}  width="115px" height="10px">
				<LinearProgress variant="buffer" value={( val / max) * 100} sx={{height: "100%"}}/>
			</Box>
			<Typography align="center">
				{( val / max) * 100 - ( val / max) * 100 % 1 }%
			</Typography>
			<Box sx={{border: '3px solid grey' }}  width="20px" height="20px">
				{(val === max) ? <DoneIcon/> : <></>}
			</Box>
		</Grid>
	);
}