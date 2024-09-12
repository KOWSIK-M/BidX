import React, { useState, useEffect } from 'react';
import './mhn1.css';
import { callApi, errorResponse, setSession, getSession } from './main';
import Product from './components/Product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import NavBar from './components/NavBar';
import Header from './components/Header';

const Mhn1 = ({ changeColor }) => {
  changeColor("#fff");
  const [sid] = useState(getSession("sid"));
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (!sid) {
        window.location.replace("/BidX");
    }
}, [sid]);
useEffect(() => {
    if (sid) {
        const url = "http://localhost:5000/home/uname";
        const data = JSON.stringify({ username: sid });
        callApi("POST", url, data, loadUname, errorResponse);
    }
}, [sid]);
useEffect(() => {
  const fetchProductAndUserImage = async () => {
      try {
          const response = await callApi(
              "POST",
              "http://localhost:5000/home/productWithUserImage",
              JSON.stringify({ productUsername: sid }), // Replace sid with the correct username
              loadProductWithUserImage,
              errorResponse
          );
      } catch (error) {
          errorResponse(error);
      }
  };

  fetchProductAndUserImage();
}, [sid]);

const loadProductWithUserImage = (res) => {
  try {
      const data = JSON.parse(res);
      const productData = data.product;
      const userProfileImage = data.userProfileImage;

      // Set the products data
      setProducts([productData]);

      // Update user profile image
      document.getElementById('IM1').src = `data:image/jpeg;base64,${userProfileImage}`;
  } catch (error) {
      console.error("Error parsing product or user data:", error);
  }
};


  const loadUname = (res) => {
    var data = JSON.parse(res);
        var HL1 = document.getElementById("HL1");
        var IM1 = document.getElementById('IM1');
        
        HL1.innerText = `${data[0].username}`;
        IM1.src = `data:image/jpeg;base64,${data[0].imgurl}`;
  };

  const loadProduct = (res) => {
    try {
      const productsData = JSON.parse(res);
      setProducts(productsData);
    } catch (error) {
      console.error("Error parsing product data:", error);
    }
  };

  const addToCart = (product) => {
    const existingCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCartItems = [...existingCartItems, product];
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const logout = () => {
    setSession("sid", "", -1);
    window.location.replace("/BidX");
  };

  const topProf = () => {
    window.location.replace("/BidX/uprofile");
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.Pproduct.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ flexDirection: "row", display: "flex" }}>
      <div>
        <div className="whole" style={{ border: "1px solid #000000", width: "240px", height: "740px" }}>
          <NavBar onLogout={logout}></NavBar>
        </div>
      </div>
      <div className="outlet">
        <div className="sheaderB" onClick={topProf}>
          <Header></Header>
        </div>
        <div className="col-3">
          <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search products..." className="searchInput" />
          <FontAwesomeIcon icon={faSearch} className="searchIcon" />
        </div>
        <div className="listProduct">
          {filteredProducts.map((product, index) => (
            <Product key={index} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mhn1;
