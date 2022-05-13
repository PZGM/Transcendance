import * as React from 'react';
import { Button, ButtonBase, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputBase, Stack, TextField } from "@mui/material";
import '../../../style/buttons.css'
import { UserAPI } from '../../../api/Users.api';
import { ChatAPI } from '../../../api/Chat.api';
import "../../../style/input.css"
import { UserDto } from "../../../api/dto/user.dto"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

interface CreateChannelProps{
}

interface CreateChannelState {
    name: string;
    owner?: any;
    visibility: string;
    password?: any;
}

// TODO Faire une jolie pop up avec un msg d'erreur si le nom du chan est deja use ou si un mdp n'a pas ete donne pour un chan 

function CreateChannel(props: CreateChannelProps, CreateChannelState) {
    const [openCreate, setOpenCreate] = React.useState(false);
    const [openJoin, setOpenJoin] = React.useState(false);
    const [name, setName] = React.useState("");
    const [visibility, setVisibility] = React.useState("public");
    const [password, setPassword] = React.useState("");

    const handleClickOpenCreate = () => {
      setOpenCreate(true);
    };
    const handleClickOpenJoin = () => {
      setOpenJoin(true);
    };
  
    const handleCloseCreate = () => {
        if (visibility == "protected" && password == "") {
            toast.error("No password for the channel", {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        else if(name == "") {
            toast.error("No name for the channel", {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        else{
            Sendchannel();
            setName("");
            setVisibility("public")
            setPassword("")    
            setOpenCreate(false);
        }
    };

    const handleForceCloseCreate = () => {
        setName("");
        setVisibility("public")
        setPassword("")
        setOpenCreate(false);
    };

    const handleCloseJoin = () => {
        // TODO le join du channel
        if (visibility == "protected" && password == "") {
            toast.error("No password for the channel", {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        else if(name == "") {
            toast.error("No name for the channel", {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }
        else{
            JoinChannel();
            setName("");
            setVisibility("public")
            setPassword("")    
            setOpenCreate(false);
        }
    };

    const handleForceCloseJoin = () => {
        setName("");
        setVisibility("public")
        setPassword("")
        setOpenJoin(false);
    };

    const JoinChannel= async () => {
        // TODO a faire un join channel il faut check si le mdp est bon ainsi que le nom
    }

    const Sendchannel = async () => {
        const resp = await UserAPI.getUser();
        if (resp)
            await ChatAPI.addChannel(name, resp.id , visibility, password);
    }

    return (
        <>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                <ButtonBase className="creachan_button" onClick={handleClickOpenCreate}>
                    Create
                </ButtonBase>
                <ButtonBase className="creachan_button" onClick={handleClickOpenJoin}>
                    Join
                </ButtonBase>
            </Stack>
            <Dialog open={openCreate} onClose={handleForceCloseCreate}>
                <DialogContent sx={{backgroundColor: "black"}}>
                    <Stack spacing={2} direction="column" >
                        <Stack justifyContent="center" alignItems="center" spacing={2}>
                            <input className="friends_search_bar" maxLength={10} style={{width: "480px", color: 'white'}} placeholder="Channel Name" onChange={ async (e) => {if (e.target.value.length < 11){setName(e.target.value)}}}/>
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                            <ButtonBase centerRipple className={"home_button but_" + ((visibility == "public")? "yellow": "red")} style={{width: "90px", height: '50px', borderRadius: 0, backgroundColor: (visibility == "public")? "yellow": "red"}} onClick={() => {setVisibility("public")}}>
                                <div className='bit5x5'> Public </div>
                            </ButtonBase>
                            <ButtonBase centerRipple className={"home_button but_" + ((visibility == "private")? "yellow": "red")} style={{width: "90px", height: '50px', borderRadius: 0, backgroundColor: (visibility == "private")? "yellow": "red"}} onClick={() => {setVisibility("private")}}>
                                <div className='bit5x5'> Private </div>
                            </ButtonBase>
                            <ButtonBase centerRipple className={"home_button but_" + ((visibility == "protected")? "yellow": "red")} style={{width: "90px", height: '50px', borderRadius: 0, backgroundColor: (visibility == "protected")? "yellow": "red"}} onClick={() => {setVisibility("protected")}}>
                                <div className='bit5x5'> Protected </div>
                            </ButtonBase>
                        </Stack>
                        <Stack justifyContent="center" alignItems="center">
                            {(visibility != "protected")? <></>:<input className="friends_search_bar" style={{width: "480px", color: 'white'}} placeholder="password" onChange={ async (e) => {setPassword(e.target.value)}}/>}
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                            <div className="home_button but_red" onClick={handleForceCloseCreate}>
                                <div className='bit5x5' > Cancel </div>
                            </div>
                            <Link onClick={handleCloseCreate} className="home_button but_red" style={{textDecoration: 'none',color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + name}}>
                                <div className='bit5x5'> Save </div>
                            </Link>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
            <Dialog open={openJoin} onClose={handleForceCloseJoin}>
                <DialogContent sx={{backgroundColor: "black"}}>
                    <Stack spacing={2} direction="column" >
                        <Stack justifyContent="center" alignItems="center" spacing={2}>
                            <input className="friends_search_bar" maxLength={10} style={{width: "480px", color: 'white'}} placeholder="Channel Name" onChange={ async (e) => {if (e.target.value.length < 11){setName(e.target.value)}}}/>
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                            <ButtonBase centerRipple className={"home_button but_" + ((visibility == "public")? "yellow": "red")} style={{width: "90px", height: '50px', borderRadius: 0, backgroundColor: (visibility == "public")? "yellow": "red"}} onClick={() => {setVisibility("public")}}>
                                <div className='bit5x5'> Public </div>
                            </ButtonBase>
                            <ButtonBase centerRipple className={"home_button but_" + ((visibility == "protected")? "yellow": "red")} style={{width: "90px", height: '50px', borderRadius: 0, backgroundColor: (visibility == "protected")? "yellow": "red"}} onClick={() => {setVisibility("protected")}}>
                                <div className='bit5x5'> Protected </div>
                            </ButtonBase>
                        </Stack>
                        <Stack justifyContent="center" alignItems="center">
                            {(visibility == "public")? <></>:<input className="friends_search_bar" style={{width: "480px", color: 'white'}} placeholder="password" onChange={ async (e) => {setPassword(e.target.value)}}/>}
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                            <div className="home_button but_red" onClick={handleForceCloseJoin}>
                                <div className='bit5x5' > Cancel </div>
                            </div>
                            <Link onClick={handleCloseJoin} className="home_button but_red" style={{textDecoration: 'none',color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + name}}>
                                <div className='bit5x5'> join </div>
                            </Link>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>

        </>
    );
}

export default CreateChannel;

{/*
    Il faut faire tout les input texte en propre 
    On peut rajouter 2 list lors de la creation en disant qui mettre en admin et ajouter des gens directement dedans depuis une liste d'amis
*/}