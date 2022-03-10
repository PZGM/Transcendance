import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './home/Home';
import { Profile } from './menu/profile/Profile';
import { Friends } from './menu/friends/Friends';
import { Settings } from './menu/settings/Settings';
import { History } from './menu/match_history/History';
import { Achievement } from './menu/achievement/Achievement';
import { StatusDetector } from './components/StatusDetector'
import { NotFound } from './menu/NotFound';
import { Twofa } from './twofa';
import { UserAPI } from './api/Users.api';

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StatusDetector>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          {/* <Route path="profile" element={<Profil />} /> */}
          <Route path="home" element={<Home />} />
          <Route path="profile" element={<Profile/>} />
          <Route path="friends" element={<Friends/>} />
          <Route path="settings" element={<Settings/>} />
          <Route path="history" element={<History/>} />
          <Route path="2fa" element={<Twofa/>} />
          <Route path="achievement" element={<Achievement/>} />
          <Route path="*" element={<NotFound/>} />

          {/* <Route path="invoices" element={<Invoices />} /> */}
        </Routes>
    </BrowserRouter>
  </StatusDetector>
,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
