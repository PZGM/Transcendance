import * as React from 'react';
import { ButtonBase, Dialog, DialogContent, Stack } from "@mui/material";
import '../../../style/buttons.css'
import '../../../style/colors.css';
import "../../../style/input.css"
import 'react-toastify/dist/ReactToastify.css';
import { UserDto } from '../../../api/dto/user.dto';
import { ChatAPI } from '../../../api/Chat.api';
// TODO Faire une jolie pop up avec un msg d'erreur si le nom du chan est deja use ou si un mdp n'a pas ete donne pour un chan 

interface MuteBanProps {
    member: UserDto;
    channelId: number;
}

function MuteBan(props: MuteBanProps) {
    const [openMute, setOpenMute] = React.useState(false);
    const [openBan, setOpenBan] = React.useState(false);
    const [time, setTime] = React.useState(0);
    

    const handleCancelMute= () =>
    {
        setTime(0);
        setOpenMute(false);
    }
    const handleCancelBan= () =>
    {
        setTime(0);
        setOpenBan(false);
    }

    const handleMute= () =>
    {
        setOpenMute(false);
        ChatAPI.mute(props.member.id, props.channelId)
    }

    const handleBan= () =>
    {
        setOpenBan(false);
    }

    const PlusMinStyle = {
        color: 'white',
        alignItems: 'center',
        display: "flex",
        justifyContent: 'center',
        fontFamily: 'backto1982',
        fontSize: 'calc(30px + 1vw)',
        width: '100%',
        cursor: 'pointer'
    };
    return (
        <>
            <div className={"renderrow_button but_red"} onClick={()=> {setOpenMute(true)}}>
                <div className='bit5x5'> Mute </div>
            </div>
            <div className={"renderrow_button but_red"} onClick={()=> {setOpenBan(true)}}>
                <div className='bit5x5'> BAN </div>
            </div>
            <Dialog open={openMute} onClose={handleCancelMute} >
                <DialogContent sx={{backgroundColor: "black",border: 5, borderColor: "#8e00ae"}}>
                    <Stack spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{fontSize: "0.7vw"}}>
                        <div className='bit5x5' style={{color: "white"}}> For how long ? </div>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
							<div style={PlusMinStyle} onClick={() => {if (time - 1 >= 0) setTime(time-1)}}>
                                -
                            </div>
                            <div className='bit5x5' style={{color:"white", fontSize: 'calc(30px + 1vw)'}}>{time}</div>
							<div style={PlusMinStyle} onClick={() => {setTime(time+1)}}>
                                +
                            </div>
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center"sx={{fontSize: "0.7vw"}}>
                            <div className="home_button but_red" onClick={handleCancelMute}>
                                <div className='bit5x5' > Cancel </div>
                            </div>
                            <div onClick={handleMute} className="home_button but_red">
                                <div className='bit5x5'> Mute </div>
                            </div>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>

            <Dialog open={openBan} onClose={handleCancelBan}>
                <DialogContent sx={{backgroundColor: "black",border: 5, borderColor: "#8e00ae"}}>
                    <Stack spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{fontSize: "0.7vw"}}>
                        <div className='bit5x5' style={{color: "white"}}> For how long ? </div>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
							<div style={PlusMinStyle} onClick={() => {if (time - 1 >= 0) setTime(time-1)}}>
                                -
                            </div>
                            <div className='bit5x5' style={{color:"white", fontSize: 'calc(30px + 1vw)'}}>{time}</div>
							<div style={PlusMinStyle} onClick={() => {setTime(time+1)}}>
                                +
                            </div>
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{fontSize: "0.7vw"}}>
                            <div className="home_button but_red" onClick={handleCancelBan}>
                                <div className='bit5x5' > Cancel </div>
                            </div>
                            <div onClick={handleBan} className="home_button but_red">
                                <div className='bit5x5'> Ban </div>
                            </div>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default MuteBan;