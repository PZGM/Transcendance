import { Box, Stack, Avatar } from "@mui/material";
// import './../style/dac.css'
import '../../style/buttons.css'
import '../../style/colors.css'
import '../../style/colors.css'

// TODO il faudra faire la meme chose mais faire un delete dans le channel plus tot qu'en amis

function ChanEditUser(props) {

    return (
        <Box width="18.4vw" className={"chan_element bor_" + props.user.color} ml="5px" mr="2px" mb="10px">
            <Stack  direction="row" justifyContent="center" alignItems="center" spacing={2}>
                {/* TODO mettre les liens avec les props des bon user */}
                <Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1}>
                    {/* <Avatar variant='circular' alt="" src={props.user.avatar}/> */}
                    <Avatar variant='circular' alt="Semy Sharp" src=""/>
                    {/* <div style={{color: 'white' }} className='bit9x9'> {props.user.name} </div> */}
                    <div style={{color: 'white' }} className='bit9x9'> WWWWWWWWWW </div>
                </Stack>
                <Stack direction='row' justifyContent="flex-end"  alignItems="flex-end" spacing={1}>
                    <div className="renderrow_button">
                    </div>
                    <div className="renderrow_button but_green">
                        <div className='bit5x5' > {props.first_button} </div>
                    </div>
                    <div className="renderrow_button but_red">
                        <div className='bit5x5'> {props.second_button} </div>
                    </div>
                    {/* <Link className="renderrow_button but_red" style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_MP + "Braimbailt"}}>
                        <div className='bit5x5'> {props.second_button} </div>
                    </Link> */}
                    {/* <ButtonBase className="button" style={{backgroundColor: "red"}}>
                        <div className='bit5x5'> {props.second_button} </div>
                    </ButtonBase> */}
                    {/* <ButtonBase className="button" style={{backgroundColor: "red"}} onClick={() => {props.remove(props.user.id)}}> */}
                    {/* </ButtonBase> */}
                </Stack>
            </Stack>
        </Box>
    );
}

export default ChanEditUser;
