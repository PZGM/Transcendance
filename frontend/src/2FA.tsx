import { Box, ListItem, ListItemButton, ListItemText, Grid, Divider, InputBase, Button, Typography } from "@mui/material";
import { Component } from "react";
import { Helmet } from "react-helmet";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { UserAPI } from "./api/Users.api";
import Menu from "./menu/Menu";
import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import background from "./asset/images/background.jpg"
import "./style/buttons.css"


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
        const GridItemStyle = {
			color: 'white',
			alignItems: 'center',
			display: "flex",
			justifyContent: 'center',
			fontFamily: 'Bit9x9',
			fontSize: 'calc(10px + 1vw)',
            width: "100%"
		};

		return (

            <div style={{
				backgroundImage: `url(${background})`,
				backgroundSize: 'cover',
				height: '100vh',
				width: '100vw',
				backgroundRepeat: 'norepeat',
				}}
			>
                {/* Redirect to home */}
                { this.state.redirect ? (<Navigate to="/home"/>) : null }
				
                <div style={{
					height: '100vh',
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					}}
				>
				<Grid container
                    justifyContent="space-between"
                    wrap="nowrap"
                    sx={{
                            border: '0.5vw solid rgba(0, 70, 109, 1)',
                            outline: '0.5vw solid rgba(0, 80, 117, 1)',
                            backgroundColor: 'black',
                            height: 'undefined',
                            width: 'undefined',
                            minWidth: "400px", minHeight: "800px",
                            maxWidth: "600px", maxHeight: "1000px"
                        }}
				>
                    <Grid container
                        direction="column"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{width: '100%'}}
                    >
                        <Grid item xs={4} sx={GridItemStyle}> 2FA AUTHENTICATION</Grid>
                        <Grid item xs={3} sx={GridItemStyle}>
                        <InputBase autoFocus
                            placeholder="enter code"
                            sx={{fontFamily: 'Bit5x5',
                                fontSize: 'calc(10px + 1vw)',
                                color: 'white',
                                textAlign: 'center',
                                border: '5px solid #0075FD',
                                boxShadow: '5px 5px 0px -1px rgba(0,117,253,0.5)'
                                }}
                            inputProps={{style: { textAlign: 'center',
                                                border: '10px red' }}}
                            onChange={ async (e) => {this.onChange(e.target.value)}}
                        />
                        </Grid>
                        <Grid item xs={5} sx={GridItemStyle}>
                            <div className="settings_edit_button green"
                                onClick={this.onValidation.bind(this)}>
                                LOGIN
                            </div>
                        </Grid>
                    </Grid>
				</Grid>

				</div>
            </div>
        );
    };
}