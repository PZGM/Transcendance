import { Component } from "react";
import { UserAPI } from "../api/Users.api";
import ActivityDetector from 'react-activity-detector';


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
	}

	sendActivity = () => {
		if (this.idle === false && this.activityDetector)
			UserAPI.reportActivity(this.id);
	}

	componentDidMount() {
		this.fetchUser()
	}

    componentWillUnmount() {
		if (this.activityDetector)
        	this.activityDetector.stop();
    }

	onIdle = () => {
		console.log('idle');
		UserAPI.updateStatus(this.id, 2)
		this.idle = true;
	}

	onActive = () => {
		console.log('active');
		UserAPI.updateStatus(this.id, 3)
		this.idle = false;
	}

	onPlaying = () => {
		UserAPI.updateStatus(this.id, 4)
		this.idle = false;
	}

	customActivityEvents = ['click', 'mousemove', 'keydown', 'DOMMouseScroll', 'mousewheel', 'mousedown', 'touchstart', 'touchmove', 'focus']

	render () {
		return (
		<>
			<ActivityDetector activityEvents={this.customActivityEvents} enabled={true} timeout={5*1000} onIdle={this.onIdle} onActive={this.onActive}/>
			{this.props.children}
		</>
		);
	}
}

