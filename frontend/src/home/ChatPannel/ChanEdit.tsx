import { Avatar, Box, ButtonBase, IconButton, List, Stack, Typography } from "@mui/material";
import { Component} from "react";
import { Link, Navigate } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";
import { UserAPI } from "../../api/Users.api";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RenderRows from "./tools/RenderRows";
import AddIcon from '@mui/icons-material/Add';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import "../../style/buttons.css"
import { UserDto } from "../../api/dto/user.dto";

interface ChanEditState {
    chan?: any
	friends: UserDto[];
}

interface ChanEditProps {
    params: any,
};

let height_Box_Admin = "20vh"
let height_Box_Users = "58vh"
let width_button = "90px"

export class ChanEdit extends Component<ChanEditProps, ChanEditState> {
	constructor(props: ChanEditProps) {
		super(props);
        this.state = {
            chan: undefined,
			friends: [],
        }
	}

	componentDidMount()  {
        const id = this.props.params.name;
        // if (this.props.isPrivateMessage)
        //     chanId = getPrivateMessageChannel(id);
        // else
        this.setState({
            chan: id,
        })
	}

	update() {
		const id = this.props.params.name;
        this.setState({
            chan: id,
        })
	}

	renderRowsAdmins(list) {
		list = [1,1,1,1]
		const listItems = list.map((user: any) =>
			<>
			<RenderRows user={user} first_button="WATCH MATCH" second_button="SEND MESSAGE" third_button="REMOVE" deleteFriend={this.deleteFriend} ></RenderRows>
			</>
	  );
	  return listItems;
	}

	renderRowsUsers(list) {
		list = [1,1,1,1,1,1,1,1]
		const listItems = list.map((user: any) =>
		<>
			<RenderRows user={user} first_button="WATCH MATCH" second_button="SEND MESSAGE" third_button="REMOVE" ></RenderRows>
		</>		
	  );
	  return listItems;
	}

	deleteFriend(id:number) {
		const newFriends: UserDto[] = this.state.friends.filter((user) => {
			return user.id != id;
		});

		this.setState({
			friends: newFriends
		});
	}

	async fetchFriends() {
		try {
			const resp = await UserAPI.getFriends();
			this.setState({
				friends: resp
			})
		}
		catch (e) {
			console.log(e);
		}

	}


	render () {

		return (
            <>
                {/* <Typography>{`Yo je suis le ChanEdit de ${this.state.chan} `}</Typography> */}
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
						<Link style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.chan + "/info"}}>
							<ArrowBackIcon/>
						</Link>
                    </Stack>
                    <Stack direction="column" justifyContent="center" alignItems="flex-end" spacing={0}>
						<Link style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.chan + "/info"}}>
                            <DoneOutlineIcon/>
						</Link>
                    </Stack>
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
					<Typography variant="h1" color='white'>
						<div className='bit5x5'> {this.state.chan} </div>
					</Typography>
                </Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<Typography>ADMINS :</Typography>
						<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} height={height_Box_Admin}>
							<List style={{overflow: 'auto'}}>
								{this.renderRowsAdmins([])}
								{/* {this.renderRows(this.statte.friends)} */}
							</List>
						</Stack>
				</Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0} sx={{marginLeft: "1px", marginRight: "1px"}}>
					<Typography>USERS :</Typography>
					<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" height={height_Box_Users}>
                        {/* <ButtonBase className="home_button" centerRipple style={{width: "480px", height: '60px', borderRadius: 0, backgroundColor: "red"}} onClick={ () => {}}> */}
							<Link onClick={() => this.update()} style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.chan + "/add"}}>
                                <div className='bit5x5'> Add user </div>
							</Link>
                        {/* </ButtonBase> */}
                        <List style={{overflow: 'auto'}} sx={{height: "800px"}}>
							{this.renderRowsUsers([])}
							{/* {this.renderRows(this.state.friends)} */}
						</List>
					</Stack>
				</Stack>
            </>

		)
	}
}