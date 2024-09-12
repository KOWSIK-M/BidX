import React from 'react';
import { Link } from 'react-router-dom';
import '../mhn1.css';

const SellerNav = ({ logout })=>{
    return(
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
                                    <li className="nav-item">
                                        <a className="nav-link" href="/BidX/smhn1" style={{ color: "black" }}>
                                            <i className="bi bi-house"></i> Dashboard
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/BidX/trend">
                                            <i className="bi bi-bar-chart"></i> Trending
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/BidX/scollections">
                                            <i className="bi bi-bookmarks"></i> Collections
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/BidX/crBid">
                                            <i className="bi bi-people"></i> Create a Bid
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/BidX/myBid">
                                            <i className="bi bi-box"></i> My Bids
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
                                        <a className="nav-link" onClick={logout} href="/BidX">
                                            <i className="bi bi-box-arrow-left"></i> Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
    );
};
export default SellerNav;