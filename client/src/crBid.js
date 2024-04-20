import React from "react";
import { useEffect } from "react";
import './smhn1.css';
import './crBid.css'

import { callApi,callApiFileUpload, errorResponse, setSession, getSession } from './main';

const HS4 = {"float" : "right", "padding-right" : "10px", "justify-content":"right","margin-top":"7px","font-size":"14px"}
const HS5 = {"float" : "right", "height":"28px", "width":"28px", "border-radius":"50%" , "margin-right":"10px","margin-top":"3px"}

export function createBid(){
    var CT0 = getSession("sid");
    var CT1 = document.getElementById('CT1');
    var CT2 = document.getElementById('CT2');
    var CT3 = document.getElementById('CT3');
    var CT4 = document.getElementById('CT4');
    var CT5 = document.getElementById('CT5');
        
        CT1.style.border="";
        CT2.style.border="";
        CT3.style.border="";
        CT4.style.border="";
        CT5.style.border="";
        if(CT1.value==="")
        {
            CT1.style.border = "1px solid red";
            CT1.focus();
            return;
        }
        if(CT2.value==="")
        {
            CT2.style.border = "1px solid red";
            CT2.focus();
            return;
        }
        if(CT3.value==="")
        {
            CT3.style.border = "1px solid red";
            CT3.focus();
            return;
        }
        if(CT4.value==="")
        {
            CT4.style.border = "1px solid red";
            CT4.focus();
            return;
        }
        if(CT5.value==="")
        {
            CT5.style.border = "1px solid red";
            CT5.focus();
            return;
        }

    var url = "http://localhost:5000/createBid";
    var data = JSON.stringify({
        username : CT0,
        Pproduct : CT1.value,
        Prprice : CT2.value,
        Pdate : CT3.value,
        Ptime : CT4.value,
        Pdes : CT5.value,
        Pimgurl:""
    });
    callApi("POST", url, data, uploadSuccess, errorResponse);
    
}
export function uploadSuccess(res) {
    var data = JSON.parse(res);
    alert(data);
}

export function uploadBid() {
    var FU = document.getElementById('FU');

    var CT1 = document.getElementById('CT1').value; // Retrieving the value of CT1
    
    var url = "http://localhost:5000/uploadBid";
    var data = new FormData();
    data.append("fname", getSession('sid'));
    data.append("pname",CT1);
    data.append("myfile", FU.files[0]);
    callApiFileUpload("POST", url, data, uploadBidSuccess, errorResponse);

}

export function uploadBidSuccess(res) {
    var data = JSON.parse(res);
    alert(data);
}
class CRBid extends React.Component {
    constructor({ changeColor }) {
        super();
        this.sid = getSession("sid");
        if (this.sid === "")
            window.location.replace("/");
        this.state = {
            file: null
        };
        
        var url = "http://localhost:5000/home/uname";
        var data = JSON.stringify({
            username : this.sid
        });
        callApi("POST", url, data, this.loadUname, errorResponse);
    }
    loadUname(res)
    {
        var data = JSON.parse(res);
        var HL1 = document.getElementById("HL1");
        var IM1 = document.getElementById('IM1');
        
        HL1.innerText = `${data[0].username}`;
        IM1.src = require('../public/images/photo/' + data[0].imgurl);
    }
    componentDidMount() {
        const { changeColor } = this.props;
        changeColor("#ffffff");
    }

    logout() {
        setSession("sid", "", -1);
        window.location.replace("/");
    }
    topProf(){
        window.location.replace("/sprofile");
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
                        <a class="nav-link" href="#">
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
        <div className="outletcrBid">
        <div className="sheaderB" onClick={this.topProf}>
            <label id='HL1' style={HS4}></label>
                    <img id='IM1' src='' alt='' style={HS5} className='imgstyle' />
        </div>
        <h1>Start Your Own Bidding</h1>

        <div id="creationBid">
            <label className="cLab">Name of the Product : </label>
            <input type="text" id="CT1" className="cBip"></input>
            <br></br>
            <label className="cLab">Price : </label>
            <input type="text" id="CT2" className="cBip"></input>
            <br></br>
            <label className="cLab">Bid Ending Date : </label>
            <input type="date" id="CT3" className="cBip"></input>
            <label className="cLab">Bid Ending Time : </label>
            <input type="time" id="CT4" className="cBip"></input>
            <br></br>
            <label className="cLab">Enter Description : </label>
            <input type="text" id="CT5" className="cBip"></input>
            <br></br>
            <button onClick={createBid} className="cBut">Create Bid</button>
            <br></br>
            <br></br>
            <label className="cLab">Add a picture of the the Bidding Product: </label>
            <br></br>
            <input type="file" id="FU" accept='image/jpeg' className="cBip"></input>
            <br></br>
            <button onClick={uploadBid} className="cBut">Add Image</button>
        </div>
    </div>
    </div>
    );
}}
export default CRBid;