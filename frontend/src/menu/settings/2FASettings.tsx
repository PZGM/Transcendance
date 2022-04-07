import { Button, Stack, Grid, InputBase, Typography } from "@mui/material";
import { Fragment, Component } from "react";
import { Navigate } from "react-router-dom";
import { UserAPI } from "../../api/Users.api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import button from "../../style/buttons.module.css";

enum TwofaState {
    disabled,
    pending,
    enabled
}

type TwofaSettingsProps = {
    updateDisplay: any
    updateParentState: any
    activating: boolean
};

interface TwofaSettingsState {
    twofaState: TwofaState;
    displayQR: boolean;
    input: string;
    redirect: boolean;
    twofa: boolean;
    activating: boolean
    
}

export class TwofaSettings extends Component<TwofaSettingsProps, TwofaSettingsState> {

	constructor(props: TwofaSettingsProps) {
		super(props);
        this.enable = this.enable.bind(this);
        this.disable = this.disable.bind(this);
		this.state = {
            twofaState: TwofaState.disabled,
            displayQR: false,
            input: '',
            redirect: false,
            twofa: false,
            activating: this.props.activating
        }
        this.fetch();
	}

    componentDidMount() {
        if (this.props.activating == true)
            this.enable()
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
        let state = this.state.twofaState;
        if (state == 0)
            state = 1;
        this.setState({
            twofaState: state,
            displayQR: true,
        });
    }

    async generate() {
        await UserAPI.getTwofaQR()
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

    async disable() {
        await UserAPI.turnTwofaOff();
        this.setState({
            twofaState: TwofaState.disabled,
        });
        toast.success("2FA disabled", {
            position: toast.POSITION.BOTTOM_CENTER
        })
    }

    async onValidation() {
        console.log(this.state.input)
        const isValid = await UserAPI.turnTwofaOn(this.state.input);
        if (isValid) {
            toast.success("2FA activated", {
                position: toast.POSITION.BOTTOM_CENTER
            })
            this.setState({twofaState: 2})
            this.props.updateDisplay(0)
        }
        else
            toast.error("Invalid code", {
                position: toast.POSITION.BOTTOM_CENTER
            })
         
    }

    getOnColor(): string {
        if (this.state.twofaState == TwofaState.enabled)
            return ("#13D590");     
        return ("#B6D2E1")
    }

    on() {
        if (this.state.twofaState == TwofaState.disabled)
            this.props.updateDisplay(2);
        else
            toast.error("2FA is aready active", {
                position: toast.POSITION.BOTTOM_CENTER })
    }

    off() {
        if (this.state.twofaState == TwofaState.enabled)
            this.disable();
        else
            toast.error("2FA is not active", {
            position: toast.POSITION.BOTTOM_CENTER })
    }

    getOffColor(): string {
        if (this.state.twofaState == TwofaState.disabled)
            return ("#E50033");     
        return ("#B6D2E1")
    }

    render() {

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
            
            <Fragment>

            {!this.state.activating &&
                <Grid container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{height: '33%'}}
                >
                    <Grid item xs={4} sx={GridItemStyle}> 2FA </Grid>
                    <Grid item xs={4} sx={GridItemStyle}>
                        <div    className={button.button}
                                style={{width: '100px',
                                        height: '70px',
                                        backgroundColor: this.getOnColor(),
                                        fontFamily: 'backto1982',
                                        fontSize: '30px'}}
                                        onClick={this.on.bind(this)}
                        >
                            ON
                        </div>
                    </Grid>
                    <Grid item xs={4} sx={GridItemStyle}>
                        <div className={button.button}
                            style={{width: '100px',
                                    height: '70px',
                                    backgroundColor: this.getOffColor(),
                                    fontFamily: 'backto1982',
                                    fontSize: '30px'}}
                            onClick={this.off.bind(this)}
                        >
                            OFF
                        </div>
                    </Grid>
                </Grid>
            }

            {this.state.activating &&
                <Grid container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{height: '100%',
					width: '100%'}}
                >
                    <Grid item xs={2} sx={GridItemStyle}> 2FA </Grid>
                    <Grid item xs={4} sx={GridItemStyle}>
                        {this.state.displayQR && 
                            <img    src={process.env.REACT_APP_2FA_GENERATE}
                                    style={{border: '5px solid #03C7D8',
                                            boxShadow: '5px 5px 0px -1px rgba(3,199,218,0.5)'
                                        }}
                            />
                        }
                    </Grid>
                    <Grid item xs={2} sx={GridItemStyle}>
                    <InputBase autoFocus
                        placeholder="enter code"
                        sx={{fontFamily: 'Bit5x5',
                            fontSize: 'calc(10px + 1vw)',
                            color: 'white',
                            textAlign: 'center',
                            border: '5px solid #0075FD',
                            boxShadow: '5px 5px 0px -1px rgba(0,117,253,0.5)'
                            }}
                        // onChange={this.handleChangeLogin}
                        inputProps={{style: { textAlign: 'center',
                                            border: '10px red' }}}
                        onChange={ async (e) => {this.onChange(e.target.value)}}
                    />
                    </Grid>
                    <Grid item xs={2} sx={GridItemStyle}>
                        <div className={button.button}
                            style={{width: '200px',
                                    height: '70px',
                                    backgroundColor: '#13D590',
                                    fontFamily: 'backto1982',
                                    fontSize: '25px',
                                    alignItems: 'center',
                                    justifyContent: 'center',display: 'flex'}}
                            onClick={this.onValidation.bind(this)}>
                            VALIDATE
                        </div>
                    </Grid>
                    <Grid item xs={2} sx={GridItemStyle}>
                        <Stack
						direction="row"
						justifyContent="space-evenly"
						alignItems="center"
						style={{width: "100%"}}>
							<div className={button.button}
								style={{width: '200px',
										height: '70px',
										backgroundColor: '#0075FD',
										fontFamily: 'backto1982',
										fontSize: '18px',
										alignItems: 'center',
										justifyContent: 'center',
                                        display: 'flex',
                                        lineHeight: '1.5',
                                        boxShadow: '5px 5px 0px -1px rgba(0,117,253,0.5)'}}
								onClick={this.generate.bind(this)}
                                >
								REGENERATE QR CODE
							</div>
							<div className={button.button}
								style={{width: '200px',
										height: '70px',
										backgroundColor: '#E50033',
										fontFamily: 'backto1982',
										fontSize: '25px',
										alignItems: 'center',}}
								onClick={() => {this.props.updateDisplay(0)}}>
								CANCEL
							</div>
						</Stack>
                    </Grid>
                </Grid>
            }
 
            </Fragment>
        )
    }
}
