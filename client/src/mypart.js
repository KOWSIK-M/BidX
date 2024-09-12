import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import './smhn1.css';
import { callApi, errorResponse, getSession } from './main';

const HS4 = {"float" : "right", "paddingRight" : "10px", "justifyContent":"right","marginTop":"7px","fontSize":"14px"}
const HS5 = {"float" : "right", "height":"28px", "width":"28px", "borderRadius":"50%" , "marginRight":"10px","marginTop":"3px"}

const Product = ({ product }) => {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining(product.Pdate, product.Ptime));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining(product.Pdate, product.Ptime));
        }, 1000);
        return () => clearInterval(timer);
    }, [product.Pdate, product.Ptime]);

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

    const loadProducts = useCallback(async () => {
        try {
            const sid = getSession("sid"); // Get session ID
            if (sid === "") {
                window.location.replace("/BidX");
                return;
            }

            const data1 = JSON.stringify({ sid });
            const res = await callApi("POST", "http://localhost:5000/home/dashboard2", data1, null, errorResponse);

            if (!Array.isArray(res) || res.length === 0) {
                throw new Error('Invalid data returned from dashboard2.');
            }
            const data2 = res[0].Pproduct;
            const productsData = await callApi("POST", "http://localhost:5000/home/dashboard1", { pro: data2 }, "", errorResponse);
            setProducts(productsData instanceof Array ? productsData : []);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message || 'An error occurred');
        }
    }, []);

    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ flexDirection: "row", display: "flex" }}>
            <div>
                <div className="whole" style={{ border: "1px solid #000000", width: "240px", height: "740px" }}>
                    <nav className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg" id="navbarVertical" style={{ flexDirection: "column" }}>
                        <div className="container-fluid" style={{ flexDirection: "column", marginLeft: "0px" }}>
                            <button className="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <a className="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" href="/BidX">
                                <a href="/BidX" className="alogo">BidX</a>
                            </a>
                            <div className="collapse navbar-collapse" id="sidebarCollapse" style={{ flexDirection: "column" }}>
                                <ul className="navbar-nav" style={{ flexDirection: "column" }}>
                                    <li className="nav-item" >
                                        <a className="nav-link" href="/BidX/mhn1" style={{ color: "black" }}>
                                            <i className="bi bi-house"></i> Dashboard
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/BidX/utrend">
                                            <i className="bi bi-bar-chart"></i> Trending
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/BidX/ucollections">
                                            <i className="bi bi-bookmarks"></i> Collections
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/BidX/mypart">
                                            <i className="bi bi-box"></i> My Participations
                                        </a>
                                    </li>
                                </ul>
                                <hr className="navbar-divider my-5 opacity-20" />
                                <ul className="navbar-nav" style={{ flexDirection: "column" }}>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/BidX/sprofile">
                                            <i className="bi bi-person-square"></i> Profile
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/BidX">
                                            <i className="bi bi-box-arrow-left"></i> Logout
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
                        <Product key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyPart;
