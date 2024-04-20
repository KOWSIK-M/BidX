import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home';
import Login from './login';
import SLogin from './slogin';
import Info from './about';
import Contact from './contact';
import PP from './pp';
import TC from './tc';
import Mh1 from './mh1';
import FP from './fp';
import App1 from './ap1';
import Profile from './profile';
import SMyProfile from './sprofile';
import Mhn1 from './mhn1';
import SMhn1 from './smhn1';
import Bidpage from './bp';
import MyBid from './myBid';
import CRBid from './crBid';
import Trend from './trend';

function Website() {
  const [color, changeColor] = useState("#181818");

  return (
    <BrowserRouter>
      <div style={{ background: color }}>
        <Routes>
          <Route
            path="/"
            element={
              <Home changeColor={changeColor} />
            }
          />
          <Route path="/login" element={<Login changeColor={changeColor} />} />
          <Route path="/slogin" element={<SLogin changeColor={changeColor} />} />
          <Route path="/about" element={<Info changeColor={changeColor} />} />
          <Route path="/contact" element={<Contact changeColor={changeColor} />} />
          <Route path="/pp" element={<PP changeColor={changeColor} />} />
          <Route path="/tc" element={<TC changeColor={changeColor} />} />
          <Route path="/mh1" element={<Mh1 changeColor={changeColor} />} />
          <Route path="/fp" element={<FP changeColor={changeColor} />} />
          <Route path="/ap1" element={<App1 changeColor={changeColor} />} />
          <Route path="/profile" element={<Profile changeColor={changeColor} />} />
          <Route path="/sprofile" element={<SMyProfile changeColor={changeColor} />} />
          <Route path="/mhn1" element={<Mhn1 changeColor={changeColor} />} />
          <Route path="/smhn1" element={<SMhn1 changeColor={changeColor} />} />
          <Route path="/myBid" element={<MyBid changeColor={changeColor} />} />
          <Route path="/crBid" element={<CRBid changeColor={changeColor} />} />
          <Route path="/trend" element={<Trend changeColor={changeColor} />} />
          <Route path="/bidpage" element={<Bidpage changeColor={changeColor} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<Website />, document.getElementById('root'));
