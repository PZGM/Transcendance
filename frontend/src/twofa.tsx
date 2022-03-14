import { Box, ListItem, ListItemButton, ListItemText, Grid, Divider, InputBase, Button, Typography } from "@mui/material";
import { Component } from "react";
import { Helmet } from "react-helmet";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { UserAPI } from "./api/Users.api";
import MenuButton from "./menu/MenuButton";
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
        this.onValidation = this.onValidation.bind(this);
        this.fetch2fa = this.fetch2fa.bind(this);
        this.fetch2fa();
	}

    async fetch2fa() {
        try {
            const resp = await UserAPI.isTwofaEnabled();
            console.log(`resp : ${resp}`);
            this.setState({
                twofa: resp,
            })
            console.log(`twofa : ${this.state.twofa}`)
        }
        catch (e) {
            console.log(e);
        }
    }

    onChange(str: string) {
        this.setState({
            input: str
        })
    }

    onDisable() {
        UserAPI.turnTwofaOff();
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

	render (){
		return(
            <div>
                <ToastContainer />
				<Helmet>
					<style>{'body { background-color: black; }'}</style>
				</Helmet>
                { this.state.redirect ? (<Navigate to="/profile"/>) : null }
				<Box m="10%" p="10px" display="flex" width="100% - 3px" height="100% - 3px" bgcolor="white" sx={{border: '3px solid grey' }}>
					<Grid container direction="row-reverse"   justifyContent="space-between"  alignItems="stretch">
						<Box width="25%">
							<MenuButton/>
						</Box>
                        <Typography>{(this.state.twofa) ? 'Twofa is enabled' : "Twofa isn't enabled"}</Typography>
						<Box width="70%">
                            <InputBase fullWidth inputProps={{min: 0, style: { textAlign: 'center' }}} placeholder="enter code" onChange={ async (e) => {this.onChange(e.target.value)}}/>
                            <Button onClick={this.onValidation}>
                                login 2FA
                            </Button>
                            <Button onClick={this.fetch2fa}>
                                check state
                            </Button>
						</Box>
					</Grid>
				</Box>
            </div>
        );
    };
}