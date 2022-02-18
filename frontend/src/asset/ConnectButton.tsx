import { Avatar, Box, Button } from "@mui/material";
import logo from './images/42.gif';
import React, {useEffect, useState} from "react";


export default function ConnectButton() {
    return (
        <Box mt={20} >
            <img
                src={logo}
                onClick={() => window.open(process.env.REACT_APP_URL_AUTH)} />
        </Box>
    );
}