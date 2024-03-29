import { Stack, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import '../../style/buttons.css'
import '../../style/colors.css'
import '../../style/colors.css'
import { UserDto } from "../../api/dto/user.dto";
import { ChatAPI } from "../../api/Chat.api";
import { toast } from "react-toastify";
import { ChannelDto } from "../../api/dto/channel.dto";
import { useNavigate } from 'react-router-dom';
import Mute from "./tools/Mute";
import Ban from "./tools/Ban";


interface ChanEditMemberProps {
    user: UserDto,
    index: number,
    member : UserDto,
    channel: ChannelDto,
    updateMembers: any,
}

interface StatusData {
    status: number;
}

function ChanEditMember(props: ChanEditMemberProps) {
    let eventSource;
    let navigate = useNavigate();

    const [status, setStatus] = useState(props.member.status);

    const userIsMember: boolean = props.user.id === props.member.id;
    const userIsOwner: boolean = props.channel.owner.id === props.user.id;
    const [memberIsAdmin, setMemberIsAdmin] = useState(props.channel.admin.some((admin) => {return admin.id === props.member.id}));
    const memberIsOwner: boolean = props.channel.owner.id === props.member.id;

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


    const toggleAdmin = async () => {
        let ret;
        if (memberIsAdmin)
            ret = await ChatAPI.demoteAdmin(props.channel.id, props.member.id)
        else
            ret = await ChatAPI.promoteAdmin(props.channel.id, props.member.id)
        if (!ret)
            toast.error(ret, {
                position: toast.POSITION.BOTTOM_CENTER,
                pauseOnHover: false,
                closeOnClick: true,})
        else
            setMemberIsAdmin(!memberIsAdmin);
    }

    return (
        <li className={"chan_element bor_"+ props.member.color}>
            
            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={"0.07vw"}>
                
                <Stack direction='row' justifyContent="flex-start"  alignItems="center" spacing={1} onClick={() => (navigate(process.env.REACT_APP_USER +props.member.login + "/info"))}>
                    <Avatar variant='circular' alt={props.member.login} src={props.member.avatar} sx={{height: '1.6vw', width: '1.6vw'}}/>
                    <Stack direction='column' justifyContent="space-between"  alignItems="left" spacing={1}>
                        <div style={{color: 'white' }} className='bit9x9'>{props.member.login}</div>
                        {memberIsAdmin &&
                            <div style={{color: memberIsOwner ? 'orange' : 'yellow' }}
                                className='bit9x9'
                            >
                                {memberIsOwner ? 'Owner' : 'Admin'}
                            </div>}
                    </Stack>
                </Stack>
            
            {(!userIsMember && (userIsOwner || !memberIsAdmin)) &&
                <Stack direction='row' justifyContent="flex-end"  alignItems="flex-end" spacing={1}>
                    
                    {userIsOwner && !memberIsOwner && 
                        <div className={`renderrow_button but_${(memberIsAdmin ? 'red' : 'blue')}`} onClick={toggleAdmin}>
                            <div className='bit5x5'> {(memberIsAdmin) ? "demote admin" : "promote admin"} </div>
                        </div>
                    }
                    
                    {!memberIsAdmin && <Mute member={props.member} channelId={props.channel.id}/>}
                    
                    {!memberIsAdmin && <Ban member={props.member} channelId={props.channel.id} updateMembers={props.updateMembers}/>}
                </Stack>}
            </Stack>
        </li>
    );
}

export default ChanEditMember;