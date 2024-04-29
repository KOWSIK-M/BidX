import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { errorResponse,setSession,callApi } from "./main";
import Axios from 'axios';
import './mbid.css';
const HS4 = {"float" : "right", "padding-right" : "10px", "justify-content":"right","margin-top":"7px","font-size":"14px"}
const HS5 = {"float" : "right", "height":"28px", "width":"28px", "border-radius":"50%" , "margin-right":"10px","margin-top":"3px"}

function MBid({ changeColor }) {
    changeColor("#fff");
  const { productName1 } = useParams();
  const [participants, setParticipants] = useState([]); // State to store participants data

  useEffect(() => {
    fetchParticipants();
  }, []);
  const loadUname = (res) => {
    const userData = JSON.parse(res);
    const HL1 = document.getElementById("HL1");
    const IM1 = document.getElementById('IM1');
    HL1.innerText = userData[0].username;
    IM1.src = require(`../public/images/photo/${userData[0].imgurl}`);

    const data = JSON.stringify({ userData });
    res = callApi("POST", "http://localhost:5000/home/uname", data, loadUname, errorResponse);
}
  const fetchParticipants = () => {
    const url = "http://localhost:5000/home/participants";
    Axios.post(url, { Pproduct: productName1 })
      .then(res => {
        setParticipants(res.data);
      })
      .catch(err => errorResponse(err));
  };
  const logout = () => {
    setSession("sid", "", -1);
    window.location.replace("/BidX");
};

const topProf = () => {
    window.location.replace("/BidX/sprofile");
};
  return (
    <div style={{ flexDirection:"row", display:"flex" }}>
            <div>
            <div class="whole" style={{ border:"1px solid #000000" , width:"240px",height:"740px"}}>
    
    <nav class="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg" id="navbarVertical" style={{ flexDirection:"column"}}>
        <div class="container-fluid" style={{ flexDirection:"column", marginLeft:"0px"}}>
            
            <button class="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <a class="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" href="#">
                <a href="/BidX" class="alogo">BidX</a>
            </a>
            
            
            <div class="collapse navbar-collapse" id="sidebarCollapse" style={{ flexDirection:"column"}}>
                
                <ul class="navbar-nav" style={{ flexDirection:"column"}}>
                    <li class="nav-item" >
                        <a class="nav-link" href="/BidX/smhn1" style={{ color:"black"}}>
                            <i class="bi bi-house"></i> Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/BidX/trend">
                            <i class="bi bi-bar-chart"></i> Trending
                        </a>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link" href="/BidX/scollections">
                            <i class="bi bi-bookmarks"></i> Collections
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/BidX/crBid">
                            <i class="bi bi-people"></i> Create a Bid
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/BidX/myBid">
                            <i class="bi bi-box"></i> My Bids
                        </a>
                    </li>
                </ul>
                
                <hr class="navbar-divider my-5 opacity-20"/>
                
                <ul class="navbar-nav"  style={{ flexDirection:"column"}}>
                    <li class="nav-item">
                        <a class="nav-link" href="/BidX/sprofile">
                            <i class="bi bi-person-square"></i> Profile
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" onClick={logout}>
                            <i class="bi bi-box-arrow-left"></i> Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    </div>
            </div>
            <div className="outlet">
                <div className="sheaderB" onClick={topProf}>
                    <label id="HL1" style={HS4}></label>
                    <img id="IM1" src="" alt="" style={HS5} className="imgstyle" />
                </div>
                <div className="participant-table-container" style={{"color":"black"}}>
    <h1>Participant List</h1> {/* Container for styling */}
  <table className="participant-table"> {/* Table element */}
    <thead>
      <tr>
        <th>Username</th>
        <th>Bid Amount</th>
      </tr>
    </thead>
    <tbody>
      {participants.map((participant, index) => (
        <tr key={index}>
          <td>{participant.username}</td>
          <td>{participant.bidamt}</td>
        </tr>
      ))}
    </tbody>
  </table>
  <br></br>
  <br></br>
  <br></br>
</div>
<p style={{"color":"red","marginLeft":"300px"}}>*The first Participant will be declared as winner by the end of the Auction*</p>
            </div>
        </div>
  );
}

export default MBid;
