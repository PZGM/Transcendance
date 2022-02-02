import { Avatar, Box, Button, Container, Input, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { UserAPI } from "../api/Users.api";
import { ChangeEvent, useEffect, useState } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from "axios";

type Login = {
	Login?: string
}


  
export default function Profil_Card({Login}:Login) {
	const [login, setLogin] = useState(null);
	useEffect(() => {
		async function fetchUser() {

			const resp = await UserAPI.getUser();
			setLogin(resp.login);

		}
		fetchUser();
	}, [login]);




	// const [checked, setChecked] = useState(false);
	
	// const handleChange = () => {
	// 	  setChecked((prev) => !prev);
	// 	};
	


		const [showNick, setShowNick] = useState(false);
		const [showAvatar, setShowAvatar] = useState(false);
	  
		const handleClickNick = () => {
		  setShowNick(!showNick);
		};
		const handleClickAvatar = () => {
		  setShowAvatar(!showAvatar);
		};

		const handleUploadAvatar = () => {
			
		};



		const [fileSelected, setFileSelected] = useState<File>() // also tried <string | Blob>

		const handleImageChange = function (e: ChangeEvent<HTMLInputElement>) {
			const fileList = e.target.files;
		
			if (!fileList) return;
			
			setFileSelected(fileList[0]);
		  };
		
		  const uploadFile = async function (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) {
			if (fileSelected) {
				const formData = new FormData();
				formData.append("image", fileSelected, fileSelected.name);
				const response = await axios.post(`${process.env.REACT_APP_UPLOAD_AVATAR}`, formData);
				return response.data;
			}
		};
		






		
	return(
		<div>
			<Box mr={1} sx={{display: 'flex', flexDirection: 'row',}}>
				<Button color="primary" aria-label="upload picture" component="span" startIcon={<EditIcon />} onClick={handleClickNick}/>
					{showNick ? <Box><TextField InputProps={{readOnly: true }} label="Nickname" defaultValue={Login}/></Box> : <Box><TextField label="New Nickname" defaultValue={Login}/></Box>}
					{/* faire un tag onChange pour pouvoir changer la valeur dans la DB */}
			</Box>
			<Box m={1} sx={{display: 'flex', flexDirection: 'row',}}>
					<Input type="file" hidden onChange={handleImageChange}/>
				<Button color="primary" aria-label="upload picture" component="span" endIcon={< AddPhotoAlternateIcon/>} onClick={uploadFile}>
					{/* {showAvatar ? <Input type="file" hidden/> : <Box><T></></Box>/>} */}
				</Button>

				{/* <Avatar alt="Semy Sharp" src='{avatar}' /> */}
			</Box>
		</div>
	)
}
{/* <TextField id="filled-read-only-input" label="Read Only" defaultValue="Hello World" InputProps={{readOnly: true }} variant="filled"/> */}

	{/* <Fade in={checked}>
		</Fade> */}
