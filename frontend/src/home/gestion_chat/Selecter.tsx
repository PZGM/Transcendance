import { Box, ButtonBase, Stack } from "@mui/material";
import { Component} from "react";
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';

interface SelecterProps {
	updateDisplay: any;
};

let Hbar = "50px";
let Hi = 15;
let Wi = 15;
let Hchan = 25;
let minWchan = 25;
let maxWchan = 50;


export class Selecter extends Component<SelecterProps> {
	constructor(props: SelecterProps) {
		super(props);
	}

	render () {
		let marge = (parseInt(Hbar, 10) - Hchan) / 2;
		return (
			<>
				<Box width="100%" height={Hbar} sx={{backgroundColor: "blue", justifyContent: "center", alignItems: "center"}}>
					<Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{mt: marge.toString().concat("px") }} >
						<ButtonBase sx={{backgroundColor: "red", height: Wi, width: Hi}} onClick={ () => {this.props.updateDisplay(3, 1);}}>i</ButtonBase>
						<Stack direction="row" justifyContent="center" alignItems="center" spacing={0} >
							<ButtonBase sx={{backgroundColor: "red", height: Hchan, minwidth: minWchan, paddingLeft: 1}} onClick={ () => {this.props.updateDisplay(2, 1);}}>
								42
							<ArrowDropDownTwoToneIcon/>
							</ButtonBase>
						</Stack>
					</Stack>
				</Box>
			</>
		)
	}
}