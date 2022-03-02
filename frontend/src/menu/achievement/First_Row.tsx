import { Box, Card, Grid, LinearProgress, Typography } from "@mui/material";
import { Component } from "react";
import Display from "./Display";

const spacer = "10px";

interface FirstRowProps {
	value: number,
};

export class MatchRow extends Component<FirstRowProps> {
	render (){
		return(
			<div>
				<Grid container direction="row" justifyContent="space-around" alignItems="center">
					<Card sx={{width:"120px", border: '3px solid grey',p: 1 }}>
						<Display desc={"Play 1 match"} max={1} val={this.props.value}/>
					</Card>
					<Box width={spacer}></Box>
					<Card sx={{width:"120px", border: '3px solid grey',p: 1 }}>
						<Display desc={"Play 10 match"} max={10} val={this.props.value}/>
					</Card>
					<Box width={spacer}></Box>
					<Card sx={{width:"120px", border: '3px solid grey',p: 1 }}>
						<Display desc={"Play 100 match"} max={100} val={this.props.value}/>
					</Card>
				</Grid>
			</div>
		);
	};
}