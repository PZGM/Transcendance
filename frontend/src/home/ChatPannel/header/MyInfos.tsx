import { Avatar, ButtonBase } from "@mui/material";
import { Component} from "react";
import { Link } from "react-router-dom";
import { UserAPI } from "../../../api/Users.api";



interface MyInfosProps {
    login?: string;
    avatar?: string;
};


export class MyInfos extends Component<MyInfosProps> {

	async fetchUser() {
		const resp = await UserAPI.getUser();
		if (resp)
		this.setState({
			avatar: resp.avatar,
			login: resp.login
		})
	}

	componentDidMount()  {
		this.fetchUser();
	}

	render () {
		return (
            <ButtonBase component={Link} to={process.env.REACT_APP_PROFILE as string} >
                <Avatar variant='circular' alt="Semy Sharp" src={this.props.avatar} sx={{margin: 1}}/>
				<div className='backto1982' style={{color: "white"}}> {this.props.login} </div>
            </ButtonBase>
		)
	}
}