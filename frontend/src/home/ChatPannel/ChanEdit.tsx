import { ButtonBase, Typography } from "@mui/material";
import { Component} from "react";
import { Navigate } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";
import { UserAPI } from "../../api/Users.api";

interface ChanEditState {
    chan?: any
}

interface ChanEditProps {
    params: any,
};

export class ChanEdit extends Component<ChanEditProps, ChanEditState> {
	constructor(props: ChanEditProps) {
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
                <Typography>{`Yo je suis le ChanEdit de ${this.state.chan} `}</Typography>
            </>

		)
	}
}