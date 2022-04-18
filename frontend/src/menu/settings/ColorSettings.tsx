import { Avatar, Grid, Stack } from "@mui/material";
import { ButtonUnstyled } from "@mui/base";
import { ChangeEvent, Component, Fragment } from "react";
import { UserAPI } from "../../api/Users.api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AvatarEditor from "react-avatar-editor";
import axios from "axios";
import "../../style/buttons.css";
import "../../style/display.css"
import { Vector } from "tsparticles";

type ColorSettingsProps = {
    color: string,
    updateParentState: any
};

interface ColorSettingsState {
    selected: string
}

export class ColorSettings extends Component<ColorSettingsProps, ColorSettingsState> {

	constructor(props: ColorSettingsProps) {
        super(props);

        console.log(`props: ${this.props.color}`)

        this.state = {
            selected: this.props.color
        }
	}

    getClassName(color: string): string | undefined
	{
        if (color == this.state.selected)
            return "bc_" + color + " color_selected"

		return "but_" + color
	}

    onClick(color: string)
    {
        this.setState({selected: color});
        UserAPI.updateColor(color);
        this.props.updateParentState({color})
    }

    render()
    {

        console.log("Color render")

		// Da togliere
		const GridItemStyle = {
			alignItems: 'center',
			display: "flex",
			justifyContent: 'center',
			fontSize: 'calc(10px + 1vw)',
			width: '100%',
            height: '100%'
		};

        return (

            <Grid container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{height: '33%'}}
            >
                <Grid item xs={4}
                    className="bit9x9 white"
                    style={GridItemStyle}
                >
                    COLOR
                </Grid>
                
                <Grid item xs={8}
                    style={GridItemStyle}
                >
                        <Stack direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={4}
                            style={{width: '100%'}}
                        >
                            <div className={"colors_button " + this.getClassName('green')}
                                onClick={() => {this.onClick('green')}}/> 
                            <div className={"colors_button " + this.getClassName('red')}
                                onClick={() => {this.onClick('red')}}/> 
                            <div className={"colors_button " + this.getClassName('pink')}
                                onClick={() => {this.onClick('pink')}}/>
                            <div className={"colors_button " + this.getClassName('yellow')}
                                onClick={() => {this.onClick('yellow')}}/>
                            <div className={"colors_button " + this.getClassName('white')}
                                onClick={() => {this.onClick('white')}}/> 
                            <div className={"colors_button " + this.getClassName('cyan')}
                                onClick={() => {this.onClick('cyan')}}/>
                        </Stack>
                </Grid>
            </Grid>
        )
    }
}
