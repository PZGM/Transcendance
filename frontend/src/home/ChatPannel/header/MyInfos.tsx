import { Avatar, ButtonBase, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserAPI } from "../../../api/Users.api";
import { statusEnum } from "../Chat";

interface MyInfosProps {
	avatar?: string,
	login?: string,
	color?: string,
	id: number,
	status: number,
}
interface StatusData {
    status: number;
}

function MyInfos(props: MyInfosProps) {

	const navigate = useNavigate()
    let eventSource: EventSource;
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        //component will mount
        eventSource = new EventSource((process.env.REACT_APP_UPDATE_STATUS as string) + props.id, {withCredentials: true});
		eventSource.onmessage = (e: { data: string; }) => {
            let jsonObj: any = JSON.parse(e.data);
            let status: StatusData = jsonObj as StatusData;
            if (status.status < 0 || status.status > 6)
                status.status = 0;
            setStatus(status.status);
        };
        eventSource.onerror = (e: any) => {
            setStatus(0);
        }
            return () => {
            if (eventSource)
                eventSource.close();
        }
      }, [status, props.id])

	const handleClick = () => {
		if (status === statusEnum.playing)
			toast.error("Can't open the menu while playing", {
				position: toast.POSITION.BOTTOM_CENTER,
				pauseOnHover: false,
				closeOnClick: true,
			})
		else if (status === statusEnum.watching)
			toast.error("Can't open the menu while watching", {
				position: toast.POSITION.BOTTOM_CENTER,
				pauseOnHover: false,
				closeOnClick: true,
			})
		else {
			navigate(process.env.REACT_APP_PROFILE as string)
		}
	}

	if (props.avatar && props.login && props.color)
		return (
			<div onClick={handleClick} style={{marginTop: '0.2vw', marginBottom: '0.7vw', cursor: 'pointer'}}>
				<Stack direction="row" justifyContent='center' spacing={1} style={{width: '90%'}}>
					<Avatar variant='circular' alt="Semy Sharp" src={props.avatar} sx={{margin: "0.3vw", height: '2.5vw', width: '2.5vw'}}/>
					<div className='backto1982' style={{color: props.color, fontSize: "1.5vw", display: 'flex', alignItems: 'center'}}> {props.login} </div>
				</Stack>
			</div>
		)
	else
		return <div className="grid_item_style" style={{color: 'white'}}>LOADING...</div>
}

export default MyInfos;	
