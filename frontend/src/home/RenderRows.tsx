import { Box, Button, ButtonBase, Grid, IconButton, Input, InputBase, List, Stack, TextField, Typography, Avatar } from "@mui/material";
import styles from './../style/dac.module.css'
import buttons from './../style/buttons.module.css'




let width_button = "90px"




function RenderRows(props) {
    return (
        <Box width="472px" className={styles.bdac} sx={{color:'test'}} ml="5px" mr="2px">
            <Stack  direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <ButtonBase onClick={ () => {props.updateDisplay(4, 1, props.numberBack);}}> 
                    <Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1}>
                        <Avatar variant='circular' alt="" src=""/>
                        <Typography variant="button">
                            <div className='bit9x9'> Braimbault </div>
                        </Typography>
                    </Stack>
                </ButtonBase>
                <Stack direction='row' justifyContent="flex-end"  alignItems="flex-end" spacing={1}>
                    <ButtonBase centerRipple className={buttons.button} style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
                        <Typography variant="button" color='white'>
                            <div className='bit5x5'> {props.first_button} </div>
                        </Typography>
                    </ButtonBase>
                    <ButtonBase centerRipple className={buttons.button} style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
                        <Typography variant="button" color='white'>
                            <div className='bit5x5'> {props.second_button} </div>
                        </Typography>
                    </ButtonBase>
                    <ButtonBase centerRipple className={buttons.button} style={{width: width_button, height: '50px', borderRadius: 0, backgroundColor: "red"}}>
                        <Typography variant="button" color='white'>
                            <div className='bit5x5'> {props.third_button} </div>
                        </Typography>
                    </ButtonBase>
                </Stack>
            </Stack>
        </Box>
    );
}

export default RenderRows;