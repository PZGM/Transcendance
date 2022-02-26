export const URL_ME = () => {
	return process.env.REACT_APP_URL_ME; // will return API URL in .env file.
  };

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

		//updaters
		public static async updateAvatar(avatar_url: string) {
			console.log(`${process.env.REACT_APP_UPDATE_AVATAR}`);

			const resp = await fetch(`${process.env.REACT_APP_UPDATE_AVATAR}`, {
				method: "PUT",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ image: avatar_url }),
				credentials: "include"})
				console.log(JSON.stringify({ image: avatar_url }));
			 return resp;
		}

		public static async updateLogin(login: string) {
			const resp = await fetch(`${process.env.REACT_APP_UPDATE_LOGIN}`, {
				method: "PUT",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ login: login }),
				credentials: "include"})
			 return resp;
		}

		public static async updateStatus(id: number, status: number) {
			const resp = await fetch((process.env.REACT_APP_UPDATE_STATUS as string) + id, {
				method: "PUT",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: status }),
				credentials: "include"})
			 return resp;
		}
		
		//status
		public static async reportActivity(id: number) {
			const resp = await fetch((process.env.REACT_APP_REPORT_ACTIVITY as string) + id, {
				method: "GET",
				credentials: "include"})
			return resp;
		}

		//friends

		public static async addFriend(id: number) {
			const resp = await fetch(`${process.env.REACT_APP_FRIENDS_API}`, {
				method: "POST",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id: id }),
				credentials: "include"})
		}

		public static async removeFriend(id: number) {
			const resp = await fetch(`${process.env.REACT_APP_FRIENDS_API}`, {
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
				.catch(err => {
					console.log('error catched')
					return null;
				})
			 return resp
		}
}








// import React from "react";
// import './App.css';
// class App extends React.Component {
   
// 	// Constructor 
// 	constructor(props) {
// 		super(props);
   
// 		this.state = {
// 			items: [],
// 			DataisLoaded: false
// 		};
// 	}
   
// 	// ComponentDidMount is used to
// 	// execute the code 
// 	componentDidMount() {
// 		fetch("https://jsonplaceholder.typicode.com/users")
// 			.then((res) => res.json())
// 			.then((json) => {this.setState({items: json,DataisLoaded: true});
// 			})
// 	}
// 	render() {
// 		const { DataisLoaded, items } = this.state;
// 		if (!DataisLoaded) return <div>
// 			<h1> Pleses wait some time.... </h1> </div> ;
   
// 		return (
// 		<div className = "App">
// 			<h1> Fetch data from an api in react </h1>  {
// 				items.map((item) => ( 
// 				<ol key = { item.id } >
// 					User_Name: { item.username }, 
// 					Full_Name: { item.name }, 
// 					User_Email: { item.email } 
// 					</ol>
// 				))
// 			}
// 		</div>
// 	);
// }
// }
   
// export default App;