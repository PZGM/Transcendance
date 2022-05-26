import { Avatar, ButtonBase } from "@mui/material";
import { Link } from "react-router-dom";


function MyInfos(props) {


	return (
		<ButtonBase component={Link} to={process.env.REACT_APP_PROFILE as string} >
			<Avatar variant='circular' alt="Semy Sharp" src={props.avatar} sx={{margin: 1}}/>
			<div className='backto1982' style={{color: props.color}}> {props.login} </div>
		</ButtonBase>
	)
}

export default MyInfos;
