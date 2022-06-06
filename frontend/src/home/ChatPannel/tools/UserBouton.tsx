import { Stack } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import '../../../style/buttons.css'
import '../../../style/colors.css';
import "../../../style/input.css"
import { UserAPI } from "../../../api/Users.api";
import { UserDto } from "../../../api/dto/user.dto"



interface UserProps {
	status: number;
	friend: boolean;
	login: any;
	blocked: boolean;
	user: UserDto;
}


function UserBouton(props: UserProps) {
	const [block, setBlock] = React.useState(props.blocked);
	const [friend, setFriend] = React.useState(props.friend);

	const toggleBlock = async() => {
        if (block)
            await UserAPI.unblockUser(props.user.id)
        else
            await UserAPI.blockUser(props.user.id);
		setBlock(!block)
    }

	const changefriend = async () =>
	{
		if (friend === false)
		{				
			await UserAPI.addFriend(props.user.id);
			setFriend(!friend);
		}
		else
		{
			await UserAPI.removeFriend(props.user.id);
			setFriend(!friend);
		}
	}


	return(
		<Stack direction='row' justifyContent="flex-end" alignItems="flex-end" spacing={1} sx={{fontSize: "0.6vw"}}>
			{
				(props.status === 3) && <div className={"home_button but_green"}> <div className='bit5x5'> Invite </div> </div>
			}
			{
				(props.status === 4) && <div className={"home_button but_blue"}> <div className='bit5x5'> spectate </div> </div>
			}
			<Link className="home_button but_white" style={{textDecoration: 'none',color: 'white' }} to={{pathname: process.env.REACT_APP_MP + props.login}}>
				<div className='bit5x5'> Send Message </div>
			</Link>
			<div className={"home_button but_" + ((friend) ? "red" : "yellow")}  onClick={() => {changefriend}}>
				{(friend) ? <div className='bit5x5'> Remove Friend </div> : <div className='bit5x5'> add Friend </div>}
			</div>
			<div className={"home_button but_" + ((block) ? "red" : "yellow")}  onClick={() => {toggleBlock}}>
				{(block) ? <div className='bit5x5'> Unblock user </div> : <div className='bit5x5'> Block user </div>}
			</div>
		</Stack>
	)
}


export default UserBouton;