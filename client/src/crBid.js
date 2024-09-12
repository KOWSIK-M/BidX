import React from "react";
import './smhn1.css';
import './crBid.css';
import SellerNav from "./components/SellerNav";
import Header from "./components/Header";
import { callApi, errorResponse, setSession, getSession } from './main';

const HS4 = {"float": "right", "paddingRight": "10px", "justifyContent": "right", "marginTop": "7px", "fontSize": "14px"};
const HS5 = {"float": "right", "height": "28px", "width": "28px", "borderRadius": "50%", "marginRight": "10px", "marginTop": "3px"};

export function createBid() {
    var CT0 = getSession("sid");
    var CT1 = document.getElementById('CT1');
    var CT2 = document.getElementById('CT2');
    var CT3 = document.getElementById('CT3');
    var CT4 = document.getElementById('CT4');
    var CT5 = document.getElementById('CT5');
    var FU = document.getElementById('FU');
    
    CT1.style.border = "";
    CT2.style.border = "";
    CT3.style.border = "";
    CT4.style.border = "";
    CT5.style.border = "";
    
    if (!CT1.value) {
        CT1.style.border = "1px solid red";
        CT1.focus();
        return;
    }
    if (!CT2.value) {
        CT2.style.border = "1px solid red";
        CT2.focus();
        return;
    }
    if (!CT3.value) {
        CT3.style.border = "1px solid red";
        CT3.focus();
        return;
    }
    if (!CT4.value) {
        CT4.style.border = "1px solid red";
        CT4.focus();
        return;
    }
    if (!CT5.value) {
        CT5.style.border = "1px solid red";
        CT5.focus();
        return;
    }
    if (!FU.files[0]) {
        FU.style.border = "1px solid red";
        FU.focus();
        return;
    }

    // Convert the image to a blob and include it in the request payload
    const reader = new FileReader();
    reader.readAsDataURL(FU.files[0]);
    reader.onloadend = function() {
        var base64Image = reader.result.split(',')[1]; // Remove the "data:image/jpeg;base64," prefix

        var url = "http://localhost:5000/createBid";
        var data = JSON.stringify({
            username: CT0,
            Pproduct: CT1.value,
            Prprice: CT2.value,
            Pdate: CT3.value,
            Ptime: CT4.value,
            Pdes: CT5.value,
            Pimg: base64Image  // Store image as base64
        });
        callApi("POST", url, data, uploadSuccess, errorResponse);
    };
}

export function uploadSuccess(res) {
    var data = JSON.parse(res);
    alert(data);
}

class CRBid extends React.Component {
    constructor({ changeColor }) {
        super();
        this.sid = getSession("sid");
        if (this.sid === "")
            window.location.replace("/BidX");
        this.state = {
            file: null
        };
        
        var url = "http://localhost:5000/home/uname";
        var data = JSON.stringify({
            username: this.sid
        });
        callApi("POST", url, data, this.loadUname, errorResponse);
    }
    
    loadUname(res) {
        var data = JSON.parse(res);
        var HL1 = document.getElementById("HL1");
        var IM1 = document.getElementById('IM1');
        
        HL1.innerText = `${data[0].username}`;
        IM1.src = `data:image/jpeg;base64,${data[0].imgurl}`;  // Assuming imgurl is base64 encoded
    }

    componentDidMount() {
        const { changeColor } = this.props;
        changeColor("#ffffff");
    }

    logout() {
        setSession("sid", "", -1);
        window.location.replace("/BidX");
    }

    topProf() {
        window.location.replace("/sprofile");
    }
    

    render() {
        return (
            <div style={{ flexDirection: "row", display: "flex" }}>
                <div>
                    <div className="whole" style={{ border: "1px solid #000000", width: "240px", height: "740px" }}>
                        <SellerNav onLogout={this.logout} />
                    </div>
                </div>
                <div className="outletcrBid">
                    <div className="sheaderB" onClick={this.topProf}>
                        <Header></Header>
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
                        <label className="cLab">Add a picture of the Bidding Product: </label>
                        <br></br>
                        <input type="file" id="FU" accept='image/jpeg' className="cBip"></input>
                        <br></br>
                        <button onClick={createBid} className="cBut">Create Bid</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default CRBid;
