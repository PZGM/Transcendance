import { Button, Grid, InputBase, Typography } from "@mui/material";
import { Component } from "react";
import { Navigate } from "react-router-dom";
import { UserAPI } from "../../api/Users.api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

enum TwofaState {
    disabled,
    pending,
    enabled
}

type TwofaSettingsProps = {
};

interface TwofaSettingsState {
    twofaState: TwofaState;
    displayQR: boolean;
    input: string;
    redirect: boolean;
    twofa: boolean;
    
}

export class TwofaSettings extends Component<TwofaSettingsProps, TwofaSettingsState> {

	constructor(props: TwofaSettingsProps) {
		super(props);
        this.enable = this.enable.bind(this);
        this.generate = this.generate.bind(this);
        this.onValidation = this.onValidation.bind(this);
        this.onDisable = this.onDisable.bind(this);
		this.state = {
            twofaState: TwofaState.disabled,
            displayQR: false,
            input: '',
            redirect: false,
            twofa: false,
        }
        this.fetch();
	}

    async fetch() {
        try {
            const twofa = await UserAPI.isTwofaEnabled();
            let state = (twofa) ? 2 : 0;
            this.setState({
                twofa,
                twofaState: state,
            })
        }
        catch (e) {
            console.log(e);
        }
    }
    
    async enable() {
        const url = await UserAPI.getTwofaQR();
        let state = this.state.twofaState;
        if (state == 0)
            state = 1;
        this.setState({
            twofaState: state,
            displayQR: true,
        });
    }

    async generate() {
        const url = await UserAPI.getTwofaQR();
        this.setState({
            displayQR: false,
        })
        this.setState({
            displayQR: true,
        })
    }

    onChange(str: string) {
        this.setState({
            input: str
        })
    }

    async onDisable() {
        await UserAPI.turnTwofaOff();
        this.setState({
            twofaState: TwofaState.disabled,
        });
        toast.success("2FA disabled", {
            position: toast.POSITION.BOTTOM_CENTER
        })
    }

    async onValidation() {
        const isValid = await UserAPI.turnTwofaOn(this.state.input);
        if (isValid) {
            toast.success("2FA activated", {
                position: toast.POSITION.BOTTOM_CENTER
            })
            this.setState({twofaState: 2});
        }
        else
        toast.error("Invalid code", {
            position: toast.POSITION.BOTTOM_CENTER
        })
            
    }

    render() {
        return (
            <>
                <ToastContainer />
                { this.state.redirect ? (<Navigate to="/profile"/>) : null }
                <Grid container direction="column" justifyContent="space-between" alignItems="baseline">
                    <Typography>{`Two Factors Authentification : ${TwofaState[this.state.twofaState]}`}</Typography>
                    { this.state.twofaState == TwofaState.disabled && <Button onClick={this.enable} variant="contained" style={{borderRadius: 0}} >enable</Button> }
                    { this.state.twofaState == TwofaState.pending && <Button onClick={this.generate} variant="contained" style={{borderRadius: 0}} >Generate New QR code</Button> }
                    { this.state.displayQR && this.state.twofaState == TwofaState.pending && <img src={process.env.REACT_APP_2FA_GENERATE}></img>}
                    { this.state.twofaState == TwofaState.pending && <InputBase inputProps={{min: 0, style: { textAlign: 'center' }}} placeholder="enter code" onChange={ async (e) => {this.onChange(e.target.value)}}/>}
                    { this.state.twofaState == TwofaState.pending && <Button onClick={this.onValidation} variant="contained" style={{borderRadius: 0}} >Validate</Button>}
                    { this.state.twofaState == TwofaState.enabled && <Button onClick={this.onDisable} variant="contained" style={{borderRadius: 0}} >disable 2FA</Button>}
                </Grid>
            </>
        )
    }
}