import { Grid } from '@mui/material';
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';


export default function MenuButton() {

	return (
        <Grid container direction="column" justifyContent="center" alignItems="center">
            {/* <Typography>{this.state.login}</Typography> */}
            <Typography>AFREIRE-</Typography>
            <Button component={Link} to={process.env.REACT_APP_PROFILE as string}>Profile</Button>
            <Button component={Link} to={process.env.REACT_APP_FRIENDS as string}>Friends</Button>
            <Button component={Link} to={process.env.REACT_APP_SETTINGS as string}>Settings</Button>
            <Button component={Link} to={process.env.REACT_APP_HISTORY as string}>Match History</Button>
            <Button component={Link} to={process.env.REACT_APP_ACHIEVEMENT as string}>Achievement</Button>
            <Box></Box>
        </Grid>
);
}