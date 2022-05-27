import { Component } from "react";
import { UserAPI } from "../api/Users.api";
import createActivityDetector from 'react-activity-detector';


interface StatusDetectorProps {
	children?: React.ReactNode;
};

export class StatusDetector extends Component<StatusDetectorProps>{
	idle: boolean = false;
	id!: number;
    activityDetector: any = null;

	constructor(props: StatusDetectorProps) {
		super(props);
		this.state = {avatar: undefined, login: undefined, anchorElUser: null, anchorElNav: null};
		setInterval(this.sendActivity.bind(this), 3000)
	}

	async fetchUser(){
		const logged = await UserAPI.checkLoggedIn();
		if (logged === false)
			return;
		const resp = await UserAPI.getMe();
		if (!resp)
			return;
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

