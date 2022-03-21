import { Grid } from '@mui/material';
import { Avatar, Box, Button, ButtonBase, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';


export default function MenuButton() {

	return (
        <Stack direction="column" justifyContent="space-evenly" alignItems="center" spacing={2}>
        <Stack direction="row" justifyContent="flex-end" alignItems="flex-start" sx={{width: "100%"}}>
            <Button component={Link} to={process.env.REACT_APP_HOME as string} sx={{backgroundColor: 'red'}}><CloseIcon/></Button>
        </Stack>
        <ButtonBase component={Link} to={process.env.REACT_APP_PROFILE as string}>Profile</ButtonBase>
        <Button component={Link} to={process.env.REACT_APP_FRIENDS as string}>Friends</Button>
        <Button component={Link} to={process.env.REACT_APP_SETTINGS as string}>Settings</Button>
        <Button component={Link} to={process.env.REACT_APP_HISTORY as string}>Match History</Button>
        <Button component={Link} to={process.env.REACT_APP_ACHIEVEMENT as string}>Achievement</Button>
        <Box></Box>
    </Stack>
);
}