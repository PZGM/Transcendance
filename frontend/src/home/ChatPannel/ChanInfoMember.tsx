import { Stack, Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../style/buttons.css'
import '../../style/colors.css'
import '../../style/display.css'
import { UserDto } from "../../api/dto/user.dto";
import { UserAPI } from "../../api/Users.api";
import { statusEnum } from "./Chat";

enum color {
    'white',
    'red',
    'yellow',
    'green',
    'blue',
    'cyan',
    'violet'
}

interface ChanInfoUserProps {
    member: UserDto,
    index: number,
    grade: string,
    isFriend: boolean,
    isMe: boolean,
}

interface StatusData {
    status: number;
}

function ChanInfoMember(props: ChanInfoUserProps) {
    let eventSource;
	let navigate = useNavigate();

    useEffect(() => {
        //component will mount
        eventSource = new EventSource((process.env.REACT_APP_UPDATE_STATUS as string) + props.member.id, {withCredentials: true});
        eventSource.onmessage = (e: { data: string; }) => {
            let jsonObj: any = JSON.parse(e.data);
            let status: StatusData = jsonObj as StatusData;
            if (status.status < 0 || status.status > 6)
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
    const [status, setStatus] = useState(props.member.status);
    const [openInvite, setOpenInvite] = React.useState(false);

    const handleCancelInvite= () =>
    {
        setOpenInvite(false);
    }

    const watchGame = async () => {
        if (props.member.status === statusEnum.playing) {
            UserAPI.watchUser(props.member.id)
        }
    }

    const toggleFriendship = async () => {
        if (isFriend)
            await UserAPI.removeFriend(props.member.id)
        else
            await UserAPI.addFriend(props.member.id);
        setFriendship(!isFriend);
    }
    return (
        <div className={"chan_element bor_"+ props.member.color}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={"0.07vw"}>
                {props.isMe &&
                    <>
                        <Stack direction='row' justifyContent="flex-start"  alignItems="center" spacing={1}>
                            <Avatar variant='circular' alt={props.member.login} src={props.member.avatar} sx={{height: '1.6vw', width: '1.6vw'}}/>
                            <Stack direction='column' justifyContent="space-between"  alignItems="center" spacing={1}>
                                <div style={{color: 'white' }} className='bit9x9'>{props.member.login}</div>
                                {props.grade && <div style={{color: (props.grade === 'owner') ? 'orange' : 'yellow' }} className='bit9x9'>{props.grade}</div>}
                            </Stack>
                        </Stack>
                        
                        <div style={{height: '2.4vw', display: 'flex', alignItems: 'center', fontSize: '1.5vw', width: '20%'}}>
                            <div className="bit9x9 white">YOU</div>
                        </div>
                    </>
                }
                {!props.isMe &&
                    <>
                        <Stack direction='row' justifyContent="flex-start"  alignItems="center" spacing={1} style={{cursor: 'pointer'}} onClick={() => (navigate(process.env.REACT_APP_USER +props.member.login + "/info"))}>
                            <Avatar variant='circular' alt={props.member.login} src={props.member.avatar} sx={{height: '1.6vw', width: '1.6vw'}}/>
                            <Stack direction='column' justifyContent="space-between"  alignItems="center" spacing={1}>
                                <div style={{color: 'white' }} className='bit9x9'>{props.member.login}</div>
                                {props.grade && <div style={{color: (props.grade === 'owner') ? 'orange' : 'yellow' }} className='bit9x9'>{props.grade}</div>}
                            </Stack>
                        </Stack>

                        <Stack direction='row' justifyContent="flex-end"  alignItems="flex-end" spacing={1}>
                            <div className={`renderrow_button but_${color[status]}`} onClick={watchGame}>
                                <div className='bit5x5'> {statusEnum[status]}  </div>
                            </div>
                            <Link className="renderrow_button but_blue" style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_MP + props.member.login}}>
                                <div className='bit5x5'> SEND MESSAGE </div>
                            </Link>
                            <div className={"renderrow_button but_" + ((isFriend) ? "red" : "green")} onClick={toggleFriendship}>
                                <div className='bit5x5'> {(isFriend) ? "remove friend" : "Add friend"} </div>
                            </div>
                        </Stack>
                    </>
                }
            </Stack>

        </div>
    );
}

export default ChanInfoMember;