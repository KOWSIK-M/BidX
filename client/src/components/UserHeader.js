// src/components/UserHeader.js
import React from 'react';

const UserHeader = ({ user, onTopProfileClick }) => (
  <div className="sheaderB" onClick={onTopProfileClick}>
    <label id="HL1" style={{ float: "right", paddingRight: "10px", justifyContent: "right", marginTop: "7px", fontSize: "14px" }}>
      {user.username}
    </label>
    <img id="IM1" src={`./images/photo/${user.imgurl}`} alt="" style={{ float: "right", height: "28px", width: "28px", borderRadius: "50%", marginRight: "10px", marginTop: "3px" }} className="imgstyle" />
  </div>
);

export default UserHeader;
