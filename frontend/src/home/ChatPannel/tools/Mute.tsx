import * as React from 'react';
import { ButtonBase, Dialog, DialogContent, Stack } from "@mui/material";
import '../../../style/buttons.css'
import '../../../style/colors.css';
import "../../../style/input.css"
import 'react-toastify/dist/ReactToastify.css';
import { UserDto } from '../../../api/dto/user.dto';
import { ChatAPI } from '../../../api/Chat.api';
import { useEffect, useRef } from 'react';
// TODO Faire une jolie pop up avec un msg d'erreur si le nom du chan est deja use ou si un mdp n'a pas ete donne pour un chan 

const useInterval = (callback: Function, delay?: number | null) => {
    const savedCallback = useRef<Function>(() => {});
  
    useEffect(() => {
      savedCallback.current = callback;
    });
  
    useEffect(() => {
      if (delay !== null) {
        const interval = setInterval(() => savedCallback.current(), delay || 0);
        return () => clearInterval(interval);
      }
  
      return undefined;
    }, [delay]);
  };

interface MuteProps {
    member: UserDto;
    channelId: number;
}

function msToTime(ms) {
    let hours: number = Math.floor(ms / (1000 * 60 * 60));
    ms -= hours * 1000 * 60 * 60;
    let minutes: number = Math.floor(ms / (1000 * 60));
    ms -= minutes * 1000 * 60;
    let seconds: number = Math.floor(ms / 1000);
    let txt: string = '';
    if (hours)
        txt += hours + ':';
    if (minutes)
        txt += minutes + ':';
    txt += seconds;
    return txt;
  }

function Mute(props: MuteProps) {
    const [openMute, setOpenMute] = React.useState(false);
    const [time, setTime] = React.useState(1);
    const [muteTime, setMuteTime] = React.useState(-1);

    const getMuteTime = async () => {
        const t = await ChatAPI.muteRemaining(props.member.id, props.channelId);
        setMuteTime(t);
    }

    const handleCancelMute = () =>
    {
        setTime(1);
        setOpenMute(false);
    }

    const handleMute = async () =>
    {

        setTime(1);
        setOpenMute(false);
        await ChatAPI.mute(props.member.id, props.channelId, time);
        getMuteTime();
    }

    const handleClick = async () => {
        if (muteTime == -1 )
            setOpenMute(true);
        else
            await ChatAPI.unmute(props.member.id, props.channelId);
            setMuteTime(-1);
            getMuteTime();
    }

    useInterval(() => {
        if (muteTime > 0)
            setMuteTime(muteTime -1000);
        else
            setMuteTime(-1);
      }, 1000);

    useEffect(() => {
        getMuteTime();
    }, []);

    const isMuted: boolean = muteTime > 0;

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
            <div className={`renderrow_button but_${(isMuted ? 'yellow' : 'red')}`} onClick={handleClick}>
                <div className='bit5x5'>{isMuted ? `unmute ${msToTime(muteTime)} ` : 'mute'}</div>
            </div>
            <Dialog open={openMute} onClose={handleCancelMute} >
                <DialogContent sx={{backgroundColor: "black",border: 5, borderColor: "#8e00ae"}}>
                    <Stack spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{fontSize: "0.7vw"}}>
                        <div className='bit5x5' style={{color: "white"}}> Chose mute duration </div>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
							<div style={PlusMinStyle} onClick={() => {if (time - 1 >= 0) setTime(time-1)}}>
                                -
                            </div>
                            <div className='bit5x5' style={{color:"white", fontSize: 'calc(30px + 1vw)'}}>{`${time}H`}</div>
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
        </>
    );
}

export default Mute;