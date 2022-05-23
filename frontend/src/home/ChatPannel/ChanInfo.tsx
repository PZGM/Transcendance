import { Stack, List, BackdropProps } from "@mui/material";
import { Component, useEffect, useState} from "react";
import { Link, Navigate, useOutletContext } from "react-router-dom";
import { UserAPI } from "../../api/Users.api";
import ChanInfoMember from "./ChanInfoMember";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import { UserDto } from "../../api/dto/user.dto";
import { ChannelDto } from "../../api/dto/channel.dto";
import { ChatAPI } from "../../api/Chat.api";
import { ThirtyFpsSharp } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import { GameSocketAPI } from "../../api/GameSocket.api";

interface ChanInfoProps {
	params: any
};

function ChanInfo(props: ChanInfoProps) {
	
	let index: number = 0;

	// State
	const [channel, setChannel] = useState<ChannelDto | undefined>(undefined);
	const [friends, setFriends] = useState<any>([]);
	const [redirect, setRedirect] = useState<string>('');
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const [user, setUser] = useState<UserDto | null>(null);
	const [gameSocket, setGameSocket] = useState<GameSocketAPI>(useOutletContext());

	useEffect (() => {

		const stateInit = async () => {
			const name = props.params.name;

			const tmp_channel = await ChatAPI.getChannelByName(name, {withAdmin: true, withOwner: true});
			const tmp_friends = await UserAPI.getFriends();
			const tmp_user = await UserAPI.getUser();

			if (!tmp_user || !tmp_channel)
				return;

			setChannel(tmp_channel)
			setFriends(await UserAPI.getFriends())
			setUser(tmp_user)
			setIsAdmin(tmp_channel.admin.some((admin) => {return admin.id == tmp_user.id}))
		}

		stateInit()
		.catch(console.error)
	}, [])

	const renderRowsUsers = (list) => {
		list = list.sort((a: UserDto, b: UserDto) => {
			if (channel?.owner?.id == a.id)
				return -1;
			if (channel?.owner?.id == b.id)
				return 1;
			if (channel?.admin.some((admin) => {return admin.id == a.id}))
				return -1;
			if (channel?.admin.some((admin) => {return admin.id == b.id}))
				return 1;
			return 0;
		})
		
		const listItems = list?.map((member: UserDto) => {
			const isFriend = friends.some((friend) => {return friend.id == member.id});
			const isMe = user?.id == member.id;
			let grade = channel?.admin.some((admin) => {return admin.id == member.id}) ? 'admin' : '';
			if (channel?.owner && channel?.owner.id == member.id)
				grade = 'owner';
			return (
				<ChanInfoMember isMe={isMe}
								key={index}
								index={index++}
								member={member}
								grade={grade}
								isFriend={isFriend}
								gameSocket={gameSocket}
				/>
			)
		});
		
		return listItems;
	}

	const leave = async () => {
		if (channel)
			ChatAPI.leaveChannel(channel.id)
		setRedirect('/home/chat/general')
	}

		if (!channel)
			return <div style={{color: 'white'}}>Loading...</div>
		return (
			<>
			    { redirect ? (<Navigate to={redirect} />) : null }
				<Stack direction="row" justifyContent="space-between">
					<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
						<Link 	style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + channel.name  }}>
							<ArrowBackIcon/>
						</Link>
					</Stack>
					{ (isAdmin) && <Stack direction="column" justifyContent="center" alignItems="flex-end" spacing={0}>
									<Link 	style={{ textDecoration: 'none', color: 'white' }} to={{pathname: process.env.REACT_APP_HOME_CHAN + "/" + channel.name + "/edit" }}>
										<EditIcon/>
									</Link>
								</Stack>}
				</Stack>
				<Stack direction="row" justifyContent="center" alignItems="center" spacing={0}>
							<div className="bit9x9" style={{color: "white", fontSize: "2.5vw"}}>{channel.name}</div>
				</Stack>
				<Stack direction="column" justifyContent="center" alignItems="flex-start" spacing={0}>
					<div className="bit5x5" style={{color: "white"}}>USERS :</div>
					<Stack direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={0} height={'80vh'}>
						<li>
							{renderRowsUsers(channel.users)}
						</li>
					</Stack>
				</Stack>

				<Stack justifyContent="center" alignItems="center" sx={{marginTop: "0.5vh" }}>
					{(channel.name !== "general")?
					<div onClick={leave} className="add_user_button but_red" >
						<div className='bit5x5'>Leave</div>
					</div>
					:
					<div className="add_user_button but_grey" >
						<div className='bit5x5'>Leave</div>
					</div>
					}
				</Stack>
			</>

		)
}

export default ChanInfo;