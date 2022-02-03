import { Box, Drawer, Grid, Typography } from "@mui/material";
import React, { useEffect, useState, Component } from "react";
import { Helmet } from "react-helmet";
import '../App.css';


const drawerWidth = 500;

interface HomeProps {};

export class Home extends Component<HomeProps> {
	constructor(props: HomeProps){
		super(props);
	}




	render () {
		return (
			<div>
				<Helmet>
					<style>{'body { background-color: black; }'}</style>
				</Helmet>

				<Drawer
				sx={{
					flexShrink: 0,
					'& .MuiDrawer-paper': {
						width: 300,
						boxSizing: 'border-box',
						bgcolor: 'majenta',
					},
				}}
				variant="permanent"
				anchor="right"
				>
					<Typography>yo</Typography>
				</Drawer>
			</div>
		)
	}
}