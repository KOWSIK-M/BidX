import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './smhn1.css';
import { callApi, errorResponse, setSession, getSession } from './main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const HS4 = {"float" : "right", "padding-right" : "10px", "justify-content":"right","margin-top":"7px","font-size":"14px"}
const HS5 = {"float" : "right", "height":"28px", "width":"28px", "border-radius":"50%" , "margin-right":"10px","margin-top":"3px"}

// Product component
const Product = ({ product, addToCart }) => {
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
            <div className="divImg">
            <img src={`./images/bids/${product.username}/${product.Pimgurl}`} alt="" className="ProImg" />
            </div>
            <h2>{product.Pproduct}</h2>
            <div className="price">${product.Prprice}</div>
            <p className="Bdes">{product.Pdes}</p>
            <div className="usB">
                <img src={`./images/photo/${product.username}.jpg`} alt="" className="dpBid" />
                <p className="usBT">{product.username}</p>
            </div>
            <div className="countdown">
                <p>Time Remaining: {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s</p>
            </div>
            <Link to={`/BidX/mbid/${product.Pproduct}`}>
                <button className="addBid">View Participants</button>
            </Link>
        </div>
    );
}

const MyPart = ({ changeColor }) => {
    changeColor("#fff");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sid = getSession("sid"); // Get session ID
                if (sid === "") {
                    window.location.replace("/BidX");
                    return;
                }

                const data1 = JSON.stringify({ sid });
                const res1 = await callApi("POST", "http://localhost:5000/home/dashboard2", data1, loadProducts, errorResponse);
            } catch (error) {
                setLoading(false);
                handleLoadError(error);
            }
        };

        fetchData();
    }, []);
    const handleLoadError = (error) => {
        setLoading(false);
        setError(error.message || 'An error occurred');
    }
    const loadProducts = async (res) => {
        setLoading(false);
        try {
            if (!Array.isArray(res) || res.length === 0) {
                throw new Error('Invalid data returned from dashboard2.');
            }
            const data2 = res[0].Pproduct;
            const productsData = await callApi("POST", "http://localhost:5000/home/dashboard1", { pro: data2 }, "", errorResponse);
            setProducts(productsData instanceof Array ? productsData : []);
        } catch (error) {
            handleLoadError(error);
        }
    }
    
    
  
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                                <a href="/BidX" class="alogo">BidX</a>
                            </a>
                            <div class="collapse navbar-collapse" id="sidebarCollapse" style={{ flexDirection:"column"}}>
                                <ul class="navbar-nav" style={{ flexDirection:"column"}}>
                                    <li class="nav-item" >
                                        <a class="nav-link" href="/BidX/mhn1" style={{ color:"black"}}>
                                            <i class="bi bi-house"></i> Dashboard
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/BidX/utrend">
                                            <i class="bi bi-bar-chart"></i> Trending
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/BidX/ucollections">
                                            <i class="bi bi-bookmarks"></i> Collections
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/BidX/mypart">
                                            <i class="bi bi-box"></i> My Participations
                                        </a>
                                    </li>
                                </ul>
                                <hr class="navbar-divider my-5 opacity-20"/>
                                <ul class="navbar-nav"  style={{ flexDirection:"column"}}>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/BidX/sprofile">
                                            <i class="bi bi-person-square"></i> Profile
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" >
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
                <div className="sheaderB" >
                    <label id="HL1" style={HS4}></label>
                    <img id="IM1" src="" alt="" style={HS5} className="imgstyle" />
                </div>
                <h1>My Participations</h1>
                <div className="listProduct1">
                    {products.map(product => (
                        <Product key={product.id} product={product}  />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyPart;
