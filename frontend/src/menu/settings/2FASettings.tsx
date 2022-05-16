import { Stack, Grid } from "@mui/material";
import { Fragment, Component } from "react";
import { UserAPI } from "../../api/Users.api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../style/buttons.css";
import "../../style/input.css";

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
            twofa: false,
            activating: this.props.activating
        }
        this.fetch();
	}

    componentDidMount() {
        if (this.props.activating === true)
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
        if (state === 0)
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
            position: toast.POSITION.BOTTOM_CENTER,
            pauseOnHover: false,
            closeOnClick: true,
        })
    }

    async onValidation() {
        const isValid = await UserAPI.turnTwofaOn(this.state.input);
        if (isValid) {
            toast.success("2FA activated", {
                position: toast.POSITION.BOTTOM_CENTER,
                pauseOnHover: false,
                closeOnClick: true,
            })
            this.setState({twofaState: 2})
            this.props.updateDisplay(0)
        }
        else
            toast.error("Invalid code", {
                position: toast.POSITION.BOTTOM_CENTER,
                pauseOnHover: false,
                closeOnClick: true,
            })
         
    }

    on() {
        if (this.state.twofaState === TwofaState.disabled)
            this.props.updateDisplay(2);
        else
            toast.error("2FA is aready active", {
                position: toast.POSITION.BOTTOM_CENTER,
                pauseOnHover: false,
                closeOnClick: true, })
    }

    off() {
        if (this.state.twofaState === TwofaState.enabled)
            this.disable();
        else
            toast.error("2FA is not active", {
            position: toast.POSITION.BOTTOM_CENTER,
            pauseOnHover: false,
            closeOnClick: true, })
    }

    render() {

        return (
            
            <Fragment>

            {!this.state.activating &&
                <Grid container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{height: '33%'}}
                >
                    <Grid item xs={4} className="grid_item_style"> 2FA </Grid>
                    <Grid item xs={4} className="grid_item_style">
                        <div    className={this.state.twofaState === TwofaState.enabled ?
                                        "settings_button but_green" : "settings_button but_white"}
                                onClick={this.on.bind(this)}
                        >
                            ON
                        </div>
                    </Grid>
                    <Grid item xs={4} className="grid_item_style">
                        <div className={this.state.twofaState === TwofaState.disabled ?
                                        "settings_button but_red" : "settings_button but_white"}
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
                    flexWrap='nowrap'
                >
                    <Grid item xs={2} className="grid_item_style"> 2FA </Grid>
                    <Grid item xs={4} className="grid_item_style">
                        {this.state.displayQR && 
                            <img    src={process.env.REACT_APP_2FA_GENERATE}
                                    className="bor_cyan qrcode"
                                    alt='2FA QR code'
                            />
                        }
                    </Grid>
                    <Grid item xs={2} className="grid_item_style">
                    <input
                        id="unstyled"
                        className="settings_2fa_input"
                        placeholder="enter code"
                        onChange={ async (e) => {this.onChange(e.target.value)}}
                    />
                    </Grid>
                    <Grid item xs={2} className="grid_item_style">
                        <div className="settings_edit_button but_green"
                            onClick={this.onValidation.bind(this)}>
                            VALIDATE
                        </div>
                    </Grid>
                    <Grid item xs={2} className="grid_item_style">
                        <Stack
						direction="row"
						justifyContent="space-evenly"
						alignItems="center"
						style={{width: "100%"}}>
							<div className="settings_edit_button but_blue"
								style={{lineHeight: '1.5'}}
                                onClick={this.generate.bind(this)}
                            >
								REGENERATE QR CODE
							</div>
							<div className="settings_edit_button but_red"
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
