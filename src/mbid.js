import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Axios from 'axios';
import './mbid.css';
import { errorResponse, setSession } from "./main";

const HS4 = {"float": "right", "paddingRight": "10px", "justifyContent": "right", "marginTop": "7px", "fontSize": "14px"}
const HS5 = {"float": "right", "height": "28px", "width": "28px", "borderRadius": "50%", "marginRight": "10px", "marginTop": "3px"}

function MBid({ changeColor }) {
  changeColor("#fff");
  const { productName1 } = useParams();
  const [participants, setParticipants] = useState([]); // State to store participants data

  const fetchParticipants = useCallback(() => {
    const url = "http://localhost:5000/home/participants";
    Axios.post(url, { Pproduct: productName1 })
      .then(res => {
        setParticipants(res.data);
      })
      .catch(err => errorResponse(err));
  }, [productName1]);

  useEffect(() => {
    fetchParticipants();
  }, [fetchParticipants]);

  const logout = () => {
    setSession("sid", "", -1);
    window.location.replace("/BidX");
  };

  const topProf = () => {
    window.location.replace("/BidX/sprofile");
  };

  return (
    <div style={{ flexDirection: "row", display: "flex" }}>
      <div>
        <div className="whole" style={{ border: "1px solid #000000", width: "240px", height: "740px" }}>

          <nav className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg" id="navbarVertical" style={{ flexDirection: "column" }}>
            <div className="container-fluid" style={{ flexDirection: "column", marginLeft: "0px" }}>

              <button className="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <a className="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" href="/BidX">
                <a href="/BidX" className="alogo">BidX</a>
              </a>

              <div className="collapse navbar-collapse" id="sidebarCollapse" style={{ flexDirection: "column" }}>

                <ul className="navbar-nav" style={{ flexDirection: "column" }}>
                  <li className="nav-item" >
                    <a className="nav-link" href="/BidX/smhn1" style={{ color: "black" }}>
                      <i className="bi bi-house"></i> Dashboard
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/BidX/trend">
                      <i className="bi bi-bar-chart"></i> Trending
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="/BidX/scollections">
                      <i className="bi bi-bookmarks"></i> Collections
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/BidX/crBid">
                      <i className="bi bi-people"></i> Create a Bid
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/BidX/myBid">
                      <i className="bi bi-box"></i> My Bids
                    </a>
                  </li>
                </ul>

                <hr className="navbar-divider my-5 opacity-20" />

                <ul className="navbar-nav" style={{ flexDirection: "column" }}>
                  <li className="nav-item">
                    <a className="nav-link" href="/BidX/sprofile">
                      <i className="bi bi-person-square"></i> Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={logout} href="/BidX">
                      <i className="bi bi-box-arrow-left"></i> Logout
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
        <div className="participant-table-container" style={{ "color": "black" }}>
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
        <p style={{ "color": "red", "marginLeft": "300px" }}>*The first Participant will be declared as winner by the end of the Auction*</p>
      </div>
    </div>
  );
}

export default MBid;
