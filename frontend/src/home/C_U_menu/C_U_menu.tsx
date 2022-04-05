import { Box, Button, ButtonBase, Grid, IconButton, Input, InputBase, List, Stack, TextField, Typography } from "@mui/material";
import { Component} from "react";
import { Selecter } from "../gestion_chat/Selecter";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserDisplay } from "../../menu/friends/UserDisplay";
import styles from './../../style/dac.module.css'
import { red } from "@mui/material/colors";
import buttons from './../../style/buttons.module.css'

interface CUmenuProps {
    id?: number;
    updateDisplay: any;
};

let height_Box = "41.5vh"
let height_Box_Admin = "20vh"
let height_Box_Users = "58vh"
let width_button = "90px"

export class CUmenu extends Component<CUmenuProps> {
	constructor(props: CUmenuProps) {
		super(props);
	}

	componentDidMount()  {
	}

	renderRows(list) {
		list = [1,1,1,1,1,1,1,1,1,1,1]
		const listItems = list.map((id: number) =>
			// <div key={id}>
			<Box width="472px" className={styles.bdac} sx={{color:'test'}} ml="5px" mr="2px" >
				<Stack  direction="row" justifyContent="space-evenly" alignItems="center" >
					<Stack direction='row' justifyContent="space-evenly"  alignItems="center" spacing={1} sx={{width: "100px"}}>
						<Typography variant="button">
							<div className='bit9x9'> 42 </div>
						</Typography>
					</Stack>
					<Stack direction='row' justifyContent="flex-end"  alignItems="flex-end" spacing={1}>
						<ButtonBase centerRipple className={buttons.button} style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
							<Typography variant="button" color='white'>
								<div className='bit5x5'> MUTE </div>
							</Typography>
						</ButtonBase>
						<ButtonBase centerRipple className={buttons.button} style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
							<Typography variant="button" color='white'>
								<div className='bit5x5'> LEAVE </div>
							</Typography>
						</ButtonBase>
					</Stack>
				</Stack>
			</Box>
			// {/* </div> */}
	  );
	  return listItems;
	}
	deleteFriend(id:number) {
	}

	render () {
		return (
            <>
                <Selecter updateDisplay= {this.props.updateDisplay}></Selecter>
                {/* <Typography>{`Yo je suis le profile dsdfsdgdsfgsdfgdse ${this.props.id}`}</Typography> */}
                {/* <ButtonBase onClick={ () => {this.props.updateDisplay(0);}}> Go to chat </ButtonBase> */}
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2}>
					<IconButton onClick={ () => {this.props.updateDisplay(0);}}>
						<ArrowBackIcon/>
					</IconButton>
					<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
						<Typography>ACTIVE CHANNELS :</Typography>
						<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} height={height_Box}>
							<ButtonBase className={buttons.button} centerRipple style={{width: "480px", height: '60px', borderRadius: 0, backgroundColor: "red", marginLeft: 3}} onClick={ () => {this.props.updateDisplay(8);}}>
								<Typography variant="button" color='white'>
									<div className='bit5x5'> Add user </div>
								</Typography>
							</ButtonBase>
							<List style={{overflow: 'auto'}}>
								{this.renderRows([])}
								{/* {this.renderRows(this.state.friends)} */}
							</List>
						</Stack>
					</Stack>

					<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<Typography>CHATS :</Typography>
							<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} height={height_Box}>
								<List style={{overflow: 'auto'}}>
									{this.renderRows([])}
									{/* {this.renderRows(this.state.friends)} */}
								</List>
							</Stack>
					</Stack>
				</Stack>
            </>

		)
	}
}


//Cette doit etre appeler en appuyant sur le channel dans selecter (le 42 dans les slides)