import { ButtonBase, Typography } from "@mui/material";
import { Component} from "react";
import { Navigate } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";
import { UserAPI } from "../../api/Users.api";

interface ChanInfoState {
    chan?: any
}

interface ChanInfoProps {
    params: any,
};

export class ChanInfo extends Component<ChanInfoProps, ChanInfoState> {
	constructor(props: ChanInfoProps) {
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
                <Typography>{`Yo je suis le ChanInfo de ${this.state.chan} `}</Typography>
            </>

		)
	}
}