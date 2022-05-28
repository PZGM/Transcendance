import { Difficulty } from './dto/game.dto';

export const URL_ME = () => {
	return process.env.REACT_APP_URL_ME; // will return API URL in .env file.
  };


  function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
	if (response.ok)
    	return response;
}

export class InvitationAPI {

	public static async acceptInvitation(senderId: number, receiverId: number, difficulty: Difficulty) {
		let ret = true;
		await fetch(`${process.env.REACT_APP_INVITATION as string}`, {
			method: "PUT",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ senderId, receiverId, difficulty }),
			credentials: "include"})
			.then(handleErrors)
		return ret;
	}

}