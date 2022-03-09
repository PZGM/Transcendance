import { Button, Avatar, Box, Stack, Typography, ButtonBase } from "@mui/material";
import { Component} from "react";
import { Link } from "react-router-dom";
import { UserAPI } from "../api/Users.api";



interface MyInfosProps {
    login?: string;
    avatar?: string;
};


export class MyInfos extends Component<MyInfosProps> {
	constructor(props: MyInfosProps) {
		super(props);
	}



	async fetchUser() {
		const resp = await UserAPI.getUser();
		this.setState({
			avatar: resp.img_url,
			login: resp.login
		})
	}

	componentDidMount()  {
		this.fetchUser();
	}



	render () {
		return (
            <ButtonBase className="chibre" component={Link} to={process.env.REACT_APP_PROFILE as string} sx={{margin: 1}}>
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
					<Avatar className="chibre" variant='circular' alt="Semy Sharp" src={this.props.avatar}/>
					<Typography>{this.props.login}</Typography>
				</Stack>
            </ButtonBase>
		)
	}
}