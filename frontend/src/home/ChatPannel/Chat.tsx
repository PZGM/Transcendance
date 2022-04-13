import { ButtonBase, Typography } from "@mui/material";
import { Component} from "react";
import { Navigate } from "react-router-dom";
import { isPrivateIdentifier } from "typescript";
import { UserAPI } from "../../api/Users.api";

interface ChatState {
    chanId?: number
}

interface ChatProps {
    params: any,
    isPrivateMessage: boolean,
};

export class Chat extends Component<ChatProps, ChatState> {
	constructor(props: ChatProps) {
		super(props);
        this.state = {
            chanId: undefined,
        }
	}

	componentDidMount()  {
        const id = this.props.params.name;
        // if (this.props.isPrivateMessage)
        //     chanId = getPrivateMessageChannel(id);
        // else
        this.setState({
            chanId: id,
        })
	}

	render () {

		return (
            <>
                <Typography>{`Yo je suis le Chat ${this.state.chanId} this is ${(!this.props.isPrivateMessage) ? 'not' : ''} a private message channel `}</Typography>
            </>

		)
	}
}