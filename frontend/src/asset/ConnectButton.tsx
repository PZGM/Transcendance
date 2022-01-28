import { Avatar, Box, Button } from "@mui/material";
import logo from '../42_Logo.svg.png';



export default function ConnectButton() {

    return (
        <Box mt={42}>
            <Button variant="contained" sx={{ fontWeight: 'bold',fontSize: 'h8.fontSize' }} style={{backgroundColor:'#424242'}} 
            startIcon={<Avatar variant="square" src={logo}/>}
            target="_blank"
            component="a"
            // href="http://ssh.billyboy.fr:3000/api/auth/login">
            href="http://68.183.43.160:3000/profil">
                Connect
            </Button>
        </Box>
    );
}