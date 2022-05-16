import * as React from 'react';
import { DialogContent, Stack } from "@mui/material";
import '../../../style/buttons.css'
import { ChatAPI } from '../../../api/Chat.api';
import "../../../style/input.css"
import 'react-toastify/dist/ReactToastify.css';
import { WhatsappOutlined } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { UserAPI } from '../../../api/Users.api';
import { Navigate } from 'react-router-dom';

interface JoinChannelProps{
    setOpen: any,
}

function JoinChannel(props: JoinChannelProps) {
    const [name, setName] = React.useState("");
    const [visibility, setVisibility] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [redirect, setRedirect] = React.useState('');

    const cancel = () => {
        props.setOpen(false);
    }

    const find = async () => {
        const me = await UserAPI.getUser();
        const channel = await ChatAPI.getChannelByName(name);
        if (me === null)
            return;
        if (!channel) {
            toast.error("This channel doesn't exist", {
                position: toast.POSITION.BOTTOM_CENTER
            })
            return;
        }
        if (channel.users.some((user) => {
            return user.id === me.id;
        })) {
            toast.error("You're already in this channel", {
                position: toast.POSITION.BOTTOM_CENTER
            })
            return;
        }
        setVisibility(channel.visibility)
    }

    const returnButton = async () => {
        setVisibility('');
        setName('');
    }

    const join = async () => {
        if (visibility === "protected" && password === "") {
            toast.error("No password for the channel", {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        else{
            const channel = await ChatAPI.getChannelByName(name);
            let join;
            if (visibility == 'public') {
                join = await ChatAPI.joinChannel(channel.id);
            }
            else {
                join = await ChatAPI.joinChannel(channel.id, password);
            }
            console.log(`JOIN ${join}`)
            if (join) {
                setName("");
                setVisibility("")
                setPassword("")    
                props.setOpen(false);
                setRedirect(`/home/chat/${name}`);
            }
            else {
                toast.error("Can't join the channel", {
                    position: toast.POSITION.BOTTOM_CENTER
                })
            }

        }
    }

    if (visibility === '')
    return(
        <DialogContent sx={{backgroundColor: "black",border: 5, borderColor: "#8e00ae"}}>
            <Stack spacing={2} direction="column" >
                    <Stack justifyContent="center" alignItems="center" spacing={2}>
                        <input className="friends_search_bar" maxLength={10} placeholder="Channel Name" onChange={ async (e) => {if (e.target.value.length < 11){setName(e.target.value)}}}/>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                        <div className="home_button but_red" onClick={cancel}>
                            <div className='bit5x5' > Cancel </div>
                        </div>
                        <div onClick={find} className="home_button but_red" style={{textDecoration: 'none',color: 'white' }}>
                            <div className='bit5x5'> Find </div>
                        </div>
                    </Stack>
            </Stack>
        </DialogContent>
    )
    return (
        <>
            { redirect ? (<Navigate to={redirect} />) : null }
            <DialogContent sx={{backgroundColor: "black",border: 5, borderColor: "#8e00ae"}}>
                <Stack spacing={2} direction="column" >
                <div className='bit5x5' style={{color: 'white', fontSize: '2vw', display: 'flex', alignItems:'center', justifyContent:'center'}}>{name}</div>
                <div className='bit5x5' style={{color: 'grey', fontSize: '1vw', display: 'flex', alignItems:'center', justifyContent:'center'}}>{visibility}</div>
                {(visibility === "protected") && <input className="friends_search_bar"  placeholder="password" onChange={ async (e) => {setPassword(e.target.value)}}/>}
                    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                        <div onClick={returnButton} className="home_button but_red" >
                            <div className='bit5x5' > Return </div>
                        </div>
                        { (visibility !== 'private') &&
                        <div className="home_button but_red" style={{textDecoration: 'none',color: 'white' }}>
                            <div onClick={join} className='bit5x5'> join </div>
                        </div>
                        }
                    </Stack>
                </Stack>
            </DialogContent>
        </>
    )

}


export default JoinChannel;


{/* <DialogContent sx={{backgroundColor: "black"}}>
<Stack spacing={2} direction="column" >
    <Stack justifyContent="center" alignItems="center" spacing={2}>
        <input className="friends_search_bar" maxLength={10} placeholder="Channel Name" onChange={ async (e) => {if (e.target.value.length < 11){setName(e.target.value)}}}/>
    </Stack>
    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
        <div className={"home_button but_" + ((visibility === "public")? "yellow": "red")} style={{width: "90px", height: '50px', borderRadius: 0, backgroundColor: (visibility === "public")? "yellow": "red"}} onClick={() => {setVisibility("public")}}>
            <div className='bit5x5'> Public </div>
        </div>
        <div className={"home_button but_" + ((visibility === "protected")? "yellow": "red")} style={{width: "90px", height: '50px', borderRadius: 0, backgroundColor: (visibility === "protected")? "yellow": "red"}} onClick={() => {setVisibility("protected")}}>
            <div className='bit5x5'> Protected </div>
        </div>
    </Stack>
    <Stack justifyContent="center" alignItems="center">
        {(visibility === "public")? <></>:<input className="friends_search_bar"  placeholder="password" onChange={ async (e) => {setPassword(e.target.value)}}/>}
    </Stack>
    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
        <div className="home_button but_red" onClick={handleCancelJoin}>
            <div className='bit5x5' > Cancel </div>
        </div>
        <div onClick={handleJoin} className="home_button but_red" style={{textDecoration: 'none',color: 'white' }}>
            <div className='bit5x5'> join </div>
        </div>
    </Stack>
</Stack>
</DialogContent> */}