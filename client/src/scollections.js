// SCollections component
import React, { useState, useEffect } from "react";
import './smhn1.css';
import { callApi, errorResponse, setSession, getSession } from './main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SellerNav from "./components/SellerNav";
import Header from "./components/Header";

const SCollections = ({ changeColor }) => {
    changeColor("#fff");
    const [sid] = useState(getSession("sid"));
    const [searchQuery, setSearchQuery] = useState("");
    const [cartItems, setCartItems] = useState([]);

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
        // Retrieve cart items from local storage
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(storedCartItems);
        
    }, []);
    
    const logout = () => {
        setSession("sid", "", -1);
        window.location.replace("/BidX");
    };

    const topProf = () => {
        window.location.replace("/BidX/sprofile");
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // Function to calculate time remaining for each product
    const calculateTimeRemaining = (date, time) => {
        const targetDate = new Date(date + "T" + time);
        const now = new Date();
        const timeRemaining = targetDate - now;
        if (timeRemaining <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        return { days, hours, minutes, seconds };
    };

    // Function to format countdown timer
    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    const loadUname = (res) => {
        var data = JSON.parse(res);
        var HL1 = document.getElementById("HL1");
        var IM1 = document.getElementById('IM1');
        
        HL1.innerText = `${data[0].username}`;
        IM1.src = `data:image/jpeg;base64,${data[0].imgurl}`;
    }
    const removeFromCollection = (productToRemove) => {
        // Filter out the product to remove from the collections
        const updatedCartItems = cartItems.filter(item => item !== productToRemove);
        setCartItems(updatedCartItems);
        // Update local storage with the updated cart items
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    };
    
    return (
        <div style={{ flexDirection:"row", display:"flex" }}>
            <div>
                <div className="whole" style={{ border:"1px solid #000000" , width:"240px",height:"740px"}}>
                <SellerNav onLogout={logout}/>
                </div>
            </div>
            <div className="outlet">
                <div className="sheaderB" onClick={topProf}>
                    <Header></Header>
                </div>
                <h1><i class="bi bi-bookmarks"></i>Your Collections</h1>
                
                <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={handleSearch} 
                    placeholder="Search for products..." 
                    title="Type in a product name" 
                    className="searchInput"
                />
                <FontAwesomeIcon icon={faSearch} className="searchIcon" />
                
                <div className="listProduct">
                    <div>
                        {cartItems.map(item => {
                            const timeRemaining = calculateTimeRemaining(item.Pdate, item.Ptime);
                            return (
                                <div key={item.id} className="cartItem">
                                    <div className="item">
                                        <img src={`./images/bids/${item.username}/${item.Pimgurl}`} alt="" className="ProImg" />
                                        <h2>{item.Pproduct}</h2>
                                        <div className="price">${item.Prprice}</div>
                                        <p className="Bdes">{item.Pdes}</p>
                                        <div className="usB">
                                            <img src={`./images/photo/${item.username}.jpg`} alt="" className="dpBid" />
                                            <p className="usBT">{item.username}</p>
                                            <div className="countdown">
                                                <p>Time Remaining: {formatTime(timeRemaining.days)}d {formatTime(timeRemaining.hours)}h {formatTime(timeRemaining.minutes)}m {formatTime(timeRemaining.seconds)}s</p>
                                            </div>
                                            <button className="addBid">Bid Now</button>
                                            <br></br>
                                            <button className="addBid" onClick={() => removeFromCollection(item)}>Remove</button>
                                        </div>
                                    </div>
                                    <br />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SCollections;
