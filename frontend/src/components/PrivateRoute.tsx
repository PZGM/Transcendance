import { Typography } from "@mui/material";
import { Component } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserAPI } from "../api/Users.api";

interface PrivateRouteState {
    isLoaded: boolean,
    isAuthenticated: boolean
};

interface PrivateRouteProps {};

export class PrivateRoute extends Component<PrivateRouteProps, PrivateRouteState>{

    constructor(props: PrivateRouteProps) {
		super(props);
		this.state = {isLoaded: false, isAuthenticated: false};
	}

    async componentDidMount(): Promise<void> {
        const auth = await UserAPI.checkLoggedIn();
        console.log(`auth = ${auth}`)
        this.setState({
            isAuthenticated: auth,
            isLoaded: true,
        })
    }

    render() {
        if (!this.state.isLoaded)
            return <Typography>Loading ...</Typography>
        return this.state.isAuthenticated ? <Outlet/> : <Navigate to="/" />;
    }
}