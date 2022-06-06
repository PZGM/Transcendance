import { Component } from "react";
import { UserAPI } from "../api/Users.api";
import ActivityDetector from 'react-activity-detector';


interface StatusDetectorProps {
	children?: React.ReactNode;
};

export class StatusDetector extends Component<StatusDetectorProps>{
	id: number = -1;
    activityDetector: any = null;
	active: boolean = false;

	constructor(props: StatusDetectorProps) {
		super(props);
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
	}

	sendActivity = () => {
		if (this.id != -1 && this.active) {
			UserAPI.reportActivity(this.id);
		}
	}

	componentDidMount() {
		this.fetchUser()
	}

    componentWillUnmount() {
		if (this.activityDetector)
        	this.activityDetector.stop();
    }

	onIdle = () => {
		this.active = false;
		if (this.id != -1 && this.active) {
			UserAPI.reportInactivity(this.id);
		}	
	}

	onActive = () => {
		this.active = true;
		if (this.id != -1 && !this.active) {
			UserAPI.reportActivity(this.id);
		}	
	}

	customActivityEvents = ['click', 'mousemove', 'keydown', 'DOMMouseScroll', 'mousewheel', 'mousedown', 'touchstart', 'touchmove', 'focus',]

	render () {
		return (
		<>
			<ActivityDetector activityEvents={this.customActivityEvents} enabled={true} timeout={10*1000} onIdle={this.onIdle} onActive={this.onActive}/>
			{this.props.children}
		</>
		);
	}
}

