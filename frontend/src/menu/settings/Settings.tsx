import { Grid, Avatar, InputBase } from "@mui/material";
import { ChangeEvent, Component } from "react";
import { UserAPI } from "../../api/Users.api";
import Menu from "../Menu";
import button from "../../style/buttons.module.css"
import background from "./../../asset/images/background.jpg"
import { rgbaToHsva } from "tsparticles";
import { LoginSettings } from "./LoginSettings";


type SettingsProps = {
	login?: string,
};

interface SettingsState {
	fileSelected?: File;
	loginSelected?: string;
	scale: number;
	avatar: string,
	login?: string,
	editAvatar: boolean
}

export class Settings extends Component<SettingsProps, SettingsState> {
	editor: any

	constructor(props: SettingsProps) {
		super(props);
		this.updateState = this.updateState.bind(this);
		this.state = {avatar: '', login: undefined, fileSelected: undefined, loginSelected: undefined,
					scale: 1, editAvatar: false }
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
			alignItems: 'stretch',
			display: "flex",
			justifyContent: 'center',
			fontFamily: 'Bit9x9',
			fontSize: 'calc(10px + 1vw)'
		};
		
		return(

			// Background
			<div style={{
				backgroundImage: `url(${background})`,
				backgroundSize: 'cover',
				height: '100vh',
				width: '100vw',
				backgroundRepeat: 'norepeat',
				}}
			>
				Window
				<div style={{
					height: '100vh',
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					}}
				>
				<Grid	container
						justifyContent="space-between"
						wrap="nowrap"
						sx={{
								border: '0.5vw solid rgba(0, 70, 109, 1)',
								outline: '0.5vw solid rgba(0, 80, 117, 1)',
								backgroundColor: 'black',
								height: 'undefined',
								width: 'undefined',
								minWidth: "800px", minHeight: "800px",
								maxWidth: "1500px", maxHeight: "1500px"
							}}>

						<Grid	item xs={6}
								sx={{	m: 2,
										p: 2,
										border: '0.4vw solid rgba(142, 0, 172, 1)',
										outline: '0.4vw solid rgba(142, 0, 172, 0.5)',
										backgroundColor: 'black'
									}}
						>
							{/* Settings */}
							<Grid container
								direction="column"
								justifyContent="space-between"
								sx={{height: '100%'}}
							>

								<LoginSettings	login={this.state.login}
												updateParentState={this.updateState}
								/>
								<Grid container
									direction="row"
									justifyContent="space-between"
									alignItems="center"
									sx={{height: '33%'}}
								>
									<Grid item xs={4} sx={GridItemStyle}> AVATAR </Grid>
									<Grid item xs={4} sx={GridItemStyle}>
										<Avatar	variant='circular'
												alt="Semy Sharp"
												src={this.state.avatar}
												sx={{	diaplay: "flex",
														width: '200px',
														height: '200px'}}/>
									</Grid>
									<Grid item xs={4} sx={GridItemStyle}>
										<div className={button.button}
											style={{width: '100px',
													height: '70px',
													backgroundColor: 'rgb(20, 121, 249)',
													fontFamily: 'backto1982',
													fontSize: '20px'}}>
											EDIT
										</div>
									</Grid>
								</Grid>
								<Grid container
									direction="row"
									justifyContent="space-between"
									alignItems="center"
									sx={{height: '33%'}}
								>
									<Grid item xs={4} sx={GridItemStyle}> 2FA </Grid>
									<Grid item xs={4} sx={GridItemStyle}>
										<div className={button.button}
											style={{width: '100px',
													height: '70px',
													backgroundColor: 'rgb(20, 121, 249)',
													fontFamily: 'backto1982',
													fontSize: '30px'}}>
											on
										</div>
									</Grid>
									<Grid item xs={4} sx={GridItemStyle}>
										<div className={button.button}
											style={{width: '100px',
													height: '70px',
													backgroundColor: 'rgb(20, 121, 249)',
													fontFamily: 'backto1982',
													fontSize: '30px'}}>
											off
										</div>
									</Grid>
								</Grid>

							</Grid>

						</Grid>

						<Grid item xs={5} sx={{m: 3, position: 'relative'}} >
							<Menu/>
						</Grid>
				</Grid>

				</div>
            </div>
        );
    };
}

/* <Box m="10%" p="10px" display="flex" width="100% - 3px" height="100% - 3px" bgcolor="white" sx={{border: '3px solid grey' }} minWidth={"500px"} maxWidth={"5000px"}>
	<Grid container direction="row-reverse"   justifyContent="space-between"  alignItems="stretch">
		<Box width="25%" minWidth={"100px"}>
			<Menu/>
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
</Box> */