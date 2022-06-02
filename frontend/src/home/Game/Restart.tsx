import { Stack } from "@mui/material";
import '../../style/display.css';
import './pong.scss';
import { Room } from '../../api/dto/game.dto';
import { GameSocketAPI } from "../../api/GameSocket.api";
import { UserDto } from "../../api/dto/user.dto";

interface RestartProps {
    room?: Room,
    updateDisplay: any,
    socket: GameSocketAPI,
    userId: number
};
enum roomEnum {
    waiting,
    playing,
    goal,
    end
}

function Restart (props: RestartProps)
{
    const handleReturn = () =>{
        // if (props.room)
        //     props.socket.leaveRoom(props.userId, props.room?.roomId)
        props.updateDisplay(0);
    }

    const areYouTheWinner = (p: UserDto) => {
        if (props.userId === p.id)
            return <div className={p.color}>you</div>
        else
            return <div className={p.color}>{p.login}</div>
    }

    if (!props.room)
        return (
            <div className="grid_item_style" style={{color: 'white'}}>LOADING...</div>
        );
    else
        return (
            <div className="game_frame">
                <Stack direction='column'
                    className='grid_item_style'
                    justifyContent='space-evenly'
                    spacing={3}
                    style={{height: '100%',
                            width: '100%'}}
                >
                    { (props.room.pOneScore === 10)?
                        <div className="score bit5x5">
                            {areYouTheWinner(props.room.pOne)} won!
                        </div>
                        :
                        <div className="score bit5x5">
                            {areYouTheWinner(props.room.pTwo)} won!
                        </div>
                    }
                    <div className="play_button" onClick={handleReturn}>Leave</div>

                </Stack>
            </div>
        )
}
export default Restart;