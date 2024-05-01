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
import FP from './fp';
import App1 from './ap1';
import SMyProfile from './sprofile';
import UMyProfile from './uprofile';
import Mhn1 from './mhn1';
import SMhn1 from './smhn1';
import Bidpage from './bp';
import MyBid from './myBid';
import CRBid from './crBid';
import Trend from './trend';
import UTrend from './utrend';
import SCollections from './scollections';
import UCollections from './ucollections';
import ProBid from './probid';
import MBid from './mbid';
import MyPart from './mypart';
import ValidatePhoneNo from './validatephoneno';
import Winnings from './winnings';
import Checkout from './checkout';
import PSuccess from './pSuccess';

function Website() {
  const [color, changeColor] = useState("#181818");

  return (
    <BrowserRouter>
      <div style={{ background: color }}>
        <Routes basename="/BidX">
          <Route
            path="/BidX"
            element={
              <Home changeColor={changeColor} />
            }
          />
          <Route path="BidX/login" element={<Login changeColor={changeColor} />} />
          <Route path="BidX/slogin" element={<SLogin changeColor={changeColor} />} />
          <Route path="BidX/about" element={<Info changeColor={changeColor} />} />
          <Route path="BidX/contact" element={<Contact changeColor={changeColor} />} />
          <Route path="BidX/pp" element={<PP changeColor={changeColor} />} />
          <Route path="BidX/tc" element={<TC changeColor={changeColor} />} />
          <Route path="BidX/fp" element={<FP changeColor={changeColor} />} />
          <Route path="BidX/ap1" element={<App1 changeColor={changeColor} />} />
          <Route path="BidX/sprofile" element={<SMyProfile changeColor={changeColor} />} />
          <Route path="BidX/uprofile" element={<UMyProfile changeColor={changeColor} />} />
          <Route path="BidX/mhn1" element={<Mhn1 changeColor={changeColor} />} />
          <Route path="BidX/smhn1" element={<SMhn1 changeColor={changeColor} />} />

          <Route path="/BidX/probid/:productName" component={ProBid} element={<ProBid changeColor={changeColor} />} />
          <Route path="/BidX/mbid/:productName1" component={MBid} element={<MBid changeColor={changeColor} />} />

          <Route path="BidX/myBid" element={<MyBid changeColor={changeColor} />} />
          <Route path="BidX/mypart" element={<MyPart changeColor={changeColor} />} />
          <Route path="BidX/crBid" element={<CRBid changeColor={changeColor} />} />
          <Route path="BidX/trend" element={<Trend changeColor={changeColor} />} />
          <Route path="BidX/utrend" element={<UTrend changeColor={changeColor} />} />
          <Route path="BidX/bidpage" element={<Bidpage changeColor={changeColor} />} />
          <Route path="BidX/scollections" element={<SCollections changeColor={changeColor} />} />
          <Route path="BidX/ucollections" element={<UCollections changeColor={changeColor} />} />
          <Route path="BidX/probid" element={<ProBid changeColor={changeColor} />} />
          <Route path="BidX/validatephoneno" element={<ValidatePhoneNo changeColor={changeColor} />} />
          <Route path="BidX/winnings" element={<Winnings changeColor={changeColor} />} />
          <Route path="BidX/checkout" element={<Checkout changeColor={changeColor} />} />
          <Route path="BidX/pSuccess" element={<PSuccess changeColor={changeColor} />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<Website />, document.getElementById('root'));
