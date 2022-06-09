import { GameDto } from './dto/game.dto';
import { UserDto } from './dto/user.dto';

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

function handlelog(response) {
	return response.ok;
}
  
export class UserRelationsPicker {
    withChannels?: boolean;
    withBlocked?: boolean;
    withStats?: boolean;
    withGames?: boolean;
	withFriends?: boolean;
}

function optionsToQuery(options: UserRelationsPicker) {
    let tab: string[] = [];
    if (options.withChannels)
        tab.push('withChannels=true');
    if (options.withBlocked)
        tab.push('withBlocked=true');
    if (options.withStats)
        tab.push('withStats=true');
    if (options.withGames)
        tab.push('withGames=true');
	if (options.withFriends)
        tab.push('withFriends=true');
    return tab.join('&');
}

export class UserAPI {

		//check login
		public static async checkLoggedIn(): Promise<boolean> {
			const ret =await fetch(`${process.env.REACT_APP_CHECK_LOGGED_IN}`, {
				method: 'GET',
				credentials: 'include'})
				.then(response => {
					if (response.ok) {
						return response.json();
					}
					else
					return false;
				})
				.then(json => {return json})
				.catch(err => {
					console.log('error catched 1')
					return false;
				})
				return ret;
		}

		//find
		public static async searchUsers(search: string) {
			const resp: UserDto[] = await fetch(`${process.env.REACT_APP_SEARCH_USERS_API}${search}`, {
				method: 'GET',
				credentials: 'include'}).then(response => {return response.json()})
				.then(json => {return json})
			 return resp
		}

		//getters
		public static async getMe(options?: UserRelationsPicker): Promise<UserDto|null>
		{
			const query = (options) ? `?${optionsToQuery(options)}` : '';
			const ret = await fetch(`${process.env.REACT_APP_URL_ME}${query}`, {
				method: 'GET',
				credentials: 'include'})
				.then(response => {
					if (response.ok) {
						return response.json();
					}
					else
					return null;
				})
				.then(json => {return json})
				.catch(err => {
					console.log('error catched 2')
					return null;
				})
				return ret;
		}

		public static async getUserById(id: number, options?: UserRelationsPicker): Promise<UserDto|null>
		{
			const query = (options) ? `?${optionsToQuery(options)}` : '';
			const ret = await fetch(`${process.env.REACT_APP_URL_USER}${id}${query}`, {
				method: 'GET',
				credentials: 'include'})
				.then(response => {
					if (response.ok) {
						return response.json();
					}
					else
					return null;
				})
				.then(json => {return json})
				.catch(err => {
					console.log('error catched 2')
					return null;
				})
				return ret;
		}

		public static async getUserByLogin(login: string): Promise<UserDto|null>
		{
			const resp = await fetch(`${process.env.REACT_APP_URL_USER}${login}/user/login`, {
				method: 'GET',
				credentials: 'include'})
				.then(response => {return response.json()})
			if (resp == false)
				return null;
			return resp
		}

		public static async getAchievement() {
			const resp = await fetch(`${process.env.REACT_APP_URL_ME}`, {
				method: 'GET',
				credentials: 'include'}).then(response => {return response.json()})
				.then(json => {return json})
				.catch(err => {
					console.log('error catched 5')
					return null;
				})
			 return resp
		}


		//updaters
		public static async updateAvatar(avatar_url: string) {
			let ret = true;
			await fetch(`${process.env.REACT_APP_UPDATE_AVATAR}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ image: avatar_url }),
				credentials: 'include'})
				.then(handleErrors)
			return ret;
		}

		public static async updateLogin(login: string) {
			let ret = await fetch(`${process.env.REACT_APP_UPDATE_LOGIN}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ login: login }),
			credentials: 'include'})
			.then(async response => {return response.json()})
			.then(json => {return json})
			if (!ret) {
				return false
			}
			return ret;
		}

		public static async updateColor(color: string) {
			await fetch((process.env.REACT_APP_UPDATE_COLOR as string), {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ color: color }),
				credentials: 'include'})
				.then(handleErrors)
		}

		public static async updateStatus(id: number, status: number) {
			await fetch(`${process.env.REACT_APP_UPDATE_STATUS}${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: status }),
				credentials: 'include'})
				.catch(err => {
					console.log('error catched in status:');
					console.log(err);
					return null;
				})
		}
		
		//status
		public static async reportActivity(id: number) {
			let ret = true;
			try {
			await fetch((process.env.REACT_APP_REPORT_ACTIVITY as string) + id, {
				method: 'GET',
				credentials: 'include'})
				.then(handleErrors)
				.catch(err => {
					console.log(err);
					ret = false;
				})
			}
			catch {
				console.log('error')
			}
			return ret;
		}

		public static async reportInactivity(id: number) {
			let ret = true;
			try {
			await fetch((process.env.REACT_APP_REPORT_INACTIVITY as string) + id, {
				method: 'GET',
				credentials: 'include'})
				.then(handleErrors)
				.catch(err => {
					console.log(err);
					ret = false;
				})
			}
			catch {
				console.log('error')
			}
			return ret;
		}

		//friends

		public static async addFriend(id: number) {
			let ret = true;
			await fetch(`${process.env.REACT_APP_FRIENDS_API}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ id: id }),
			credentials: 'include'})
			.then(handleErrors)
			.catch(err => {
				console.log(err);
				ret = false;
			})
			return ret;
		}

		public static async removeFriend(id: number) {
			let ret = true;
			const resp = await fetch(`${process.env.REACT_APP_FRIENDS_API}`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: id }),
				credentials: 'include'})
				.then(handleErrors)
				.catch(err => {
					console.log(err);
					ret = false;
				})
				return ret;
			}

		public static async searchFriend(search: string) {
			const resp: UserDto[] = await fetch(`${process.env.REACT_APP_SEARCH_FRIENDS_API}${search}`, {
				method: 'GET',
				credentials: 'include'}).then(response => {return response.json()})
				.then(json => {return json})
			 return resp
		}

		public static async getFriends() {
			const resp: UserDto[] = await fetch(`${process.env.REACT_APP_FRIENDS_API}`, {
				method: 'GET',
				credentials: 'include'}).then(async response => {return await response.json()})
				.then(json => {return json})
			 return resp
		}

		public static async logout() {
			await fetch(`${process.env.REACT_APP_LOGOUT}`, {
			method: 'POST',
			credentials: 'include'})
		}

		//2FA

		public static async turnTwofaOn(code: string) {
			let ret = true;
			await fetch((process.env.REACT_APP_TURN_ON_2FA as string), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ twofaCode: code }),
				credentials: 'include'})
				.then(handleErrors)
				.catch(err => {
					console.log('error A catched')
					ret = false;
				})
			 return ret;
		}

		public static async authenticateTwofa(code: string) : Promise<boolean> {
			let ret = true;
			await fetch((process.env.REACT_APP_LOGIN_IN_2FA as string), {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ twofaCode: code }),
				credentials: 'include'})
				.then(handleErrors)
				.catch(err => {
					console.log('error A catched')
					ret = false;
				})
			 return ret;
		}

		public static async turnTwofaOff() {
			const resp = await fetch((process.env.REACT_APP_TURN_OFF_2FA as string), {
				method: 'POST',
				credentials: 'include'})
			 return resp;
		}

		public static async isTwofaEnabled() {
			const resp = await fetch(`${process.env.REACT_APP_2FA_ENABLED}`, {
				method: 'GET',
				credentials: 'include'}).then(response => {return response.json()})
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
				method: 'GET',
				credentials: 'include'}).then(response => {return response.json()})
				.then(json => {return json})
				.then(handleErrors)
				.catch(err => {
					return null;
				})
			 return resp
		}

		//history

		public static async createNewGame(details: GameDto) : Promise<boolean> {
			let ret = true;
			await fetch((process.env.REACT_APP_HISTORY_NEW_GAME as string), {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(details),
				credentials: 'include'})
				.then(handleErrors)
				.catch(err => {
					console.log('error P1 catched')
					ret = false;
				})
			 return ret;
		}

		public static async getHistory() {
			const resp = await fetch((process.env.REACT_APP_HISTORY_GET as string), {
				method: 'GET',
				credentials: 'include'})
				.then(async response => {return response.json()})
				.then(json => {return json})
			 return resp
		}


		public static async watchUser(userId: number): Promise<boolean>  {
			const resp = await fetch(`${process.env.REACT_APP_WATCH}${userId}`, {
				method: 'PUT',
				credentials: 'include'})
				.then(handleErrors)
			 return resp
		}

		//block

		public static async blockUser(blockId: number): Promise<boolean>  {
			const resp = await fetch(`${process.env.REACT_APP_BLOCK}${blockId}`, {
				method: 'PUT',
				credentials: 'include'})
				.then(async response => {return response.json()})
				.then(json => {return json})
			 return resp
		}

		public static async unblockUser(unblockId: number): Promise<boolean> {
			const resp = await fetch(`${process.env.REACT_APP_BLOCK}${unblockId}`, {
				method: 'DELETE',
				credentials: 'include'})
				.then(async response => {return response.json()})
				.then(json => {return json})
			 return resp
		}
	}