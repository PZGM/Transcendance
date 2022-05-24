import { List, Stack } from "@mui/material";
import { Component} from "react";
import { Link } from "react-router-dom";
import { UserAPI } from "../../api/Users.api";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "../../style/input.css"
import { AddUserDisplay } from "./AddUserDisplay";
import { UserDto } from "../../api/dto/user.dto";

interface ChanAddUserState {
    chan?: any;
    searchResults: UserDto[];
	searchField?: string;
}

interface ChanAddUserProps {
    params: any,
};

export class ChanAddUser extends Component<ChanAddUserProps, ChanAddUserState> {
	constructor(props: ChanAddUserProps) {
		super(props);
        this.state = {
            chan: undefined,
            searchResults: [], searchField: undefined
        }
		this.renderSearchRows = this.renderSearchRows.bind(this);
	}


	componentDidMount()  {
        const id = this.props.params.name;
        this.setState({
            chan: id,
        })
	}

	renderSearchRows(list) {
		const listItems = list.map((user: UserDto) =>
			<div key={user.id}>
				<AddUserDisplay user={user} channelId={this.state.chan?.id} />
			</div>
	  );
	  return listItems;
	}
	async onSearch(e: React.ChangeEvent<HTMLInputElement>) {
		e.target.value = e.target.value.replace(/\W/g, "");
		const search = e.target.value;
		this.setState({searchField: search});
		if (!search || search === '')
			return;
		const ret = await UserAPI.searchFriend(search);
		this.setState({searchResults: ret}); 
	}

	render () {

		return (
            <>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<Link style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + this.state.chan + "/edit"}}>
						<ArrowBackIcon/>
					</Link>
				</Stack>
				<Stack justifyContent="center" alignItems="center">
					<input className="friends_search_bar" placeholder="Search Friend" onChange={ async (e) => {this.onSearch(e)}}/>
					<List style={{overflow: 'auto'}}>
						{this.renderSearchRows(this.state.searchResults)}
					</List>
				</Stack>
			</>
		)
	}
}