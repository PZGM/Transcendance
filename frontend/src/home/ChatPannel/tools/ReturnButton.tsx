import { Box, Button, ButtonBase, Grid, IconButton, Input, InputBase, List, Stack, TextField, Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { UserAPI } from "../../../api/Users.api";
// import './../style/dac.css'
import '../../../style/buttons.css'
import '../../../style/colors.css'
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



let width_button = "90px"

// TODO il faudra faire la meme chose mais faire un delete dans le channel plus tot qu'en amis

function ReturnButton(props) {
    const navigate = useNavigate();
    return (
        <>
        <button 	style={{ textDecoration: 'none', color: 'white' }} onClick={() =>{navigate(-1)}}>
            <ArrowBackIcon/>
        </button>
        </>

    );
}

export default ReturnButton;
