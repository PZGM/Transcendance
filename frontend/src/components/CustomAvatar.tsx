import Badge, { BadgeProps } from '@mui/material/Badge';
import { Component } from "react";
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { Avatar } from '@mui/material';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
	'& .MuiBadge-badge': {
	  border: `2px solid ${theme.palette.background.paper}`,
	},
  }));

type CustomAvatarProps = {
	id: number;
}

interface CustomAvatarState {
	status: number;
	color: string | undefined;
}

interface StatusData {
    status: number;
}

export class CustomAvatar extends Component<CustomAvatarProps, CustomAvatarState>{
	constructor(props: CustomAvatarProps) {
		super(props);
		this.state = {status: 0, color: 'red'}
	}

	componentDidMount()  {
		const source: any = new EventSource('https://ssh.billyboy.fr:3333/api/status/user');
		source.onmessage = (e: { data: string; }) => {
			let colors = new Map<number, string>([
				[0, 'red'],
				[1, 'lime'],
				[2, 'gold'],
				[3, 'royalblue']
			]);
			let jsonObj: any = JSON.parse(e.data); // string to generic object first
			let status: StatusData = jsonObj as StatusData;
			this.setState({
				status: status.status,
				color: colors.get(status.status)
			})
			console.log(this.state.color);
		};
	}

	render () {
		return (
			<StyledBadge   sx={{
				"& .MuiBadge-badge": {
				  background: this.state.color,
				}
			  }} badgeContent=" "   overlap="circular" anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
				<Avatar alt="Semy Sharp" src='https://ssh.billyboy.fr:3333/api/images/0137da72-e05e-4de3-9145-3b84e1f785ef.jpg' />
			</StyledBadge>
		)
	}
}