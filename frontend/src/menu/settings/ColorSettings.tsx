import { Grid, Stack } from "@mui/material";
import { Component } from "react";
import { UserAPI } from "../../api/Users.api";
import 'react-toastify/dist/ReactToastify.css';
import "../../style/buttons.css";
import "../../style/display.css"

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
        this.state = {
            selected: this.props.color
        }
	}

    getClassName(color: string): string | undefined
	{
        if (color === this.state.selected)
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

        return (

            <Grid container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{height: '33%'}}
            >
                <Grid item xs={4}
                    className="grid_item_style"
                >
                    COLOR
                </Grid>
                
                <Grid item xs={8}
                    className='grid_item_style'
                >
                        <Stack direction="row"
                            justifyContent="space-around"
                            alignItems="center"
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
