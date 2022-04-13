import { ButtonBase, Typography } from "@mui/material";
import { Component} from "react";
import { Navigate } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";
import { UserAPI } from "../../api/Users.api";

interface ChanAddUserState {
    chan?: any
}

interface ChanAddUserProps {
    params: any,
};

export class ChanAddUser extends Component<ChanAddUserProps, ChanAddUserState> {
	constructor(props: ChanAddUserProps) {
		super(props);
        this.state = {
            chan: undefined,
        }
	}

	componentDidMount()  {
        const id = this.props.params.name;
        // if (this.props.isPrivateMessage)
        //     chanId = getPrivateMessageChannel(id);
        // else
        this.setState({
            chan: id,
        })
	}

	render () {

		return (
            <>
                <Typography>{`Yo je suis le ChanAddUser de ${this.state.chan} `}</Typography>
            </>

		)
	}
}