import React, { useState, useEffect } from "react";
import './smhn1.css';
import { callApi, errorResponse, setSession, getSession } from './main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const HS4 = {"float" : "right", "padding-right" : "10px", "justify-content":"right","margin-top":"7px","font-size":"14px"}
const HS5 = {"float" : "right", "height":"28px", "width":"28px", "border-radius":"50%" , "margin-right":"10px","margin-top":"3px"}

// Product component
const Product = ({ product }) => {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(product.Pdate, product.Ptime));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining(product.Pdate, product.Ptime));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    function calculateTimeRemaining(date, time) {
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
    }

    return (
        <div className="item">
            <img src={`./images/bids/${product.username}/${product.Pimgurl}`} alt="" className="ProImg" />
            <h2>{product.Pproduct}</h2>
            <div className="price">${product.Prprice}</div>
            <p className="Bdes">{product.Pdes}</p>
            <h4>{product.Pdate} {product.Ptime}</h4>
            <div className="usB">
                <img src={`./images/photo/${product.username}.jpg`} alt="" className="dpBid" />
                <p className="usBT">{product.username}</p>
            </div>
            <div className="countdown">
                <p>Time Remaining: {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s</p>
            </div>
            <button className="addCart">Add To Cart</button>
        </div>
    );
}

const SMhn1 = ({ changeColor }) => {
    changeColor("#fff");
    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await callApi("POST", "http://localhost:5000/home/dashboard", "", loadProduct, errorResponse);
            } catch (error) {
                errorResponse(error);
            }
        };

        const username = getSession("sid");
        if (username === "") {
            window.location.replace("/");
            return;
        }

        const fetchUserName = async () => {
            try {
                const data = JSON.stringify({ username });
                const res = await callApi("POST", "http://localhost:5000/home/uname", data, loadUname, errorResponse);
            } catch (error) {
                errorResponse(error);
            }
        };

        fetchData();
        fetchUserName();
    }, []);

    const loadUname = (res) => {
        const userData = JSON.parse(res);
        const HL1 = document.getElementById("HL1");
        const IM1 = document.getElementById('IM1');
        HL1.innerText = userData[0].username;
        IM1.src = require(`../public/images/photo/${userData[0].imgurl}`);
    }

    const loadProduct = (res) => {
        const productsData = JSON.parse(res);
        setProducts(productsData);
    }

    const logout = () => {
        setSession("sid", "", -1);
        window.location.replace("/");
    };

    const topProf = () => {
        window.location.replace("/sprofile");
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredProducts = products.filter(product =>
        product.Pproduct.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ flexDirection:"row", display:"flex" }}>
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
                        <a class="nav-link" href="/trend">
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
                        <a class="nav-link" onClick={logout}>
                            <i class="bi bi-box-arrow-left"></i> Logout
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
                <h1>Dashboard</h1>
                
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
                    {filteredProducts.map(product => (
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SMhn1;
