import { Box, Button, ButtonBase, Grid, IconButton, Input, InputBase, List, Stack, TextField, Typography, Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { UserAPI } from "../../../api/Users.api";
// import './../style/dac.css'
import '../../../style/buttons.css'
import '../../../style/colors.css'

let width_button = "90px"

// TODO il faudra faire la meme chose mais faire un delete dans le channel plus tot qu'en amis
function changefriend(ami)
{
    {/* TODO faire une ternaire pour savoir si c'est un ami ou pas et donc l'ajouter ou le remove */}

    console.log("je suis dedans")
    if (ami == false)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function RenderRows(props) {
    const [ami, setAmi] = React.useState(false);

    return (
        <Box width="472px" className={"user but_" + props.getColor(props.index % 5)} sx={{color:'test'}} ml="5px" mr="2px" mb="10px">
            <Stack  direction="row" justifyContent="center" alignItems="center" spacing={2}>
                {/* <ButtonBase onClick={ () => {}}>  */}
                {/* TODO mettre les liens avec les props des bon user */}
                    <Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1}>
                        {/* <Avatar variant='circular' alt="" src={props.user.avatar}/> */}
                        <Avatar variant='circular' alt="Semy Sharp" src=""/>
                        {/* <div style={{color: 'white' }} className='bit9x9'> {props.user.name} </div> */}
                        <div style={{color: 'white' }} className='bit9x9'> WWWWWWWWWW </div>
                    </Stack>
                {/* </ButtonBase> */}
                <Stack direction='row' justifyContent="flex-end"  alignItems="flex-end" spacing={1}>
                    <div className="renderrow_button but_red">
                        <div className='bit5x5' > WATCH MATCH </div>
                    </div>
                    <Link className="renderrow_button but_red" style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_MP + "Braimbailt"}}>
                        <div className='bit5x5'> SEND MESSAGE </div>
                    </Link>
                    {/* <ButtonBase className="button" style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
                        <div className='bit5x5'> {props.second_button} </div>
                    </ButtonBase> */}
                    {/* <ButtonBase className="button" style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}} onClick={() => {props.remove(props.user.id)}}> */}
{/* TODO faire une ternaire pour savoir si c'est un amis ou pas */}
                    <div className="renderrow_button but_red">
                        <div className='bit5x5' onClick={() => {
                            if (ami == false)
                                setAmi(true);
                            else
                                setAmi(false);
                            }}> {(ami) ? "add friend" : "remove friend"} </div>
                    </div>
                    {/* </ButtonBase> */}
                </Stack>
            </Stack>
        </Box>
    );
}

export default RenderRows;
