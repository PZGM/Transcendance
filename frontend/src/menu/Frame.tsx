import { Grid} from "@mui/material";
import { Component} from "react";
import { UserAPI } from "../api/Users.api";
import Menu from "./Menu";
import background from "./../asset/images/background.jpg"
import { Outlet } from "react-router-dom";


type FrameProps = {
	login?: string,
};

interface FrameState {
	avatar: string
	login?: string
	display: number
}

export class Frame extends Component<FrameProps, FrameState> {
	editor: any

	constructor(props: FrameProps) {
		super(props);
		this.updateState = this.updateState.bind(this);
		this.state = {avatar: '', login: undefined, display: 0}
	}

	async fetchUser() {
		const resp = await UserAPI.getUser();
		console.log(resp)
		this.setState({
			avatar: resp.avatar,
			login: resp.login
		})
	}

	componentDidMount()  {
		this.fetchUser();
	}

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

	render ()
	{
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
							}}
				>

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
								sx={{height: '100%'}}
							>
								<Outlet/>
							</Grid>

						</Grid>

						<Grid item xs={5} sx={{m: 3, position: 'relative'}}>
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
					<LoginFrame login={this.state.login} updateParentState={this.updateState}/>
					<Box height='20px'/>
					<AvatarFrame avatar={this.state.avatar} updateParentState={this.updateState}/>
					<Box height='20px'/>
					<TwofaFrame/>
				</Grid>
			</Box>
		</Box>
	</Grid>
</Box> */