// src/components/ProfileDetails.js
import React from 'react';

const ProfileDetails = ({ profileData, onPhotoUpload, onPhotoDownload }) => (
  <div className="profile-details">
    <h3>User Profile</h3>
    <table className='tablestyle'>
      <tbody>
        <tr>
          <td className='firstcolumn'>FullName</td>
          <td><label id='L1'><b style={{ color: 'red' }}>{profileData.fullname}</b></label></td>
        </tr>
        <tr>
          <td className='firstcolumn'>Date of Birth</td>
          <td><label id='L2'>{profileData.dob}</label></td>
        </tr>
        <tr>
          <td className='firstcolumn'>Contact No.</td>
          <td><label id='L3'>{profileData.mobileno}</label></td>
        </tr>
        <tr>
          <td className='firstcolumn'>Email Id</td>
          <td><label id='L4'>{profileData.email}</label></td>
        </tr>
        <tr>
          <td className='firstcolumn'>Upload Photo</td>
          <td><input type='file' id='FU' accept='image/jpeg' onChange={onPhotoUpload} /></td>
        </tr>
        <tr>
          <td className='firstcolumn'></td>
          <td><img id='IM1' src={profileData.imgurl} alt='Profile' className='imgstyle' /></td>
        </tr>
        <tr>
          <td className='firstcolumn'>Download Photo</td>
          <td><button onClick={onPhotoDownload}>Download</button></td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default ProfileDetails;
