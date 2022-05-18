import { Box, Stack, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../style/buttons.css'
import '../../style/colors.css'
import '../../style/display.css'
import { UserDto } from "../../api/dto/user.dto";
import { UserAPI } from "../../api/Users.api";

// TODO il faudra faire la meme chose mais faire un delete dans le channel plus tot qu'en amis

enum color {
    'white',
    'red',
    'yellow',
    'green',
    'blue'
}

enum description {
    'unknow',
    'offline',
    'invite idle',
    'invite',
    'watch match'
}

interface ChanInfoUserProps {
    user: UserDto,
    index: number,
    grade: string,
    isFriend: boolean,
    isMe: boolean,
}

interface StatusData {
    status: number;
}

function ChanInfoUser(props: ChanInfoUserProps) {
    let eventSource;

    useEffect(() => {
        //component will mount
        eventSource = new EventSource((process.env.REACT_APP_UPDATE_STATUS as string) + props.user.id, {withCredentials: true});
        eventSource.onmessage = (e: { data: string; }) => {
            let jsonObj: any = JSON.parse(e.data);
            let status: StatusData = jsonObj as StatusData;
            if (status.status < 0 || status.status > 4)
                status.status = 0;
            setStatus(status.status);
        };
        eventSource.onerror = (e: any) => {
            setStatus(0);
        }
            return () => {
                //component will unmount
            if (eventSource)
                eventSource.close();
        }
      }, [])

    const [isFriend, setFriendship] = useState(props.isFriend);
    const [status, setStatus] = useState(props.user.status);

    const toggleFriendship = async () => {
        if (isFriend)
            await UserAPI.removeFriend(props.user.id)
        else
            await UserAPI.addFriend(props.user.id);
        setFriendship(!isFriend);
    }
    return (
        <div className={"chan_element bor_"+ props.user.color}>
        {/* // <Box width="18.4vw" className={"chan_element bor_"+ props.user.color} ml="0.26vw" mr="0.1vw" mb="1vh"> */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                <Stack direction='row' justifyContent="flex-start"  alignItems="center" spacing={1}>
                    <Avatar variant='circular' alt={props.user.login} src={props.user.avatar}/>
                    <Stack direction='column' justifyContent="space-between"  alignItems="center" spacing={1}>
                        <div style={{color: 'white' }} className='bit9x9'>{props.user.login}</div>
                        {props.grade && <div style={{color: (props.grade == 'owner') ? 'orange' : 'yellow' }} className='bit9x9'>{props.grade}</div>}
                    </Stack>
                </Stack>
                {!props.isMe &&
                <Stack direction='row' justifyContent="flex-end"  alignItems="flex-end" spacing={1}>
                    <div className={`renderrow_button but_${color[status]}`}>
                        <div className='bit5x5' > {description[status]} </div>
                    </div>
                    <Link className="renderrow_button but_white" style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_MP + props.user.login}}>
                        <div className='bit5x5'> SEND MESSAGE </div>
                    </Link>
                    <div className={"renderrow_button but_" + ((isFriend) ? "red" : "green")}>
                        <div className='bit5x5' onClick={toggleFriendship}> {(isFriend) ? "remove friend" : "add friend"} </div>
                    </div>
                </Stack>}
            </Stack>
        </div>
    );
}

export default ChanInfoUser;
