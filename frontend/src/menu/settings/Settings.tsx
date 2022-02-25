import { Avatar, Box, Button, Card, Divider, Grid, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { ChangeEvent, Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { UserAPI } from "../../api/Users.api";
import MyEditor from "./../../asset/Editor";
import CloseIcon from '@mui/icons-material/Close';
import { sizing } from '@mui/system';

type SettingsProps = {
	login?: string,
	updateHeaderState?: any
};

interface SettingsState {
	fileSelected?: File;
	loginSelected?: string;
	scale: number;
	avatar?: string,
	login?: string,
}

export class Settings extends Component<SettingsProps, SettingsState> {
	editor: any

	constructor(props: SettingsProps) {
		super(props);
		this.state = {avatar: undefined, login: undefined, fileSelected: undefined, loginSelected: undefined, scale: 1}
	}

	async fetchUser() {
		const resp = await UserAPI.getUser();
		this.setState({
			avatar: resp.img_url,
			login: resp.login
		})
	}

	componentDidMount()  {
		this.fetchUser();
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

	render (){
		return(
            <div>
				<Helmet>
					<style>{'body { background-color: black; }'}</style>
				</Helmet>

				<Box m="10%" p="10px" display="flex" width="100% - 3px" height="100% - 3px" bgcolor="white" sx={{border: '3px solid grey' }} minWidth={"500px"} maxWidth={"5000px"}>
					<Grid container direction="row-reverse"   justifyContent="space-between"  alignItems="stretch">
						<Box width="25%" minWidth={"100px"}>
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
						<Box width="70%" minWidth={"350px"}>
							<Box sx={{ p: 1, border: '3px solid grey' }}  width="100%">
								<Grid container direction="column" justifyContent="space-between" alignItems="center">
									<Grid container direction="row" justifyContent="space-between" alignItems="baseline">
										<Typography>NICKNAME</Typography>
										<TextField label={this.state.login} variant="standard" defaultValue={this.state.login} onChange={this.handleChangeLogin}></TextField>
										<Button  variant="contained" style={{borderRadius: 0}} onClick={this.updateLogin}>EDIT</Button>
									</Grid>
									<Box height="20px"></Box>
									<Grid container direction="row" justifyContent="space-between" alignItems="baseline">
										<Typography>AVATAR</Typography>
										<Avatar variant='circular' alt="Semy Sharp" src="/static/images/avatar/1.jpg" sx={{ }}/>
										<Button variant="contained" style={{borderRadius: 0}} >EDIT</Button>
									</Grid>
									<Box height="20px"></Box>
									<Grid container direction="row" justifyContent="space-between" alignItems="baseline">
										<Typography>2FA</Typography>
										<Button variant="contained" style={{borderRadius: 0}} >ON</Button>
										<Button variant="contained" style={{borderRadius: 0}} >OFF</Button>
									</Grid>
									<Box height="20px"></Box>
									<Grid container direction="row" justifyContent="space-between" alignItems="baseline">
										<Typography>STATUS</Typography>
										<Button variant="contained" style={{borderRadius: 0}} >VISIBLE</Button>
									</Grid>
									<Box height="20px"></Box>
									<Grid container direction="column" justifyContent="space-between" alignItems="center">
										<Typography>OTHER AUTH METHODS</Typography>
										<Button  variant="contained" style={{width: '100%', height: '100%',borderRadius: 0}}>GOOGLE</Button>
										<Button  variant="contained" style={{width: '100%', height: '100%',borderRadius: 0}}>META</Button>
									</Grid>
								</Grid>
							</Box>
						</Box>
					</Grid>
				</Box>
            </div>
        );
    };
}
