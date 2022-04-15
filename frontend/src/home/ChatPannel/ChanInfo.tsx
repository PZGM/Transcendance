import { ButtonBase, IconButton, Stack, List, Typography } from "@mui/material";
import { Component} from "react";
import { Navigate } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";
import { UserAPI } from "../../api/Users.api";
import RenderRows from "./tools/RenderRows";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";


interface ChanInfoState {
    chan?: any
}

interface ChanInfoProps {
    params: any,
};

let height_Box_Admin = "20vh"
let height_Box_Users = "58vh"
let width_button = "70px"

export class ChanInfo extends Component<ChanInfoProps, ChanInfoState> {
	constructor(props: ChanInfoProps) {
		super(props);
        this.state = {
            chan: undefined,
        }
	}

// il faut recup les info du chan grace a un getchannelbyid et une fois fais peut etre revoir renderrows pour voir ce que ca donne

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
		// list = [1,1,1,1,1]
		const listItems = list.map((id: number) =>
		<>
			<RenderRows first_button="WATCH MATCH" second_button="SEND MESSAGE" third_button="REMOVE FRIEND"></RenderRows>
		</>
		
	  );
	  return listItems;
	}

	renderRowsUsers(list) {
		// console.log("MDR");
		// console.log(this.props.channel);
		// console.log("MDR");
		// list = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
		const listItems = list.map((user: any) =>
			<>
			    <RenderRows user={user} first_button="WATCH MATCH" second_button="SEND MESSAGE" third_button="REMOVE FRIEND"></RenderRows>
			</>
	  );
	  return listItems;
	}

	render () {

		return (
            <>
                <Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<Link 	style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.chan }}>
                        <ArrowBackIcon/>
					</Link>

                </Stack>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
					<Typography variant="h1" color='white'>
						{/* <div className='bit5x5'> {(this.props.channel) ? this.props.channel.name : '...'} </div> */}
						<div className='bit5x5'> {this.state.chan} </div>
					</Typography>
                </Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<Typography>ADMINS :</Typography>
						<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} height={height_Box_Admin}>
							<List style={{overflow: 'auto'}}>
								{this.renderRowsAdmins([])}
								{/* {this.renderRows(this.state.friends)} */}
							</List>
						</Stack>
				</Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<Typography>USERS :</Typography>
					<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} height={height_Box_Users}>
						<List style={{height: "100% -100px", overflow: 'auto'}}>
							{this.renderRowsUsers([])}
							{/* {this.renderRows(this.state.friends)} */}
						</List>
					</Stack>
				</Stack>
            </>

		)
	}
}