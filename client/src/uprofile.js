import React, { useState, useEffect } from "react";
import './profile.css';
import {errorResponse, setSession, getSession } from './main';
import Navbar from "./components/NavBar";

function fetchProfileInfo(username) {
    return fetch('http://localhost:5000/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    })
    .then(response => response.json())
    .catch(err => errorResponse(err));
}

function uploadPhoto(file, username) {
    const formData = new FormData();
    formData.append("fname", username);
    formData.append("myfile", file);

    return fetch('http://localhost:5000/uploaddp', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .catch(err => errorResponse(err));
}

const UMyProfile = ({changeColor}) => {
    changeColor("#fff");
    const [profileData, setProfileData] = useState({});
    const [profileImage, setProfileImage] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const username = getSession("sid");

    useEffect(() => {
        if (!username) {
            window.location.replace("/BidX");
            return;
        }
        
        fetchProfileInfo(username).then(data => {
            setProfileData(data[0]);
            if (data[0]?.imgurl) {
                setProfileImage(`data:image/jpeg;base64,${data[0].imgurl}`);
            }
        });
    }, [username]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    const handleUploadPhoto = () => {
        if (!imageFile) {
            alert("No file selected");
            return;
        }
        uploadPhoto(imageFile, username).then(res => {
            if (res.message === "File uploaded successfully...") {
                fetchProfileInfo(username).then(data => {
                    setProfileData(data[0]);
                    if (data[0]?.imgurl) {
                        setProfileImage(`data:image/jpeg;base64,${data[0].imgurl}`);
                    }
                });
            } else {
                alert(res.message);
            }
        });
    };

    const handleDownloadPhoto = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = profileImage;
        downloadLink.download = 'profile_image.jpg';
        downloadLink.click();
    };

    const logout = () => {
        setSession("sid", "", -1);
        window.location.replace("/BidX");
    };

    return (
        <div style={{ flexDirection: "row", display: "flex" }}>
            <div>
                <div className="whole" style={{ border: "1px solid #000000", width: "240px", height: "740px" }}>
                    <Navbar onLogout={logout}></Navbar>
                </div>
            </div>
            <div className="outletprofile">
                <h3>User Profile</h3>
                <table className='tablestyle'>
                    <tbody>
                        <tr>
                            <td className='firstcolumn'>FullName</td>
                            <td><label>{profileData.fullname}</label></td>
                        </tr>
                        <tr>
                            <td className='firstcolumn'>Date of Birth</td>
                            <td><label>{profileData.dob}</label></td>
                        </tr>
                        <tr>
                            <td className='firstcolumn'>Contact No.</td>
                            <td><label>{profileData.mobileno}</label></td>
                        </tr>
                        <tr>
                            <td className='firstcolumn'>Email Id</td>
                            <td><label>{profileData.email}</label></td>
                        </tr>
                        <tr>
                            <td className='firstcolumn'>Upload Photo</td>
                            <td><input type='file' accept='image/jpeg' onChange={handleFileChange} /></td>
                            <button onClick={handleUploadPhoto}>Upload Photo</button>
                        </tr>
                        <tr>
                            <td className='firstcolumn'></td>
                            <td><img src={profileImage} alt='Profile' className='imgstyle' /></td>
                        </tr>
                        <tr>
                            <td className='firstcolumn'>Download Photo</td>
                            <td><button onClick={handleDownloadPhoto}>Download</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UMyProfile;
