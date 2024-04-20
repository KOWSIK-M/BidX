import React from "react";
import './profile.css';
import { callApi,callApiFileUpload, errorResponse, setSession, getSession } from './main';
import Axios from 'axios';

export function profileInfo() {
    var url = "http://localhost:5000/profile";
    Axios.post(url, {username : getSession("sid")})
        .then(res => loadInfo(res))
        .catch(err => errorResponse(err));
}

export function loadInfo(res) {
    var data = res.data;
    var L1 = document.getElementById('L1');
    var L2 = document.getElementById('L2');
    var L3 = document.getElementById('L3');
    var L4 = document.getElementById('L4');
    var IM1 = document.getElementById('IM1');

    L1.innerHTML = `<b style='color:red'>${data[0].fullname}</b>`;
    L2.innerText = data[0].dob;
    L3.innerText = data[0].mobileno;
    L4.innerText = data[0].email;
    IM1.src = require('../public/images/photo/' + data[0].imgurl);
}

export function uploadPhoto() {
    var FU = document.getElementById('FU');

    var url = "http://localhost:5000/uploaddp";
    var data = new FormData();
    data.append("fname", getSession("sid"));
    data.append("myfile", FU.files[0]);
    callApiFileUpload("POST", url, data, uploadSuccess, errorResponse);
}

export function uploadSuccess(res) {
    var data = JSON.parse(res);
    alert(data);
}

export function downloadPhoto() {
    var imageUrl = document.getElementById('IM1').src;
    var downloadLink = document.createElement('a');
    downloadLink.href = imageUrl;
    downloadLink.download = 'profile_image';
    downloadLink.click();
}
class SMyProfile extends React.Component {
    constructor({changeColor}) {
        super();
        this.sid = getSession("sid");
        if (this.sid === "")
            window.location.replace("/");
        profileInfo();
    }
    componentDidMount(){
        const { changeColor } = this.props;
        changeColor("#ffffff");
    }
    logout() {
        setSession("sid", "", -1);
        window.location.replace("/");
    }
    render(){
    return(
        <div style={{flexDirection:"row" , display:"flex"}}>
        <div>


<div class="whole" style={{ border:"1px solid #000000" , width:"240px",height:"740px"}}>
    
    <nav class="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg" id="navbarVertical" style={{ flexDirection:"column"}}>
        <div class="container-fluid" style={{ flexDirection:"column", marginLeft:"0px"}}>
            
            <button class="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <a class="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" href="#">
                <img src="https://preview.webpixels.io/web/img/logos/clever-primary.svg" alt="..."/>
            </a>
            
            <div class="navbar-user d-lg-none" style={{ flexDirection:"column", marginLeft:"0px;"}}>
                
                <div class="dropdown">
                    
                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="sidebarAvatar">
                        <a href="#" class="dropdown-item">Profile</a>
                        <a href="#" class="dropdown-item">Settings</a>
                        <a href="#" class="dropdown-item">Billing</a>
                        <hr class="dropdown-divider"/>
                        <a href="#" class="dropdown-item">Logout</a>
                    </div>
                </div>
            </div>
            
            <div class="collapse navbar-collapse" id="sidebarCollapse" style={{ flexDirection:"column"}}>
                
                <ul class="navbar-nav" style={{ flexDirection:"column"}}>
                    <li class="nav-item" >
                        <a class="nav-link" href="/smhn1" style={{ color:"black"}}>
                            <i class="bi bi-house"></i> Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="bi bi-bar-chart"></i> Trending
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="bi bi-chat"></i> Messages
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="bi bi-bookmarks"></i> Collections
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/crBid">
                            <i class="bi bi-people"></i> Create a Bid
                        </a>
                    </li>
                </ul>
                
                <hr class="navbar-divider my-5 opacity-20"/>
                
                <ul class="navbar-nav"  style={{ flexDirection:"column"}}>
                    <li class="nav-item">
                        <a class="nav-link" href="/sprofile">
                            <i class="bi bi-person-square"></i> Profile
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" onClick={this.logout}>
                            <i class="bi bi-box-arrow-left"></i> Logout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    
</div>

        </div>
        <div className="outletprofile">
                <h3>User Profile</h3>
                <table className='tablestyle'>
                    <tr>
                        <td className='firstcolumn' >FullName</td>
                        <td><label id='L1'></label></td>
                    </tr>
                    <tr>
                        <td className='firstcolumn' >Date of Birth</td>
                        <td><label id='L2'></label></td>
                    </tr>
                    <tr>
                        <td className='firstcolumn' >Contact No.</td>
                        <td><label id='L3'></label></td>
                    </tr>
                    <tr>
                        <td className='firstcolumn' >Email Id</td>
                        <td><label id='L4'></label></td>
                    </tr>
                    <tr>
                        <td className='firstcolumn'>Upload Photo</td>
                        <td><input type='file' id='FU' accept='image/jpeg'  onChange={uploadPhoto} /></td>
                    </tr>
                    <tr>
                        <td className='firstcolumn'></td>
                        <td><img id='IM1' src='' alt='' className='imgstyle' /></td>
                    </tr>
                    <tr>
                        <td className='firstcolumn'>Download Photo</td>
                        <td><button onClick={downloadPhoto}>Download</button></td>
                    </tr>
                </table>
    </div>
    </div>
    );
}}
export default SMyProfile;