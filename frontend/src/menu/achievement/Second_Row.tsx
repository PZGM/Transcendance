import { Box, Card, Grid, Typography } from "@mui/material";
import { Component } from "react";
import Display from "./Display";

const spacer = "10px";

interface SecondRowProps {
	value: number,
};

export class RowRow extends Component<SecondRowProps> {
	render (){
		return(
            <div>
				<Grid container direction="row" justifyContent="space-around" alignItems="center">
					<Card sx={{width:"120px", border: '3px solid grey',p: 1 }}>
						<Display desc={"Win 3 in a row"} max={3} val={this.props.value}/>
					</Card>
					<Box width={spacer}></Box>
					<Card sx={{width:"120px", border: '3px solid grey',p: 1 }}>
						<Display desc={"Win 10 in a row"} max={10} val={this.props.value}/>
					</Card>
					<Box width={spacer}></Box>
					<Card sx={{width:"120px", border: '3px solid grey',p: 1 }}>
						<Display desc={"Win 15 in a row"} max={15} val={this.props.value}/>
					</Card>
				</Grid>
            </div>
        );
    };
}