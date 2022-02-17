import { Avatar, Box, Button, Container, Input, TextField, Typography, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { UserAPI } from "../api/Users.api";
import { ChangeEvent, useEffect, useState, Component } from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from "axios";
import AvatarEditor from 'react-avatar-editor'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import MyEditor from "./Editor";
import { format } from "path/posix";


type ProfileCardProps = {
	login?: string,
	updateHeaderState?: any
}

  
interface ProfileCardState {
	fileSelected?: File;
	loginSelected?: string;
	scale: number;
}

export class ProfileCard extends Component<ProfileCardProps, ProfileCardState>{

	editor: any

	constructor(props: ProfileCardProps) {
		super(props);
		this.state = {fileSelected: undefined, loginSelected: undefined, scale: 1}
	}

	handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const fileList = e.target.files;

		if (!fileList) return;

		this.setState({
			fileSelected: fileList[0]
		})
	};

	updateImage = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
		if (this.editor) {
			const canvas = this.editor.getImageScaledToCanvas();
			var blob: Blob = await new Promise(resolve => canvas.toBlob(resolve));
			const formData = new FormData();
			formData.append("file", blob, 'name.jpg');
			const response = await axios.post(`${process.env.REACT_APP_UPLOAD_AVATAR}`, formData, { withCredentials: true });
			UserAPI.updateAvatar(response.data);
			this.props.updateHeaderState({ avatar: response.data });
		}
	};

	// updateImage = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
	// 	if (this.editor) {
	// 		const canvas = this.editor.getImageScaledToCanvas();
		
	// 		if (canvas.toBlob) {
	// 			canvas.toBlob(async function (blob: any) {
	// 				const formData = new FormData();
	// 				formData.append("file", blob, 'name.jpg');
	// 				const response = await axios.post(`${process.env.REACT_APP_UPLOAD_AVATAR}`, formData, { withCredentials: true });
	// 				UserAPI.updateAvatar(response.data);
	// 				return response.data;
	//  				// this.props.updateHeaderState({ avatar: response.data });
	// 			}, 'image/jpeg')
	// 			console.log('bonjour')
	// 			console.log(ret);
	// 		  }
		
	// 	}
	// };

	handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
		const log = e.target.value;

		this.setState({
			loginSelected: log
		})
	}

	updateLogin = () => {
		if (this.state.loginSelected) {
			UserAPI.updateLogin(this.state.loginSelected);
		}
		this.props.updateHeaderState({ login: this.state.loginSelected });
	}

	zoomIn = () => {
		this.setState({
			scale: (this.state.scale * 1.1 < 8) ? this.state.scale * 1.1 : 8
		})
	}

	zoomOut = () => {
		this.setState({
			scale: (this.state.scale * 0.9 > 1) ? this.state.scale * 0.9 : 1
		})
	}
	setEditorRef = (editor: any) => (this.editor = editor)
	render() {
		return (
			<div>
				<Box mr={1} sx={{ display: 'flex', flexDirection: 'row', }}>
					<Box><TextField label={this.props.login} defaultValue={this.props.login} onChange={this.handleChangeLogin} /></Box>
					<Button color="primary" aria-label="upload picture" component="span" endIcon={<EditIcon />} onClick={this.updateLogin} />
					{/* {showNick ? <Box><TextField InputProps={{readOnly: true }} label="Nickname" defaultValue={Login}/></Box> : <Box><TextField label="New Nickname" defaultValue={Login}/></Box>} */}
					{/* faire un tag onChange pour pouvoir changer la valeur dans la DB */}
				</Box>
				<Box m={1} sx={{ display: 'flex', flexDirection: 'row', }}>
					<Input type="file" hidden onChange={this.handleImageChange}></Input>
					<Button color="primary" aria-label="upload picture" component="span" endIcon={< AddPhotoAlternateIcon />} onClick={this.updateImage}>
						{/* {showAvatar ? <Input type="file" hidden/> : <Box><T></></Box>/>} */}
					</Button>

					{/* <Avatar alt="Semy Sharp" src={this.state.avatar} /> */}
				</Box>
				{(this.state.fileSelected) &&
					<div>
						<AvatarEditor
						    ref={this.setEditorRef}
							image={(this.state.fileSelected) ? this.state.fileSelected : 'null'}
							width={175}
							height={175}
							border={50}
							borderRadius={1000}
							color={[0, 0, 0, 0.5]} // RGBA
							scale={this.state.scale}
							rotate={0} />
						<IconButton color="primary" onClick={this.zoomIn}><AddCircleOutlineIcon /></IconButton>
						<IconButton color="primary" onClick={this.zoomOut}><RemoveCircleOutlineIcon /></IconButton>
					</div>
				}
			</div>
			)
	}
}
