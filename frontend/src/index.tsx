import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Profil from './components/Accueil';
import { Home } from './components/Home';
import { Menu } from './components/Menu';
import { Profile } from './menu/profile/Profile';
import { Friends } from './menu/friends/Friends';
import { Settings } from './menu/settings/Settings';
import { History } from './menu/match_history/History';
import { Achievement } from './menu/achievement/Achievement';
import { StatusDetector } from './components/StatusDetector'

import './asset/fonts/arcade.ttf';
import './asset/fonts/backto1982.ttf';
import './asset/fonts/bit5x3.ttf';
import './asset/fonts/bit5x5.ttf';
import './asset/fonts/bit9x9.ttf';
import './asset/fonts/manaspc.ttf';

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
          <Route path="achievement" element={<Achievement/>} />
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
