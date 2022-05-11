import * as React from 'react';
import { Button, ButtonBase, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputBase, Stack, TextField } from "@mui/material";
import '../../../style/buttons.css'
import { UserAPI } from '../../../api/Users.api';
import { ChatAPI } from '../../../api/Chat.api';

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
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState("");
    const [owner, setOwner] = React.useState(null);
    const [visibility, setVisibility] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
        Sendchannel();
        setOpen(false);
    };

    const Sendchannel = async () => {
        const resp = await UserAPI.getUser();
        if (resp)
            await ChatAPI.addChannel(name, resp.id , visibility, password);
    }

    return (
        <>
            <ButtonBase className="creachan_button" onClick={handleClickOpen}>
                Create Channel
            </ButtonBase>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Subscribe
                </DialogTitle>
                <DialogContent>
                    <Stack justifyContent="center" alignItems="center">
                        <InputBase sx={{width: "480px"}} inputProps={{min: 0, style: { textAlign: 'center' }}}  placeholder="Channel Name" onChange={ async (e) => {setName(e.target.value)}}/>
                        {/* className={styles.input} */}
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                        <ButtonBase centerRipple className="home_button" style={{width: "90px", height: '50px', borderRadius: 0, backgroundColor: "red"}} onClick={() => {setVisibility("public")}}>
                            <div className='bit5x5'> Public </div>
                        </ButtonBase>
                        <ButtonBase centerRipple className="home_button" style={{width: "90px", height: '50px', borderRadius: 0, backgroundColor: "red"}} onClick={() => {setVisibility("private")}}>
                            <div className='bit5x5'> Private </div>
                        </ButtonBase>
                        <ButtonBase centerRipple className="home_button" style={{width: "90px", height: '50px', borderRadius: 0, backgroundColor: "red"}} onClick={() => {setVisibility("protected")}}>
                            <div className='bit5x5'> Protected </div>
                        </ButtonBase>
                    </Stack>
                    <Stack justifyContent="center" alignItems="center">
                        <InputBase sx={{width: "480px"}} inputProps={{min: 0, style: { textAlign: 'center' }}}  placeholder="Password" onChange={ async (e) => {setPassword(e.target.value)}}/>
                        {/* className={styles.lockinput} */}
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}

export default CreateChannel;

{/*
    Il faut faire tout les input texte en propre 
    On peut rajouter 2 list lors de la creation en disant qui mettre en admin et ajouter des gens directement dedans depuis une liste d'amis
*/}