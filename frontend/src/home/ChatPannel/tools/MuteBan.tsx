import * as React from 'react';
import { ButtonBase, Dialog, DialogContent, Stack } from "@mui/material";
import '../../../style/buttons.css'
import '../../../style/colors.css';
import "../../../style/input.css"
import 'react-toastify/dist/ReactToastify.css';
// TODO Faire une jolie pop up avec un msg d'erreur si le nom du chan est deja use ou si un mdp n'a pas ete donne pour un chan 

function MuteBan(props) {
    // le temps est en min pour l'instant
    const [openMute, setOpenMute] = React.useState(false);
    const [openBan, setOpenBan] = React.useState(false);
    const [time, setTime] = React.useState(60);
    

    const handleCancelMute= () =>
    {
        setTime(60);
        setOpenMute(false);
    }
    const handleCancelBan= () =>
    {
        setTime(60);
        setOpenBan(false);
    }


    const handleMute= () =>
    {
        setTime(60);
        setOpenMute(false);
    }
    const handleBan= () =>
    {
        setTime(60);
        setOpenBan(false);
    }

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
                    <Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
                        <div className='bit5x5' style={{color: "white"}}> For how long ? </div>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                            <ButtonBase centerRipple className={"home_button but_" + ((time === 60)? "blue": "cyan")} style={{backgroundColor: (time === 60)? "blue": "cyan"}} onClick={() => {setTime(60)}}>
                                { (time === 60) ? <div className='bit5x5'style={{color: "white"}}> 1H </div>:
                                <div className='bit5x5'> 1H </div>}
                            </ButtonBase>
                            <ButtonBase centerRipple className={"home_button but_" + ((time === 480)? "blue": "cyan")} style={{backgroundColor: (time === 480)? "blue": "cyan"}} onClick={() => {setTime(480)}}>
                                { (time === 480) ? <div className='bit5x5'style={{color: "white"}}> 8H </div>:
                                <div className='bit5x5'> 8H </div>}
                            </ButtonBase>
                            <ButtonBase centerRipple className={"home_button but_" + ((time === 42)? "blue": "cyan")} style={{backgroundColor: (time === 42)? "blue": "cyan"}} onClick={() => {setTime(42)}}>
                                { (time === 42) ? <div className='bit5x5'style={{color: "white"}}> for life </div>:
                                <div className='bit5x5'> for life </div>}
                            </ButtonBase>
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
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
                    <Stack spacing={2} direction="column" justifyContent="center" alignItems="center">
                        <div className='bit5x5' style={{color: "white"}}> For how long ? </div>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                            <ButtonBase centerRipple className={"home_button but_" + ((time === 60)? "blue": "cyan")} style={{backgroundColor: (time === 60)? "blue": "cyan"}} onClick={() => {setTime(60)}}>
                                { (time === 60) ? <div className='bit5x5'style={{color: "white"}}> 1H </div>:
                                <div className='bit5x5'> 1H </div>}
                            </ButtonBase>
                            <ButtonBase centerRipple className={"home_button but_" + ((time === 480)? "blue": "cyan")} style={{backgroundColor: (time === 480)? "blue": "cyan"}} onClick={() => {setTime(480)}}>
                                { (time === 480) ? <div className='bit5x5'style={{color: "white"}}> 8H </div>:
                                <div className='bit5x5'> 8H </div>}
                            </ButtonBase>
                            <ButtonBase centerRipple className={"home_button but_" + ((time === 42)? "blue": "cyan")} style={{backgroundColor: (time === 42)? "blue": "cyan"}} onClick={() => {setTime(42)}}>
                                { (time === 42) ? <div className='bit5x5'style={{color: "white"}}> for life </div>:
                                <div className='bit5x5'> for life </div>}
                            </ButtonBase>
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
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


