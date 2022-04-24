import { Box, Button, ButtonBase, Grid, IconButton, Input, InputBase, List, Stack, TextField, Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
// import './../style/dac.css'
import '../../../style/buttons.css'




let width_button = "90px"




function RenderRows(props) {
    return (
        <Box width="472px" className="bdac" sx={{color:'test'}} ml="5px" mr="2px">
            <Stack  direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <ButtonBase onClick={ () => {}}> 
                    <Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1}>
                        <Avatar variant='circular' alt="" src=""/>
                        <div className='bit9x9'> Braimbault </div>
                    </Stack>
                </ButtonBase>
                <Stack direction='row' justifyContent="flex-end"  alignItems="flex-end" spacing={1}>
                    <ButtonBase className="button" style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
                        <div className='bit5x5'> {props.first_button} </div>
                    </ButtonBase>
                    <Link style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_MP + "Braimbailt"}}>
                        <div className='bit5x5'> {props.second_button} </div>
                    </Link>

                    {/* <ButtonBase className="button" style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
                        <div className='bit5x5'> {props.second_button} </div>
                    </ButtonBase> */}
                    <ButtonBase className="button" style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
                        <div className='bit5x5'> {props.third_button} </div>
                    </ButtonBase>
                </Stack>
            </Stack>
        </Box>
    );
}

export default RenderRows;