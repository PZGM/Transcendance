import { Box, Button, ButtonBase, Grid, IconButton, Input, InputBase, List, Stack, TextField, Typography } from "@mui/material";
import { Component} from "react";
import { Selecter } from "../gestion_chat/Selecter";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserDisplay } from "../../menu/friends/UserDisplay";
import styles from './../../style/dac.module.css'
import { red } from "@mui/material/colors";

interface CUmenuProps {
    id?: number;
    updateDisplay: any;
};


export class CUmenu extends Component<CUmenuProps> {
	constructor(props: CUmenuProps) {
		super(props);
	}

	componentDidMount()  {
	}

	renderRows(list) {
		list = [1,1,1,1,1,1,1,1,1,11,1,1,1,1,]
		const listItems = list.map((id: number) =>
			<div key={id}>
				{/* <UserDisplay id={id} index={0} deleteFriend={this.deleteFriend}/> */}
				<Box width="346px" className={styles.bdac} sx={{color:'test'}}>
					<Stack  direction="row" spacing={2}>
						<Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1}>
							<Typography variant="button" color='white'>
								<div className='bit5x5'> 42 </div>
							</Typography>
						</Stack>
						<Stack direction='row' justifyContent="space-between"  alignItems="flex-end" spacing={1}>
							<ButtonBase centerRipple className={styles.dac} style={{width: '120px', height: '50px', borderRadius: 0, backgroundColor: "red"}}>
								<Typography variant="button" color='white'>
								<div className='bit5x5'> MUTE </div>
								</Typography>
							</ButtonBase>
							<ButtonBase centerRipple className={styles.dac} style={{width: '120px', height: '50px', borderRadius: 0, backgroundColor: "red"}}>
								<Typography variant="button" color='white'>
								<div className='bit5x5'> LEAVE </div>
								</Typography>
							</ButtonBase>
						</Stack>
					</Stack>
				</Box>
			</div>
	  );
	  return listItems;
	}
	deleteFriend(id:number) {
	}

	render () {
		return (
            <>
                <Selecter></Selecter>
                {/* <Typography>{`Yo je suis le profile dsdfsdgdsfgsdfgdse ${this.props.id}`}</Typography> */}
                {/* <ButtonBase onClick={ () => {this.props.updateDisplay(0);}}> Go to chat </ButtonBase> */}
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2}>
					<IconButton onClick={ () => {this.props.updateDisplay(0);}}>
						<ArrowBackIcon/>
					</IconButton>
					<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
						<Typography>ACTIVE CHANNELS :</Typography>
						<Box height="200px" sx={{overflow: 'auto'}}>
							<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
								<List style={{height: "100% -100px", overflow: 'auto'}}>
									{this.renderRows([])}
									{/* {this.renderRows(this.state.friends)} */}
								</List>
							</Stack>
						</Box>
					</Stack>

					<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={2}>
					<Typography>CHATS :</Typography>
						<Box height="200px" sx={{overflow: 'auto'}}>
							<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
								<List style={{height: "100% -100px", overflow: 'auto'}}>
									{this.renderRows([])}
									{/* {this.renderRows(this.state.friends)} */}
								</List>
							</Stack>
						</Box>
					</Stack>
				</Stack>
            </>

		)
	}
}