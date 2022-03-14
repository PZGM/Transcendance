import { ButtonBase, Typography } from "@mui/material";
import { Component} from "react";
import { Navigate } from "react-router-dom";
import { UserAPI } from "../api/Users.api";

interface ProfileState {
	redirect: boolean,
}

interface ProfileProps {
    id?: number;
    updateDisplay: any;
};

export class Profile extends Component<ProfileProps, ProfileState> {
	constructor(props: ProfileProps) {
		super(props);
		this.logout = this.logout.bind(this);
		this.state = {
			redirect: false,
		}
	}

	componentDidMount()  {
	}

	logout() {
		UserAPI.logout();
		this.setState({
			redirect: true,
		})
	}	

	render () {
		return (
            <>
				{ this.state.redirect ? (<Navigate to="/"/>) : null }
                <Typography>{`Yo je suis le profile de ${this.props.id}`}</Typography>
                <ButtonBase onClick={ () => {this.props.updateDisplay(0);}}> Go to chat </ButtonBase>
                <ButtonBase onClick={this.logout} > Logout</ButtonBase>


            </>

		)
	}
}