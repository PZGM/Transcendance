import { Avatar, ButtonBase, Stack } from "@mui/material";
import { Link } from "react-router-dom";


function MyInfos(props) {


	return (
		<ButtonBase component={Link} to={process.env.REACT_APP_PROFILE as string} style={{marginTop: '0.2vw', marginBottom: '0.7vw'}}>
			<Stack direction="row" justifyContent='center' spacing={1} style={{width: '90%'}}>
				<Avatar variant='circular' alt="Semy Sharp" src={props.avatar} sx={{margin: "0.3vw", height: '2.5vw', width: '2.5vw'}}/>
				<div className='backto1982' style={{color: props.color, fontSize: "1.5vw", display: 'flex', alignItems: 'center'}}> {props.login} </div>
			</Stack>
		</ButtonBase>
	)
}

export default MyInfos;	
