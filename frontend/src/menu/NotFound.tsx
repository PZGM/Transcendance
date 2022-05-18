import { Box, Typography, ButtonBase, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { Component } from "react";
import { Helmet } from "react-helmet";
import '../style/basics.css'
import './../asset/fonts/fonts.css'


interface NotFoundProps {
};

export class NotFound extends Component<NotFoundProps> {
	render (){
		return(
            <div>
				<Helmet>
					<style>{'body { background-color: black; }'}</style>
				</Helmet>
                <Box className='max'>
                    <Box height='60vh' width='50vw' p="10px" bgcolor="lightsteelblue" sx={{border: '3px solid grey' }}>
                    <Stack direction='column' alignItems='center' height='100%' minWidth='undefined' className='stack' >
                            <img src={require('../asset/images/richard.png')} className='fit' alt="Richard"/>
                            <Typography color='white'>
                                    <div className='title'>Fait attention a l'URL</div>
                                    <div className='title'>Tu risques de te faire pincer tres fort</div>
                            </Typography>
                            <ButtonBase component={Link} to={{pathname: process.env.REACT_APP_HOME}} centerRipple style={{minWidth: '140px', minHeight: '50px', borderRadius: 0, backgroundColor:'red'}} >
                                    <Typography color='white'>
                                        <div className='bit5x5'>Go Home</div>
                                    </Typography>
						    </ButtonBase>
                        </Stack>
                    </Box>
                </Box>

            </div>
        );
    };
}