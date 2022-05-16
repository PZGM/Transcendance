function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export class GameAPI {

	public static async getRoom() {
		const resp = await fetch(`${process.env.REACT_APP_GET_GAME_ROOM}`, {
			method: "GET",
			credentials: "include"})
			.then(response => {return response.json()})
			.then(json => {return json})
			.catch(err => {
				console.log("Room not found")
				return null;
			})
		return resp;
	}

}