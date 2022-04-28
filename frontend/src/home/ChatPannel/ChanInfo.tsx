import { Box, ButtonBase, IconButton, Stack, List, Typography } from "@mui/material";
import { Component} from "react";
import { Link, Navigate } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";
import { UserAPI } from "../../api/Users.api";
import RenderRows from "./tools/RenderRows";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import AddIcon from '@mui/icons-material/Add';
interface ChanInfoState {
    chan?: any
}

interface ChanInfoProps {
    params: any,
};

let height_Box_Admin = "20vh"
let height_Box_Users = "59vh"
let width_button = "70px"

export class ChanInfo extends Component<ChanInfoProps, ChanInfoState> {
	index:number = 0;

	constructor(props: ChanInfoProps) {
		super(props);
        this.state = {
            chan: undefined,
        }
	}

// TODO il faut recup les info du chan grace a un getchannelbyid et une fois fais peut etre revoir renderrows pour voir ce que ca donne
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

	componentDidMount()  {
        const id = this.props.params.name;
        // if (this.props.isPrivateMessage)
        //     chanId = getPrivateMessageChannel(id);
        // else
        this.setState({
            chan: id,
        })
	}

	renderRowsAdmins(list) {
		list=[1,1,1,1,1,11,1,1,1,1,1,11,1,1,1,1,1,11,1,1,1,1,1,11,1]
		const listItems = list.map((user: any) =>
		<RenderRows index={this.index++} getColor={this.getColor} user={user} first_button="WATCH MATCH" second_button="SEND MESSAGE" third_button="REMOVE FRIEND"></RenderRows>
		
	  );
	  return listItems;
	}

	renderRowsUsers(list) {
		list=[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,11,1,1,1,1,1,11,1]
		const listItems = list.map((user: any) =>
		<RenderRows index={this.index++} getColor={this.getColor} user={user} first_button="WATCH MATCH" second_button="SEND MESSAGE" third_button="REMOVE FRIEND"></RenderRows>
	  );
	  return listItems;
	}

	render () {

		return (
            <>
				<Stack direction="row" justifyContent="space-between">
					<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
						<Link 	style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.chan }}>
							<ArrowBackIcon/>
						</Link>
					</Stack>
{/* TODO faire une ternaire pour savoir s'il est admin afin d'afficher l'icone */}
                    { (false) ? <></> :<Stack direction="column" justifyContent="center" alignItems="flex-end" spacing={0}>
						<Link 	style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.chan + "/edit" }}>
							<AddIcon/>
						</Link>
                    </Stack>}
                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
						{/* <div className='bit5x5'> {(this.props.channel) ? this.props.channel.name : '...'} </div> */}
						{/* <Typography variant="h1" color='white'> */}
							<div className="bit5x5" style={{color: "white", fontSize: "64px"}}>{this.state.chan}</div>
						{/* </Typography> */}
                </Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<div className="bit5x5" style={{color: "white"}}>ADMINS :</div>
					<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} height={height_Box_Admin}>
						<List style={{overflow: 'auto'}}>
							{this.renderRowsAdmins([])}
{/* TODO envoyer le state admin du channel */}
							{/* {this.renderRows(this.state.friends)} */}
						</List>
					</Stack>
				</Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<div className="bit5x5" style={{color: "white"}}>USERS :</div>
					<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} height={height_Box_Users}>
						<List style={{ overflow: 'auto'}}>
							{this.renderRowsUsers([])}
{/* TODO envoyer le state user du channel */}
							{/* {this.renderRows(this.state.friends)} */}
						</List>
					</Stack>
				</Stack>
            </>

		)
	}
}