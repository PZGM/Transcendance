import { Box, Card, Grid } from "@mui/material";
import { Component } from "react";
import Display from "./Display";

const spacer = "10px";

interface ThirdRowProps {
	value: number,
};

export class CupRow extends Component<ThirdRowProps> {
	render (){
		return(
            <div>
				<Grid container direction="row" justifyContent="space-around" alignItems="center">
					<Card sx={{width:"120px", border: '3px solid grey',p: 1 }}>
						<Display desc={"Win 1 tournament"} max={1} val={this.props.value}/>
					</Card>
					<Box width={spacer}></Box>
					<Card sx={{width:"120px", border: '3px solid grey',p: 1 }}>
						<Display desc={"Win 5 tournament"} max={5} val={this.props.value}/>
					</Card>
					<Box width={spacer}></Box>
					<Card sx={{width:"120px", border: '3px solid grey',p: 1 }}>
						<Display desc={"Win 10 tournament"} max={10} val={this.props.value}/>
					</Card>
				</Grid>
            </div>
        );
    };
}