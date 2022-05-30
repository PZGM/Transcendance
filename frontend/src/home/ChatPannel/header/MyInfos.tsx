import { Avatar, ButtonBase } from "@mui/material";
import { Link } from "react-router-dom";


function MyInfos(props) {


	return (
		<ButtonBase component={Link} to={process.env.REACT_APP_PROFILE as string} sx={{height: "3.8vh"}}>
			<Avatar variant='circular' alt="Semy Sharp" src={props.avatar} sx={{margin: "0.07vh",height: '1.6vw', width: '1.6vw'}}/>
			<div className='backto1982' style={{color: props.color, fontSize: "1vw"}}> {props.login} </div>
		</ButtonBase>
	)
}

export default MyInfos;
