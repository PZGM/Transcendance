import { ButtonBase, Typography } from "@mui/material";
import { Component} from "react";
import { Navigate } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";
import { UserAPI } from "../../api/Users.api";

interface UserInfoState {
    user?: any
}

interface UserInfoProps {
    params: any,
};

export class UserInfo extends Component<UserInfoProps, UserInfoState> {
	constructor(props: UserInfoProps) {
		super(props);
        this.state = {
            user: undefined,
        }
	}

	componentDidMount()  {
        const id = this.props.params.name;
        // if (this.props.isPrivateMessage)
        //     chanId = getPrivateMessageChannel(id);
        // else
        this.setState({
            user: id,
        })
	}

	render () {

		return (
            <>
                <Typography>{`Yo je suis le UserInfo de ${this.state.user} `}</Typography>
            </>

		)
	}
}