import { Avatar, Box, Button, Container, Input, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { UserAPI } from "../api/Users.api";
import { ChangeEvent, useEffect, useState } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from "axios";

type ProfileCardProps = {
	login?: string,
	updateHeaderState?: any
}


  
export default function Profil_Card({login, updateHeaderState}:ProfileCardProps) {
		const [fileSelected, setFileSelected] = useState<File>() // also tried <string | Blob>
		const [loginSelected, setLoginSelected] = useState<string>() // also tried <string | Blob>

		const handleImageChange = function (e: ChangeEvent<HTMLInputElement>) {
			const fileList = e.target.files;
		
			if (!fileList) return;
			
			setFileSelected(fileList[0]);
		  };
		
		const updateImage = async function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
			if (fileSelected) {
				const formData = new FormData();
				formData.append("file", fileSelected, fileSelected.name);
				const response = await axios.post(`${process.env.REACT_APP_UPLOAD_AVATAR}`, formData, { withCredentials: true });

				UserAPI.updateAvatar(response.data);
				updateHeaderState({ avatar: response.data});
			}
		};
		
		const handleChangeLogin = function (e: React.ChangeEvent<HTMLInputElement>) {
			const log = e.target.value;

			setLoginSelected(log);
		}

		const updateLogin = function () {
			if (loginSelected) {
				UserAPI.updateLogin(loginSelected);
			}
			updateHeaderState({ login: loginSelected});
		}





		
	return(
		<div>
			<Box mr={1} sx={{display: 'flex', flexDirection: 'row',}}>
			<Box><TextField label={login} defaultValue={login} onChange={handleChangeLogin}/></Box>
				<Button color="primary" aria-label="upload picture" component="span" endIcon={<EditIcon />} onClick={updateLogin}/>
					{/* {showNick ? <Box><TextField InputProps={{readOnly: true }} label="Nickname" defaultValue={Login}/></Box> : <Box><TextField label="New Nickname" defaultValue={Login}/></Box>} */}
					{/* faire un tag onChange pour pouvoir changer la valeur dans la DB */}
			</Box>
			<Box m={1} sx={{display: 'flex', flexDirection: 'row',}}>
					<Input type="file" hidden onChange={handleImageChange}/>
				<Button color="primary" aria-label="upload picture" component="span" endIcon={< AddPhotoAlternateIcon/>} onClick={updateImage}>
					{/* {showAvatar ? <Input type="file" hidden/> : <Box><T></></Box>/>} */}
				</Button>

				{/* <Avatar alt="Semy Sharp" src={this.state.avatar} /> */}
			</Box>
		</div>
	)
}
