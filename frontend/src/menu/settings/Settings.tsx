import { Box, Grid, Stack, InputBase, List} from "@mui/material";
import { ChangeEvent, Component } from "react";
import { UserAPI } from "../../api/Users.api";
import MenuButton from "../Menu";
import { AvatarSettings } from "./AvatarSettings";
import { LoginSettings } from "./LoginSettings";
import { TwofaSettings } from "./TwofaSettings";
import background from "./../../asset/images/background.jpg"
import { height } from "@mui/system";


type SettingsProps = {
	login?: string,
};

interface SettingsState {
	fileSelected?: File;
	loginSelected?: string;
	scale: number;
	avatar: string,
	login?: string,
}

export class Settings extends Component<SettingsProps, SettingsState> {
	editor: any

	constructor(props: SettingsProps) {
		super(props);
		this.updateState = this.updateState.bind(this);
		this.state = {avatar: '', login: undefined, fileSelected: undefined, loginSelected: undefined, scale: 1}
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

	async updateState({login, avatar}) {
		if (login)
			this.setState({
				login: login,
			})
		if (avatar)
		this.setState({
			avatar: avatar,
		})
	}

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
	}

	render (){
		
		const GridItemStyle = {
			color: 'white',
			alignItems: 'center',
			display: "flex",
			justifyContent: 'center'
		};
		
		return(

			<div style={{
				backgroundImage: `url(${background})`,
				backgroundSize: 'cover',
				height: '100vh',
				width: '100vw',
				backgroundRepeat: 'norepeat'
				}}
			>
				<div style={{
					height: '100vh',
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				}}>
				<Grid	container
						justifyContent="space-between"
						alignItems="stretch"
						wrap="nowrap"
						sx={{
								border: '0.5vw solid rgba(0, 70, 109, 1)',
								outline: '0.5vw solid rgba(0, 80, 117, 1)',
								backgroundColor: 'black',
								height: 'undefined',
								width: 'undefined',
								minWidth: "700px", minHeight: "700px",
								maxWidth: "1500px", maxHeight: "1400px"
							}}>

						<Grid	item xs={6}
								sx={{	m: 2,
										p: 2,
										border: '0.4vw solid rgba(142, 0, 172, 1)',
										outline: '0.4vw solid rgba(142, 0, 172, 0.5)',
										backgroundColor: 'black'
									}}
						>
							<Grid container
								direction="column"
								justifyContent="space-between"
								sx={{height: "100%", overflow: 'auto'}}
							>

								<Grid container
									direction="row"
									justifyContent="space-between"
								>
									<Grid item xs={4} sx={GridItemStyle}> NICKNAME </Grid>
									<Grid item xs={4} sx={GridItemStyle}> Username </Grid>
									<Grid item xs={4} sx={GridItemStyle}> editButton </Grid>
								</Grid>
								<Grid container
										direction="row"
										justifyContent="space-between"
								>
									<Grid item xs={4} sx={GridItemStyle}> AVATAR </Grid>
									<Grid item xs={4} sx={GridItemStyle}> IMAGE </Grid>
									<Grid item xs={4} sx={GridItemStyle}> EDIT </Grid>
								</Grid>
								<Grid container
										direction="row"
										justifyContent="space-between"
								>
									<Grid item xs={4} sx={GridItemStyle}> 2FA </Grid>
									<Grid item xs={4} sx={GridItemStyle}> ON </Grid>
									<Grid item xs={4} sx={GridItemStyle}> OFF </Grid>
								</Grid>

							</Grid>

						</Grid>

						<Grid item xs={5} sx={{m: 3}} >
							<MenuButton/>
						</Grid>
				</Grid>


				{/* <Box m="10%" p="10px" display="flex" width="100% - 3px" height="100% - 3px" bgcolor="white" sx={{border: '3px solid grey' }} minWidth={"500px"} maxWidth={"5000px"}>
					<Grid container direction="row-reverse"   justifyContent="space-between"  alignItems="stretch">
						<Box width="25%" minWidth={"100px"}>
							<MenuButton/>
						</Box>
						<Box width="70%" minWidth={"350px"}>
							<Box sx={{ p: 1, border: '3px solid grey' }}  width="100%">
								<Grid container direction="column" justifyContent="space-between" alignItems="center">
									<LoginSettings login={this.state.login} updateParentState={this.updateState}/>
									<Box height='20px'/>
									<AvatarSettings avatar={this.state.avatar} updateParentState={this.updateState}/>
									<Box height='20px'/>
									<TwofaSettings/>
								</Grid>
							</Box>
						</Box>
					</Grid>
				</Box> */}
				</div>
            </div>
        );
    };
}
