import { Component } from "react";
import { UserAPI } from "../api/Users.api";
import createActivityDetector from 'activity-detector';


interface HeaderProps {};

export class StatusDetector extends Component<HeaderProps>{
	idle: boolean = false;
	id!: number;
    activityDetector: any = null;

	constructor(props: HeaderProps) {
		super(props);
		console.log('construct activity detector');
		this.state = {avatar: undefined, login: undefined, anchorElUser: null, anchorElNav: null};
		setInterval(this.sendActivity.bind(this), 3000)
	}

	async fetchUser(){
		const resp = await UserAPI.getUser();
		console.log(">>>")
		console.log(resp)
		if (!resp)
			return;
		console.log('A')
		this.id = resp.id;
		if (resp.status < 3)
			this.idle = true;
		this.activityDetector = createActivityDetector({timeToIdle: 1000, ignoredEventsWhenIdle: [], initialState: 'idle'})
		this.activityDetector.on('idle', this.onIdle)
		this.activityDetector.on('active', this.onActive)
	}

	sendActivity = () => {
		if (this.idle === false && this.activityDetector)
			UserAPI.reportActivity(this.id);
	}

	componentDidMount() {
		this.fetchUser()
	}

    componentWillUnmount() {
        this.activityDetector.stop();
    }

	onIdle = () => {
		UserAPI.updateStatus(this.id, 2)
		this.idle = true;
	}

	onActive = () => {
		UserAPI.updateStatus(this.id, 3)
		this.idle = false;
	}

	onPlaying = () => {
		UserAPI.updateStatus(this.id, 4)
		this.idle = false;
	}

	render () {
		return (this.props.children)
	}
}

