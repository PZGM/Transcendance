import { Stack } from "@mui/material";
import { Component } from "react";
import '../../style/display.css';
import './pong.scss';
import { Room } from '../../api/dto/game.dto';

interface RestartProps {
	room?: Room,
    updateDisplay: any,

};
enum roomEnum {
    waiting,
    playing,
    goal,
    end
}

function Restart (RestartProps)
{

    const handleReturn= () =>{
        RestartProps.updateDisplay(0);
    }

    return (
        <div className="game_frame">
            <Stack direction='column'
                className='grid_item_style'
                justifyContent='space-evenly'
                spacing={3}
                style={{height: '100%',
                        width: '100%'}}
            >
                <Stack direction="row" spacing={2}>
                    { (RestartProps.room.pOneScore === 10)?
                        <div className={"score bit5x5 " + RestartProps.room.pOne.color}>{RestartProps.room.pOne.login}</div>
                        :
                        <div className={"score bit5x5 " + RestartProps.room.pTwo.color}>{RestartProps.room.pTwo.login}</div>
                    }
                    <div className="score bit5x5 white"> {"won !"}</div>
                </Stack>
                <div className="play_button" onClick={handleReturn}>Leave</div>

            </Stack>
        </div>
    )
}
export default Restart;
