import { Box, Button, Container, Fade, FormControlLabel, IconButton, Paper, Switch, TextField, Theme, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { UserAPI } from "../api/Users.api";
import { useEffect, useState } from "react";




const icon = (
	<Paper sx={{ m: 1 }} elevation={4}>
	  <Box component="svg" sx={{ width: 100, height: 100 }}>
		<Box
		  component="polygon"
		  sx={{
			fill: (theme: Theme) => theme.palette.common.white,
			stroke: (theme) => theme.palette.divider,
			strokeWidth: 1,
		  }}
		  points="0,100 50,00, 100,100"
		/>
	  </Box>
	</Paper>
  );

  
export default function Profil_Card() {
	const [login, setLogin] = useState(null);

	useEffect(() => {
		async function fetchUser() {

			const resp = await UserAPI.getUser();
			setLogin(resp.login);

		}
		fetchUser();
	}, [login]);




	const [checked, setChecked] = useState(false);
	
	const handleChange = () => {
		  setChecked((prev) => !prev);
		};
	
	return(
		<div>
			<Box sx={{
				display: 'flex',
				flexDirection: 'row',
				p: 1,
				bgcolor: 'background.paper',
			}}>
				{/* il faudrait faire un truc pour que quand on click sur le editicon que le typography devienne un textfield puis en validant ca change le login dans la database*/}
				<Button color="primary" aria-label="upload picture" component="span" startIcon={<EditIcon />} onClick={handleChange}/>
					<Box>
						<TextField id="outlined-required" label="Nickname" defaultValue={login}/>
						<Typography>qwertyuiop</Typography>
					</Box>
			</Box>
		</div>
	)
}

	{/* <Fade in={checked}>
		</Fade> */}