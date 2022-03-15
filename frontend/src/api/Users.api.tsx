export const URL_ME = () => {
	return process.env.REACT_APP_URL_ME; // will return API URL in .env file.
  };


  function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export class UserAPI {


		//getters
		public static async getUser() {
			const resp = await fetch(`${process.env.REACT_APP_URL_ME}`, {
				method: "GET",
				credentials: "include"}).then(response => {return response.json()})
				.then(json => {return json})
				.catch(err => {
					console.log('error catched')
					return null;
				})
			 return resp
		}


		public static async getUserById(id: number) {
			const resp = await fetch(`${process.env.REACT_APP_URL_USER}${id}`, {
				method: "GET",
				credentials: "include"})
				.then(response => {return response.json()}).then(json => {return json})
				.catch(err => {
					console.log('error catched')
					return null;
				})
			return resp
		}

		public static async getProfile() {
			const resp = await fetch(`${process.env.REACT_APP_URL_ME}`, {
				method: "GET",
				credentials: "include"}).then(response => {return response.json()})
				.then(json => {return json})
				.catch(err => {
					console.log('error catched')
					return null;
				})
			 return resp
		}

		public static async getAchievement() {
			const resp = await fetch(`${process.env.REACT_APP_URL_ME}`, {
				method: "GET",
				credentials: "include"}).then(response => {return response.json()})
				.then(json => {return json})
				.catch(err => {
					console.log('error catched')
					return null;
				})
			 return resp
		}


		//updaters
		public static async updateAvatar(avatar_url: string) {
			let ret = true;
			const resp = await fetch(`${process.env.REACT_APP_UPDATE_AVATAR}`, {
				method: "PUT",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ image: avatar_url }),
				credentials: "include"})
				.then(handleErrors)
			return ret;
		}

		public static async updateLogin(login: string) {
			let ret = true;
			const resp = await fetch(`${process.env.REACT_APP_UPDATE_LOGIN}`, {
				method: "PUT",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ login: login }),
				credentials: "include"})
				.then(handleErrors)
			return ret;
		}

		public static async updateStatus(id: number, status: number) {
			await fetch((process.env.REACT_APP_UPDATE_STATUS as string) + id, {
				method: "PUT",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: status }),
				credentials: "include"})
		}
		
		//status
		public static async reportActivity(id: number) {
			let ret = true;
			await fetch((process.env.REACT_APP_REPORT_ACTIVITY as string) + id, {
				method: "GET",
				credentials: "include"})
				.then(handleErrors)
				.catch(err => {
					console.log(err);
					ret = false;
				})
			return ret;
		}

		//friends

		public static async addFriend(id: number) {
			let ret = true;
			await fetch(`${process.env.REACT_APP_FRIENDS_API}`, {
			method: "POST",
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: id }),
			credentials: "include"})
			.then(handleErrors)
			.catch(err => {
				console.log(err);
				ret = false;
			})
			return ret;
		}

		public static async removeFriend(id: number) {
			await fetch(`${process.env.REACT_APP_FRIENDS_API}`, {
				method: "DELETE",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: id }),
				credentials: "include"})
			}

		public static async searchFriend(search: string) {
			const resp = await fetch(`${process.env.REACT_APP_SEARCH_FRIENDS_API}${search}`, {
				method: "GET",
				credentials: "include"}).then(response => {return response.json()})
				.then(json => {return json})
    			// .then(handleErrors)
				// .catch(err => {
				// 	console.log(err)
				// 	return null;
				// })
			 return resp
		}

		public static async logout() {
			await fetch(`${process.env.REACT_APP_LOGOUT}`, {
			method: "POST",
			credentials: "include"})
		}

		//2FA

		public static async turnTwofaOn(code: string) {
			let ret = true;
			const resp = await fetch((process.env.REACT_APP_TURN_ON_2FA as string), {
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ twofaCode: code }),
				credentials: "include"})
				.then(handleErrors)
				.catch(err => {
					console.log('error A catched')
					ret = false;
				})
			 return ret;
		}

		public static async authenticateTwofa(code: string) : Promise<boolean> {
			let ret = true;
			const resp = await fetch((process.env.REACT_APP_LOGIN_IN_2FA as string), {
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ twofaCode: code }),
				credentials: "include"})
				.then(handleErrors)
				.catch(err => {
					console.log('error A catched')
					ret = false;
				})
			 return ret;
		}

		public static async turnTwofaOff() {
			const resp = await fetch((process.env.REACT_APP_TURN_OFF_2FA as string), {
				method: "POST",
				credentials: "include"})
			 return resp;
		}

		public static async isTwofaEnabled() {
			const resp = await fetch(`${process.env.REACT_APP_2FA_ENABLED}`, {
				method: "GET",
				credentials: "include"}).then(response => {return response.json()})
				.then(json => {return json})
				// .then(handleErrors)
				// .catch(err => {
				// 	console.log('error catched')
				// 	console.log(err)
				// 	return null;
				// })
			 return resp
		}

		public static async getTwofaQR() {
			const resp = await fetch(`${process.env.REACT_APP_2FA_GENERATE}`, {
				method: "GET",
				credentials: "include"}).then(response => {return response.json()})
				.then(json => {return json})
				.then(handleErrors)
				.catch(err => {
					return null;
				})
			 return resp
		}
}