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

interface UnbanProps {
    member: UserDto;
    channelId: number;
    updateChannels: any;
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
        txt += (minutes < 10 ) ? '0' : '' + minutes + ':';
    txt += (seconds < 10 ) ? '0' : '' + seconds + ':';
    return txt;
  }

function Unban(props: UnbanProps) {
    const [openUnban, setOpenUnban] = React.useState(false);
    const [banTime, setBanTime] = React.useState(-1);

    const getBanTime = async () => {
        const t = await ChatAPI.banRemaining(props.member.id, props.channelId);
        setBanTime(t);
    }

    const handleCancelUnban = () =>
    {
        setOpenUnban(false);
    }

    const handleUnban = async () =>
    {
        setOpenUnban(false);
        await ChatAPI.unban(props.member.id, props.channelId);
        getBanTime();
        props.updateChannels();
    }

    const handleClick = async () => {
        setOpenUnban(true);
    }

    useInterval(() => {
        if (banTime > 0)
            setBanTime(banTime -1000);
        else
            setBanTime(-1);
      }, 1000);

    useEffect(() => {
        getBanTime();
    }, []);

    const isUnband: boolean = banTime > 0;

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
            <div className={`renderrow_button but_${(isUnband ? 'yellow' : 'red')}`} onClick={handleClick}>
                <div className='bit5x5'>{isUnband ? `ununban ${msToTime(banTime)} ` : 'unban'}</div>
            </div>
            <Dialog open={openUnban} onClose={handleCancelUnban} >
                <DialogContent sx={{backgroundColor: "black",border: 5, borderColor: "#8e00ae"}}>
                    <Stack spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{fontSize: "0.7vw"}}>
                        <div className='bit5x5' style={{color: "white"}}>{`Unban ${props.member.login} ? `}</div>
                    
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center"sx={{fontSize: "0.7vw"}}>
                            <div className="home_button but_red" onClick={handleCancelUnban}>
                                <div className='bit5x5' > Cancel </div>
                            </div>
                            <div onClick={handleUnban} className="home_button but_red">
                                <div className='bit5x5'> Unban </div>
                            </div>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Unban;