import { Avatar, Box, ButtonBase, IconButton, List, Stack, Typography } from "@mui/material";
import { Component} from "react";
import { Link, Navigate } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";
import { UserAPI } from "../../api/Users.api";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RenderRows from "./tools/RenderRows";
import RenderRowsEdit from "./tools/RenderRowsEdit";
import AddIcon from '@mui/icons-material/Add';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import "../../style/buttons.css"
import { UserDto } from "../../api/dto/user.dto";
import '../../style/display.css';

interface ChanEditState {
    chan?: any
	friends: UserDto[];
}

interface ChanEditProps {
    params: any,
};

let height_Box_Admin = "20vh"
let height_Box_Users = "59vh"
let width_button = "90px"

export class ChanEdit extends Component<ChanEditProps, ChanEditState> {
	index:number = 0;
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
		list = [1,1,1,1,1,1,1,1,11,1,1,1,1,1,11,1]
		const listItems = list.map((user: any) =>
			<>
				<RenderRowsEdit index={this.index++} getColor={this.getColor} user={user} first_button="Dismiss admin" second_button="remove"></RenderRowsEdit>
			</>
	  );
	  return listItems;
	}

	renderRowsUsers(list) {
		list = [1,1,1,1,1,1,1,1,1,1,1,1,11,1,1,1,1,1,11,1,1,1,1,1,11,1]
		const listItems = list.map((user: any) =>
			<>
				<RenderRowsEdit index={this.index++} getColor={this.getColor} user={user} first_button="make admin" second_button="remove"></RenderRowsEdit>
			</>
	  );
	  return listItems;
	}

	getColor(status: number): string | undefined
	{
		let colors = new Map<number, string>([
			[0, 'white'],
			[1, 'red'],
			[2, 'yellow'],
			[3, 'green'],
			[4, 'blue']]);

		return colors.get(status)
	}


	removeFriend(id :number) {
		UserAPI.removeFriend(id);
		this.deleteFriend(id);
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
                <Stack direction="row" justifyContent="space-between">
                    <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
						<Link style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.chan + "/info"}}>
							<ArrowBackIcon/>
						</Link>
                    </Stack>
                    <Stack direction="column" justifyContent="center" alignItems="flex-end" spacing={0}>
{/* TODO faire un onClick qui va save les changement fait (meme si comme ca je trouve que c'est stupide et que ca devrait le faire auto a chaque clique le changement) */}
						<Link style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.chan + "/info"}}>
                            <DoneOutlineIcon/>
						</Link>
                    </Stack>
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
					<div className="bit5x5" style={{color: "white", fontSize: "64px"}}> {this.state.chan} </div>
                </Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<div className="bit5x5" style={{color: "white"}}>ADMINS :</div>
						<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} height={height_Box_Admin}>
							<List  style={{overflow: 'auto'}}>
								{this.renderRowsAdmins([])}
{/* TODO envoyer le state admin du channel */}
								{/* {this.renderRows(this.statte.friends)} */}
							</List>
						</Stack>
				</Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0} sx={{marginLeft: "1px", marginRight: "1px"}}>
					<div className="bit5x5" style={{color: "white"}}>USERS :</div>
					<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" height={height_Box_Users}>
                        {/* <ButtonBase className="home_button" centerRipple style={{width: "480px", height: '60px', borderRadius: 0, backgroundColor: "red"}} onClick={ () => {}}> */}
{/* TODO faire un joli bouton pour ca */}
							<Link  className={"add_user_button but_" + this.getColor(this.index++ % 5)} onClick={() => this.update()} style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.chan + "/add"}}>
                                <div className='bit5x5'> Add user </div>
							</Link>
                        {/* </ButtonBase> */}
                        <List style={{overflow: 'auto'}} sx={{height: "800px"}}>
{/* TODO envoyer le state user du channel */}
							{this.renderRowsUsers([])}
							{/* {this.renderRows(this.state.friends)} */}
						</List>
					</Stack>
				</Stack>
            </>

		)
	}
}