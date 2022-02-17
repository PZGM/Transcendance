import { Avatar, Box, Button, ButtonGroup, ListItem, ListItemAvatar, ListItemButton, ListItemText, Skeleton, Stack, Typography } from "@mui/material";
import { Component } from "react";
import { UserAPI } from "../../api/Users.api";
import { MiniStatus } from "../../asset/MiniStatus";
import styles from './../../style/dac.module.css'

type UserDisplayProps = {
	id: number;
}

interface UserDisplayState {
	status: number;
    avatar?: string;
    login?: string;
}

interface StatusData {
    status: number;
}

export class UserDisplay extends Component<UserDisplayProps, UserDisplayState>{

	eventSource: any;

	constructor(props: UserDisplayProps) {
		super(props);
		this.state = {status: 0, avatar: undefined, login: undefined}
	}

	async fetchUser() {
		try {
			const resp = await UserAPI.getUserById(this.props.id);
			this.setState({
				status: (resp) ? resp.status : 0,
                avatar: (resp) ? resp.img_url : undefined,
                login: (resp) ? resp.login : undefined,
			})
		}
		catch (e) {
			console.log('hey salut');
		}

	}

	componentDidMount()  {
		this.fetchUser();
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
		console.log('render')
		let colors = new Map<number, string>([
			[0, 'grey'],
			[1, 'red'],
			[2, 'gold'],
			[3, 'limegreen'],
			[4, 'royalblue']]);
		let description = new Map<number, string>([
			[0, 'unknow'],
			[1, 'disconnected'],
			[2, 'idle'],
			[3, 'connected'],
			[4, 'playing']]);
		return (
			<Box mr='2px'>
            <ListItem className={styles.bdac}
            key={this.props.id}
            secondaryAction={
                <Stack spacing={1} direction="row">
                     <Button className={styles.dac} style={{width: '120px', height: '50px', borderRadius: 0, backgroundColor: colors.get(this.state.status)}}>
                        <Typography variant="button" color='white'>
                                {description.get(this.state.status)}
                         </Typography>
                     </Button>
                     <Button className={styles.dac} style={{width: '80px', height: '50px', borderRadius: 0, backgroundColor:'grey'}} >
                     <Typography variant="button" color='white'>
                            send message
                        </Typography>
                     </Button>                    
                     <Button className={styles.dac} style={{width: '80px', height: '50px', borderRadius: 0, backgroundColor:'red'}} >
                     <Typography variant="button" color='white'>
                             Remove friend
                         </Typography>
                     </Button>
                </Stack>

            }
            disablePadding
        >
            <ListItemButton>
            <ListItemAvatar>
                <Avatar variant='circular' alt={this.state.login} src={this.state.avatar}/>
            </ListItemAvatar>
            <ListItemText primary={this.state.login} />
            </ListItemButton>
        </ListItem>
		</Box>
		);
	}
}