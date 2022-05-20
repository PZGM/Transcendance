export class GameAPI {

	public static async getSocketId(id: number) {
		const resp = await fetch(`${process.env.REACT_APP_URL_USER}${id}/socket`, {
			method: "GET",
            credentials: "include"})
            .then(response => {return response.json()})
            .then(json => {return json})
            .catch(err => {
            console.log('No channels')
            return null;
        })
        console.log(resp)
     return resp
    }
}