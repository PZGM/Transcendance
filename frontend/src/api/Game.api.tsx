import { Difficulty } from './dto/game.dto';

// export class GameAPI {

// 	public static async invitePlayer(inviteId: number, difficulty: Difficulty) {
// 		const resp = await fetch(`${process.env.REACT_APP_INVITE_PLAYER}`, {
// 			method: "GET", . 
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({inviteId, difficulty}),
//             credentials: "include"
// 		})
// 		.then(response => {return response.json()})
// 		.then(json => {return json});
// 		return resp;
// 	}
// }