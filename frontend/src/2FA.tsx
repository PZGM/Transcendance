import { Grid } from "@mui/material";
import { Component } from "react";
import { UserAPI } from "./api/Users.api";
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style/buttons.css"
import "./style/display.css"


interface TwofaProps {
};

interface TwofaState {
    input: string;
    twofa: boolean;
    redirect: boolean;
}

export class Twofa extends Component<TwofaProps, TwofaState> {

    constructor(props: TwofaProps) {
		super(props);
		this.state = {input : '', twofa: false, redirect: false};
        this.onChange = this.onChange.bind(this);
	}

    onChange(str: string) {
        this.setState({
            input: str
        })
    }

    async onValidation() {
        const isValid = await UserAPI.authenticateTwofa(this.state.input);
        if (isValid)
            this.setState({redirect: true});
        else
            toast.error("Invalid code", {
                position: toast.POSITION.BOTTOM_CENTER
            })
    }

	render ()
    {
		return (

            <div className="background">
                {/* Redirect to home */}
                { this.state.redirect ? (<Navigate to="/home"/>) : null }
				
                <div className="frame_div">
                    <Grid container
                        justifyContent="space-evenly"
                        wrap="nowrap"
                        className="twofa_frame"
                        direction="column"
                        alignItems="center"
                    >
                        <Grid item xs={4} className="grid_item_style"> 2FA AUTHENTICATION</Grid>
                        
                        <Grid item xs={3} className="grid_item_style">
                            <input
                                id="unstyled"
                                className="settings_2fa_input"
                                placeholder="enter code"
                                onChange={ async (e) => {this.onChange(e.target.value)}}
                            />
                        </Grid>
                        
                        <Grid item xs={5} className="grid_item_style">
                            <div className="settings_edit_button but_green"
                                onClick={this.onValidation.bind(this)}>
                                LOGIN
                            </div>
                        </Grid>
                    </Grid>
				</div>
            </div>
        );
    };
}