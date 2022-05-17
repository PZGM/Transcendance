import { Box, Stack, Avatar } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../style/buttons.css'
import '../../style/colors.css'
import '../../style/colors.css'
import { UserDto } from "../../api/dto/user.dto";
import { UserAPI } from "../../api/Users.api";

// TODO il faudra faire la meme chose mais faire un delete dans le channel plus tot qu'en amis

interface ChanInfoUserProps {
    user: UserDto,
    index: number,
    grade: string,
    isFriend: boolean,
}

function ChanInfoUser(props: ChanInfoUserProps) {
    const [isFriend, setFriendship] = useState(props.isFriend);

    const toggleFriendship = async () => {
        console.log(`toggle friends : now you are friend : ${isFriend}`);
        if (isFriend)
            await UserAPI.removeFriend(props.user.id)
        else
            await UserAPI.addFriend(props.user.id);
        console.log('toggled !')
        setFriendship(!isFriend);
    }

    return (
        <Box width="18.4vw" className={"chan_element bor_"+ props.user.color} ml="0.26vw" mr="0.1vw" mb="1vh">
            <Stack  direction="row" justifyContent="center" alignItems="center" spacing={2}>
                <Stack direction='row' justifyContent="space-between"  alignItems="center" spacing={1}>
                    <Avatar variant='circular' alt={props.user.login} src={props.user.avatar}/>
                    <Stack direction='column' justifyContent="space-between"  alignItems="center" spacing={1}>
                        <div style={{color: 'white' }} className='bit9x9'>{props.user.login}</div>
                        {props.grade && <div style={{color: (props.grade == 'owner') ? 'orange' : 'yellow' }} className='bit9x9'>{props.grade}</div>}
                    </Stack>
                </Stack>
                <Stack direction='row' justifyContent="flex-end"  alignItems="flex-end" spacing={1}>
                    <div className="renderrow_button but_blue">
                        <div className='bit5x5' > WATCH MATCH </div>
                    </div>
                    <Link className="renderrow_button but_white" style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_MP + props.user.login}}>
                        <div className='bit5x5'> SEND MESSAGE </div>
                    </Link>
                    <div className={"renderrow_button but_" + ((isFriend) ? "red" : "green")}>
                        <div className='bit5x5' onClick={toggleFriendship}> {(isFriend) ? "remove friend" : "add friend"} </div>
                    </div>
                </Stack>
            </Stack>
        </Box>
    );
}

export default ChanInfoUser;
