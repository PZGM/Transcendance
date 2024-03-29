import * as React from 'react';
import { ButtonBase, Dialog, DialogContent, Stack } from "@mui/material";
import '../../../style/buttons.css'
import '../../../style/colors.css'
import { UserAPI } from '../../../api/Users.api';
import { ChatAPI } from '../../../api/Chat.api';
import "../../../style/input.css"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import JoinChannel from './JoinChannel'

function CreateChannel(props) {
    const [openCreate, setOpenCreate] = React.useState(false);
    const [openJoin, setOpenJoin] = React.useState(false);
    const [name, setName] = React.useState("");
    const [visibility, setVisibility] = React.useState("public");
    const [password, setPassword] = React.useState("");

    let navigate = useNavigate();

    const handleClickOpenCreate = () => {
      setOpenCreate(true);
    };
    const handleClickOpenJoin = () => {
      setOpenJoin(true);
    };
    const handleCreate = async () => {
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
        else if(name.length < 3)
        {
            toast.error("Channel name too short", {
                position: toast.POSITION.BOTTOM_CENTER,
                pauseOnHover: false,
                closeOnClick: true,
            })
        }
        else{
            if (await Sendchannel()) {
                setVisibility("public")
                setPassword("")    
                setName("");
                setOpenCreate(false);
                navigate(`/home/chat/${name}`);
                props.close();
            }
            else {
                toast.error("Channel can't be created", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    pauseOnHover: false,
                    closeOnClick: true,
                })
            }
        }
    };

    const handleCancelCreate = () => {
        setName("");
        setVisibility("public")
        setPassword("")
        setOpenCreate(false);
    };

    const handleCancelJoin = () => {
        setName("");
        setVisibility("public")
        setPassword("")
        setOpenJoin(false);
    };

    const Sendchannel = async () => {
        const resp = await UserAPI.getMe();
        let ret = false;
        if (resp)
            ret = await ChatAPI.addChannel(name, resp.id , visibility, password);
        return ret;
    }

	const searchName = async (e: React.ChangeEvent<HTMLInputElement>) => {
		e.target.value = e.target.value.replace(/\W/g, "");
		const search = e.target.value;
		if (!search || search === '')
			return;
        setName(search.toLowerCase())
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
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" style={{color: "white"}}>
                <ButtonBase className="creachan_button" onClick={handleClickOpenCreate}>
                    Create
                </ButtonBase>
                <ButtonBase className="creachan_button" onClick={handleClickOpenJoin}>
                    Join
                </ButtonBase>
            </Stack>
            <Dialog open={openCreate} onClose={handleCancelCreate}>
                <DialogContent sx={{backgroundColor: "black",border: 5, borderColor: "#8e00ae"}}>
                    <Stack spacing={2} direction="column">
                        <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
                            <input className="friends_search_bar" maxLength={10} placeholder="Channel Name" onChange={ async (e) => {searchName(e)}}/>
                            <div className='bit5x5' style={{color: "white"}}> Visibility :</div>
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{fontSize: "0.5vw"}}>
                            <ButtonBase centerRipple className={"home_button but_" + ((visibility === "public")? "blue": "cyan")} style={{backgroundColor: (visibility === "public")? "blue": "cyan"}} onClick={() => {setVisibility("public")}}>
                                { (visibility === "public") ? <div className='bit5x5try'style={{color: "white"}}> Public </div>:
                                <div className='bit5x5try' > Public </div>}
                            </ButtonBase>
                            <ButtonBase centerRipple className={"home_button but_" + ((visibility === "private")? "blue": "cyan")} style={{backgroundColor: (visibility === "private")? "blue": "cyan"}} onClick={() => {setVisibility("private")}}>
                            { (visibility === "private") ? <div className='bit5x5try'style={{color: "white"}}> private </div>:
                                <div className='bit5x5try' > private </div>}
                            </ButtonBase>
                            <ButtonBase centerRipple className={"home_button but_" + ((visibility === "protected")? "blue": "cyan")} style={{backgroundColor: (visibility === "protected")? "blue": "cyan"}} onClick={() => {setVisibility("protected")}}>
                            { (visibility === "protected") ? <div className='bit5x5try' style={{color: "white"}}> protected </div>:
                                <div className='bit5x5try' > protected </div>}
                            </ButtonBase>
                        </Stack>
                        <Stack justifyContent="center" alignItems="center">
                            {(visibility !== "protected")? <></>:<input type="password" className="friends_search_bar" placeholder="password" onChange={ async (e) => {searchPassword(e)}}/>}
                        </Stack>
                        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{fontSize: "0.7vw"}}>
                            <div className="home_button but_red" onClick={handleCancelCreate}>
                                <div className='bit5x5' > Cancel </div>
                            </div>
                            <div onClick={handleCreate} className="home_button but_red">
                                <div className='bit5x5'> Save </div>
                            </div>
                        </Stack>
                    </Stack>
                </DialogContent>
            </Dialog>
            <Dialog open={openJoin} onClose={handleCancelJoin}>
                <JoinChannel setOpen={setOpenJoin} close={props.close}/>
            </Dialog>

        </>
    );
}

export default CreateChannel;