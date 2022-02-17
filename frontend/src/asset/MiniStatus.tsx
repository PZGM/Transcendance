import Badge, { BadgeProps } from '@mui/material/Badge';
import { Component } from "react";
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { Avatar, Box, Tooltip } from '@mui/material';
import { UserAPI } from '../api/Users.api';

type MiniStatusProps = {
	id: number;
}

interface MiniStatusState {
	status: number;
}

interface StatusData {
    status: number;
}

export class MiniStatus extends Component<MiniStatusProps, MiniStatusState>{

	eventSource: any;

	constructor(props: MiniStatusProps) {
		super(props);
		this.state = {status: 0}
	}

	async fetchStatus() {
		try {
			const resp = await UserAPI.getUserById(this.props.id);
			this.setState({
				status: (resp) ? resp.status : 0,
			})
		}
		catch (e) {
			console.log('hey salut');
		}

	}

	componentDidMount()  {
		this.fetchStatus();
		this.eventSource = new EventSource((process.env.REACT_APP_UPDATE_STATUS as string) + this.props.id, {withCredentials: true});
		this.eventSource.onmessage = (e: { data: string; }) => {
			let jsonObj: any = JSON.parse(e.data);
			let status: StatusData = jsonObj as StatusData;
			if (status.status < 0 || status.status > 4)
				status.status = 0;
			this.setState({
				status: status.status,
			})
		};
		this.eventSource.onerror = (e: any) => {
			this.setState({
				status: 0,
			})
		}
	}

	componentWillUnmount() {
		this.eventSource.close();
	}

	render () {
		let colors = new Map<number, string>([
			[0, 'grey.500'],
			[1, 'red'],
			[2, 'gold'],
			[3, 'lime'],
			[4, 'royalblue']]);
		let description = new Map<number, string>([
			[0, 'unknow'],
			[1, 'disconnected'],
			[2, 'idle'],
			[3, 'connected'],
			[4, 'playing']]);
		return (
			<Tooltip title={`${description.get(this.state.status)}`} arrow>
				<Box
				sx={{
				width: 10,
				height: 10,
				backgroundColor: colors.get(this.state.status),
				color: 'white',
				border: 1,
				}}/>
			</Tooltip>
		)
	}
}