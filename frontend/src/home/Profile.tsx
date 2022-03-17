import { ButtonBase, Typography } from "@mui/material";
import { Component} from "react";



interface ProfileProps {
    id?: number;
    updateDisplay: any;
};


export class Profile extends Component<ProfileProps> {
	constructor(props: ProfileProps) {
		super(props);
	}

	componentDidMount()  {
	}



	render () {
		return (
            <>
                <Typography>{`Yo je suis le profile de ${this.props.id}`}</Typography>
                <ButtonBase onClick={ () => {this.props.updateDisplay(0);}}> Go to chat </ButtonBase>
            </>

		)
	}
}