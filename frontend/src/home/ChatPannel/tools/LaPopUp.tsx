import * as React from 'react';
import { Button, ButtonBase, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputBase, Stack, TextField } from "@mui/material";
import '../../../style/buttons.css'

function LaPopUp(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
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
                        <InputBase sx={{width: "480px"}} inputProps={{min: 0, style: { textAlign: 'center' }}}  placeholder="Channel Name" onChange={ async (e) => {}}/>
                        {/* className={styles.input} */}
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                        <ButtonBase centerRipple className="home_button" style={{width: "90px", height: '50px', borderRadius: 0, backgroundColor: "red"}} onClick={() => {}}>
                            <div className='bit5x5'> Public </div>
                        </ButtonBase>
                        <ButtonBase centerRipple className="home_button" style={{width: "90px", height: '50px', borderRadius: 0, backgroundColor: "red"}} onClick={() => {}}>
                            <div className='bit5x5'> Private </div>
                        </ButtonBase>
                        <ButtonBase centerRipple className="home_button" style={{width: "90px", height: '50px', borderRadius: 0, backgroundColor: "red"}} onClick={() => {}}>
                            <div className='bit5x5'> Protected </div>
                        </ButtonBase>
                    </Stack>
                    <Stack justifyContent="center" alignItems="center">
                        <InputBase sx={{width: "480px"}} inputProps={{min: 0, style: { textAlign: 'center' }}}  placeholder="Password" onChange={ async (e) => {}}/>
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

export default LaPopUp;

{/*
    Il faut faire tout les input texte en propre 
    On peut rajouter 2 list lors de la creation en disant qui mettre en admin et ajouter des gens directement dedans depuis une liste d'amis
*/}