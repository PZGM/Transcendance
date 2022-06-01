import * as React from 'react';
import { ButtonBase, Dialog, DialogContent, Stack } from "@mui/material";
import '../../../style/buttons.css'
import '../../../style/colors.css';
import "../../../style/input.css"
import 'react-toastify/dist/ReactToastify.css';
import { UserDto } from '../../../api/dto/user.dto';
import { ChatAPI } from '../../../api/Chat.api';
import { useEffect, useRef } from 'react';

interface BanProps {
    member: UserDto;
    channelId: number;
    deleteUser: any;
}

function Ban(props: BanProps) {
    const [openBan, setOpenBan] = React.useState(false);
    const [time, setTime] = React.useState(1);

    const handleCancelBan = () =>
    {
        setTime(1);
        setOpenBan(false);
    }

    const handleBan = async () =>
    {
        setTime(1);
        setOpenBan(false);
        const ret = await ChatAPI.ban(props.member.id, props.channelId, time);
        if (ret)
            props.deleteUser();
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
            <div className={`renderrow_button but_red`} onClick={() => {setOpenBan(true)}}>
                <div className='bit5x5'>'ban'</div>
            </div>
            <Dialog open={openBan} onClose={handleCancelBan} >
                <DialogContent sx={{backgroundColor: "black",border: 5, borderColor: "#8e00ae"}}>
                    <Stack spacing={2} direction="column" justifyContent="center" alignItems="center" sx={{fontSize: "0.7vw"}}>
                        <div className='bit5x5' style={{color: "white"}}> Chose ban duration </div>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
							<div style={PlusMinStyle} onClick={() => {if (time - 1 >= 0) setTime(time-1)}}>
                                -
                            </div>
                            <div className='bit5x5' style={{color:"white", fontSize: 'calc(30px + 1vw)'}}>{`${time} DAYS`}</div>
							<div style={PlusMinStyle} onClick={() => {setTime(time+1)}}>
                                +
                            </div>
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center"sx={{fontSize: "0.7vw"}}>
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

export default Ban;