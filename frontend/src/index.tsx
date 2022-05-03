import { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Home } from './home/Home';
import { Profile } from './menu/profile/Profile';
import { Friends } from './menu/friends/Friends';
import { Settings } from './menu/settings/Settings';
import { History } from './menu/match_history/History';
import { Achievement } from './menu/achievement/Achievement';
import { StatusDetector } from './components/StatusDetector'
import { PrivateRoute } from './components/PrivateRoute';
import { NotFound } from './menu/NotFound';
import { UserInit } from './userinit/UserInit';
import { Twofa } from './2FA';
import { Frame } from './menu/Frame'
import { Chat } from './home/ChatPannel/Chat'
import { UserInfo } from './home/ChatPannel/UserInfo'
import { ChanInfo } from './home/ChatPannel/ChanInfo'
import { ChanEdit } from './home/ChatPannel/ChanEdit'
import { ChanAddUser } from './home/ChatPannel/ChanAddUser'
import { UserAPI } from './api/Users.api';

// FONTS

import './asset/fonts/Arcade.woff';
import './asset/fonts/Backto1982.woff';
import './asset/fonts/Bit5x3.woff';
import './asset/fonts/Bit5x5.woff';
import './asset/fonts/Bit9x9.woff';
import './asset/fonts/lemon.woff';
import './asset/fonts/ManaspaceReg.woff';

const rootElement = document.getElementById("root");

const WrapperChat = (props) => {
  const params = useParams();
  return <Chat {...{...props, params} } /> 
}

const WrapperChanInfo = (props) => {
  const params = useParams();
  return <ChanInfo {...{...props, params} } /> 
}

const WrapperUserInfo = (props) => {
  const params = useParams();
  return <UserInfo {...{...props, params} } /> 
}

const WrapperChanEdit = (props) => {
  const params = useParams();
  return <ChanEdit {...{...props, params} } /> 
}

const WrapperChanAddUser = (props) => {
  const params = useParams();
  return <ChanAddUser {...{...props, params} } /> 
}

type ProtectedRouteProps = {}

interface ProtectedRouteState {
  logged: boolean
}

class ProtectedRoute extends Component<ProtectedRouteProps, ProtectedRouteState>
{
  constructor(props: ProtectedRouteProps) {
    super(props);
    this.state = {
      logged: false
    }
    this.fetch();
  }
  
  async fetch()
  {
    const usr = await UserAPI.getUser();
    if (usr)
      this.setState({
        logged: usr.firstLog
      })
  }

  render()
  {
    if (!this.state.logged)
			  return (<UserInit/>)

    return (<Home/>)
  }
}

ReactDOM.render(
  <StatusDetector>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
            <Route element={<PrivateRoute/>}>
              <Route element={<Frame/>}>
                <Route path="profile" element={<Profile/>} />
                <Route path="friends" element={<Friends/>} />
                <Route path="settings" element={<Settings/>} />
                <Route path="history" element={<History/>} />
                <Route path="achievement" element={<Achievement/>} />
              </Route>

            <Route path="home" element={<Home />} >
              <Route path="chat/:name/info" element={<WrapperChanInfo/>} />
              <Route path="user/:name/info" element={<WrapperUserInfo/>} />
              <Route path="chat/:name/edit" element={<WrapperChanEdit/>} />
              <Route path="chat/:name/add" element={<WrapperChanAddUser/>} />
              <Route path="chat/:name" element={<WrapperChat isPrivateMessage={false}/>} />
              <Route path="message/:name" element={<WrapperChat isPrivateMessage={true}/>} />
            </Route>

            
            <Route path="init" element={<ProtectedRoute/>} />
			      <Route path="2fa" element={<Twofa/>} />
            <Route path="*" element={<NotFound/>} />
          </Route>

        </Routes>
    </BrowserRouter>
  </StatusDetector>
,
  rootElement
);