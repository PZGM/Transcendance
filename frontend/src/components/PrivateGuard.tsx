import React, { Component } from "react";
import { Navigate } from 'react-router-dom';
import { UserAPI } from "../api/Users.api";

interface PrivateGuardProps {

}

interface PrivateGuardState {
    isLoaded: boolean,
    isAuthenticated: boolean
}

export class PrivateGuard extends Component<PrivateGuardProps, PrivateGuardState>{
    constructor(props: PrivateGuardProps) {
		super(props);
        this.state = {
            isLoaded: false,
            isAuthenticated: false
        }
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
        return (
            <>
                { (this.state.isLoaded && !this.state.isAuthenticated) ? (<Navigate to="/home"/>) : null }
            </>
        )
    }

}