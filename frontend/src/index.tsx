import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from './home/Home';
import { Profile } from './menu/profile/Profile';
import { Friends } from './menu/friends/Friends';
import { Settings } from './menu/settings/Settings';
import { History } from './menu/match_history/History';
import { Achievement } from './menu/achievement/Achievement';
import { StatusDetector } from './components/StatusDetector'
import { PrivateRoute } from './components/PrivateRoute';
import { NotFound } from './menu/NotFound';
import { Twofa } from './2FA';
import { Frame } from './menu/Frame'

// FONTS

import './asset/fonts/Arcade.woff';
import './asset/fonts/Backto1982.woff';
import './asset/fonts/Bit5x3.woff';
import './asset/fonts/Bit5x5.woff';
import './asset/fonts/Bit9x9.woff';
import './asset/fonts/lemon.woff';
import './asset/fonts/ManaspaceReg.woff';

const rootElement = document.getElementById("root");
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

            <Route path="home" element={<Home />} />
            <Route path="2fa" element={<Twofa/>} />
            <Route path="*" element={<NotFound/>} />
          </Route>

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
