import { Avatar, Box, Button, Card, ListItem, ListItemButton, ListItemText, Grid, Typography, Divider, Stack } from "@mui/material";
import { Component } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import CloseIcon from '@mui/icons-material/Close';
import MenuButton from "../MenuButton";


const widthBox = 700;
const heightBox = 500;

interface HistoryProps {
};

function renderRow(props: ListChildComponentProps) {
	const { index, style } = props;
  
	return (
	  <ListItem style={style} key={index} component="div" disablePadding>
		<ListItemButton>
		  <ListItemText primary={`Item ${index + 1}`} />
		  <Divider/>
		</ListItemButton>
	  </ListItem>
	);
  }


export class History extends Component<HistoryProps> {
	constructor(props: HistoryProps) {
		super(props);
	}
	render (){
		return(
            <div>
				<Helmet>
					<style>{'body { background-color: black; }'}</style>
				</Helmet>
				
				<Box m="10%" p="10px" display="flex" width="100% - 3px" height="100% - 3px" bgcolor="white" sx={{border: '3px solid grey' }}>
					<Grid container direction="row-reverse"   justifyContent="space-between"  alignItems="stretch">
						<Box width="25%">
							<MenuButton/>
						</Box>
						<Box width="70%">
							<Box sx={{ p: 1, border: '3px solid grey' }}  width="100%" height="100%">
								<FixedSizeList
									height={400}
									width="100%"
									itemSize={46}
									itemCount={200}
									overscanCount={5}
								>
									{renderRow}
								</FixedSizeList>
							</Box>
						</Box>
					</Grid>
				</Box>
            </div>
        );
    };
}