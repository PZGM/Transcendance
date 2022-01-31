import { Box, Button, Container, IconButton, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { UserAPI } from "../api/Users.api";
import { useEffect, useState } from "react";

export default function Profil_Card() {
	const [login, setLogin] = useState(null);

	useEffect(() => {
		async function fetchUser() {

			const resp = await UserAPI.getUser();
			setLogin(resp.login);

		}
		fetchUser();
	}, [login]);

	return(
		<div>
			<Box sx={{
			display: 'flex',
			flexDirection: 'row',
			p: 1,
			bgcolor: 'background.paper',
			}}>
				{/* il faudrait faire un truc pour que quand on click sur le editicon que le typography devienne un textfield puis en validant ca change le login dans la database*/}
				<Button color="primary" aria-label="upload picture" component="span" startIcon={<EditIcon />}/>
					<Box>
						<TextField id="outlined-required" label="Nickname" defaultValue={login}/>
						<Typography>qwertyuiop</Typography>
					</Box>
			</Box>
		</div>
	)
}