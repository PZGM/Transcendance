import * as React from 'react';
import { ButtonBase, Dialog, DialogContent, Stack } from "@mui/material";
import '../../../style/buttons.css'
import '../../../style/colors.css'
import { UserAPI } from '../../../api/Users.api';
import { ChatAPI } from '../../../api/Chat.api';
import "../../../style/input.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom';
// TODO Faire une jolie pop up avec un msg d'erreur si le nom du chan est deja use ou si un mdp n'a pas ete donne pour un chan 

function CreateChannel() {
    const [openCreate, setOpenCreate] = React.useState(false);
    const [openJoin, setOpenJoin] = React.useState(false);
    const [name, setName] = React.useState("");
    const [visibility, setVisibility] = React.useState("public");
    const [password, setPassword] = React.useState("");
    const [redirect, setRedirect] = React.useState("");

    const handleClickOpenCreate = () => {
      setOpenCreate(true);
    };
    const handleClickOpenJoin = () => {
      setOpenJoin(true);
    };
  
    const handleCreate = () => {
        if (visibility === "protected" && password === "") {
            toast.error("No password for the channel", {
                position: toast.POSITION.BOTTOM_CENTER,
                pauseOnHover: false,
                closeOnClick: true,
            })
        }
        else if(name === "") {
            toast.error("No name for the channel", {
                position: toast.POSITION.BOTTOM_CENTER,
                pauseOnHover: false,
                closeOnClick: true,
            })
        }
        else if(name.match(/[a-zA-Z]/i) == null)
        {
            toast.error("Channel name invalid. Only alphanumeric allowed", {
                position: toast.POSITION.BOTTOM_CENTER,
                pauseOnHover: false,
                closeOnClick: true,
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

    const handleCancelCreate = () => {
        setName("");
        setVisibility("public")
        setPassword("")
        setOpenCreate(false);
    };

    const handleJoin = async () => {
        // TODO le join du channel
        if (visibility === "protected" && password === "") {
            toast.error("No password for the channel", {
                position: toast.POSITION.BOTTOM_CENTER,
                pauseOnHover: false,
                closeOnClick: true,
            })
        }
        else if (visibility == "protected" && password.match(/w/i)) {
            toast.error("Invalid password. only alphanumeric allowed", {
                position: toast.POSITION.BOTTOM_CENTER,
                pauseOnHover: false,
                closeOnClick: true,
            })
        }
        else if(name == "") {

            toast.error("No name for the channel", {
                position: toast.POSITION.BOTTOM_CENTER,
                pauseOnHover: false,
                closeOnClick: true,
            })
        }
        else if(name.match(/[a-zA-Z]/i) == null)
        {
            toast.error("Channel name invalid. Only alphanumeric allowed", {
                position: toast.POSITION.BOTTOM_CENTER,
                pauseOnHover: false,
                closeOnClick: true,
            })
        }
        else{
            const channel = await ChatAPI.getChannelByName(name);
            await ChatAPI.joinChannel(channel.id);
            //redirect to /
            setName("");
            setVisibility("public")
            setPassword("")    
            setOpenCreate(false);
            setRedirect(`/home/chat/${name}`);

        }
    };

    const handleCancelJoin = () => {
        setName("");
        setVisibility("public")
        setPassword("")
        setOpenJoin(false);
    };

    const Sendchannel = async () => {
        const resp = await UserAPI.getUser();
        if (resp)
            await ChatAPI.addChannel(name, resp.id , visibility, password);
    }

	const searchName = async (e: React.ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.value.replace(/\W/g, "");
		const search = e.target.value;
		if (!search || search === '')
			return;
        setName(search)
	}
	const searchPassword = async (e: React.ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.value.replace(/\W/g, "");
		const search = e.target.value;
		if (!search || search === '')
			return;
        setPassword(search)
	}

    return (
        <>
        { redirect ? (<Navigate to={redirect} />) : null }
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" style={{color: "white"}}>
                <ButtonBase className="creachan_button" onClick={handleClickOpenCreate}>
                    Create
                </ButtonBase>
                <ButtonBase className="creachan_button" onClick={handleClickOpenJoin} style={{color: "white"}}>
                    Join
                </ButtonBase>
            </Stack>
            <Dialog open={openCreate} onClose={handleCancelCreate}>
                <DialogContent sx={{backgroundColor: "black",border: 5, borderColor: "#8e00ae"}}>
                    <Stack spacing={2} direction="column">
                        <Stack justifyContent="center" alignItems="center" spacing={2}>
                            <input className="friends_search_bar" maxLength={10} placeholder="Channel Name" onChange={ async (e) => {searchName(e)}}/>
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                            <ButtonBase centerRipple className={"home_button but_" + ((visibility === "public")? "yellow": "red")} style={{backgroundColor: (visibility === "public")? "yellow": "red"}} onClick={() => {setVisibility("public")}}>
                                <div className='bit5x5'> Public </div>
                            </ButtonBase>
                            <ButtonBase centerRipple className={"home_button but_" + ((visibility === "private")? "yellow": "red")} style={{backgroundColor: (visibility === "private")? "yellow": "red"}} onClick={() => {setVisibility("private")}}>
                                <div className='bit5x5'> Private </div>
                            </ButtonBase>
                            <ButtonBase centerRipple className={"home_button but_" + ((visibility === "protected")? "yellow": "red")} style={{backgroundColor: (visibility === "protected")? "yellow": "red"}} onClick={() => {setVisibility("protected")}}>
                                <div className='bit5x5'> Protected </div>
                            </ButtonBase>
                        </Stack>
                        <Stack justifyContent="center" alignItems="center">
                            {(visibility !== "protected")? <></>:<input className="friends_search_bar" placeholder="password" onChange={ async (e) => {searchPassword(e)}}/>}
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                            <div className="home_button but_red" onClick={handleCancelCreate}>
                                <div className='bit5x5' > Cancel </div>
                            </div>
                            <ButtonBase onClick={handleCreate} className="home_button but_red" style={{textDecoration: 'none',color: 'white' }}>
                                <div className='bit5x5'> Save </div>
                            </ButtonBase>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
            <Dialog open={openJoin} onClose={handleCancelJoin}>
                <DialogContent sx={{backgroundColor: "black",border: 5, borderColor: "#8e00ae"}}>
                    <Stack spacing={2} direction="column" >
                        <Stack justifyContent="center" alignItems="center" spacing={2}>
                            <input className="friends_search_bar" maxLength={10} placeholder="Channel Name" onChange={ async (e) => {searchName(e)}}/>
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
                            {(visibility === "public")? <></>:<input className="friends_search_bar"  placeholder="password" onChange={ async (e) => {searchPassword(e)}}/>}
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
                </DialogContent>
            </Dialog>

        </>
    );
}

export default CreateChannel;


