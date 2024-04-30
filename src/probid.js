import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { callApi, errorResponse, getSession } from "./main";
import Axios from 'axios';
import './proBid.css';

function ProBid ({changeColor}) {
  const { productName } = useParams();
  const [minAMT, setMinAMT] = useState(0); // Initialize minAMT state
  const [productData, setProductData] = useState(null); // State to store product data

  useEffect(() => {
    const fetchMinAmount = async () => {
      try {
        const url = "http://localhost:5000/home/product";
        const res = await Axios.post(url, {Pproduct : productName});
        setProductData(res.data); // Store product data in state
        setMinAMT(res.data[0].Prprice); // Set minAMT from database
      } catch (err) {
        errorResponse(err);
      }
    };

    fetchMinAmount();
  }, [productName]);

  const bidAmt = () => {
    var BA = document.getElementById('BA');
    const username = getSession("sid");
    const bidAmount = parseFloat(BA.value); // Parse the bid amount as float
  
    if (isNaN(bidAmount)) { // Check if entered value is not a number
      BA.style.border = "1px solid red";
      BA.focus();
      return;
    }
  
    if (bidAmount <= parseFloat(productData[0].Prprice)) { // Check if bid amount is not greater than minimum price
      alert("Your bid amount must be greater than the minimum price.");
      BA.style.border = "1px solid red";
      BA.focus();
      return;
    }
  
    var url = "http://localhost:5000/BidAMT";
    var data = JSON.stringify({
      username: username,
      Pproduct: productName,
      bidamt: bidAmount
    });
    callApi("POST", url, data, uploadSuccess, errorResponse);
  };

  function uploadSuccess(res) {
    var data = JSON.parse(res);
    alert(data);
  }

  return(
    <div style={{ flexDirection:"row", display:"flex" }}>
      <div>
        {/* Your sidebar content */}
      </div>
      <div className="outlet">
        <div style={{"color":"black"}}>
          <h2>Bid Now</h2>
          <table className='tablestyle'>
            <tr>
              <td className='firstcolumn' >Product Name:</td>
              <td><label id='L1'>{productData && productData[0].Pproduct}</label></td>
            </tr>
            <tr>
              <td className='firstcolumn' >Price :</td>
              <td><label id='L2'>{productData && productData[0].Prprice}</label></td>
            </tr>
            <tr>
              <td className='firstcolumn' >Description :</td>
              <td><label id='L3'>{productData && productData[0].Pdes}</label></td>
            </tr>
            <tr>
              <td className='firstcolumn' >Email Id</td>
              <td><label id='L4'>{productData && productData[0].Pdate + productData[0].Ptime}</label></td>
            </tr>
            <tr>
              <td className='firstcolumn'></td>
              <td><img id='IM1' src={productData && require('../public/images/bids/' + productData[0].username+'/'+productData[0].Pimgurl)} alt='' className='imgstyle' /></td>
            </tr>
          </table>
          <div>
            <label htmlFor="bid-amount">Your Bid Amount:</label>
            <input type="number" id="BA" min={minAMT} required/>
            <span className="error-message"></span><br></br>
            <button type="submit" onClick={bidAmt}>Place Bid</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProBid;
