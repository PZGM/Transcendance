import { Button } from "@mui/material";
import { Component } from "react";

interface SettingsProps {
};


export class Settings extends Component<SettingsProps> {
	constructor(props: SettingsProps) {
		super(props);
    }
    render (){
        return(
            <div>
                <Button>yo</Button>
            </div>
        );
    }
}