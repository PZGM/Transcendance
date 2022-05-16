import { Box, Stack, Avatar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import '../../../style/buttons.css'
import '../../../style/colors.css'
import '../../../style/colors.css'

// TODO il faudra faire la meme chose mais faire un delete dans le channel plus tot qu'en amis

function RenderRows(props) {
    const [ami, setAmi] = React.useState(false);
    return (
        <Box width="18.4vw" className={"chan_element bor_"+ props.user.color} ml="0.26vw" mr="0.1vw" mb="1vh">
            <Stack  direction="row" justifyContent="center" alignItems="center" spacing={2}>
                {/* TODO mettre les liens avec les props des bon user */}
                <Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1}>
                    {/* <Avatar variant='circular' alt="" src={props.user.avatar}/> */}
                    <Avatar variant='circular' alt="Semy Sharp" src=""/>
                    {/* <div style={{color: 'white' }} className='bit9x9'> {props.user.name} </div> */}
                    <div style={{color: 'white' }} className='bit9x9'> WWWWWWWWWW </div>
                </Stack>
                <Stack direction='row' justifyContent="flex-end"  alignItems="flex-end" spacing={1}>
                    <div className="renderrow_button but_blue">
                        <div className='bit5x5' > WATCH MATCH </div>
                    </div>
                    {/* TODO remplacer le braimbalt ici */}
                    <Link className="renderrow_button but_white" style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_MP + "Braimbault"}}>
                        <div className='bit5x5'> SEND MESSAGE </div>
                    </Link>
{/* TODO faire une ternaire pour savoir si c'est un amis ou pas */}
                    <div className={"renderrow_button but_" + ((ami === false) ? "red" : "yellow")}>
                        <div className='bit5x5' onClick={() => {
                            if (ami === false)
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
