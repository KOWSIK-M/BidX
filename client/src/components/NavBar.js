// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../mhn1.css'; // Add your specific styling here

const Navbar = ({ logout }) => {
    return (
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
                            <Link className="nav-link" to="/BidX/mhn1" style={{ color: "black" }}>
                                <i className="bi bi-house"></i> Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/BidX/utrend">
                                <i className="bi bi-bar-chart"></i> Trending
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/BidX/ucollections">
                                <i className="bi bi-bookmarks"></i> Collections
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/BidX/mypart">
                                <i className="bi bi-box"></i> My Participations
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/BidX/winnings">
                                <i className="bi bi-trophy"></i> My Winnings
                            </Link>
                        </li>
                    </ul>
                    <hr className="navbar-divider my-5 opacity-20" />
                    <ul className="navbar-nav" style={{ flexDirection: "column" }}>
                        <li className="nav-item">
                            <Link className="nav-link" to="/BidX/uprofile">
                                <i className="bi bi-person-square"></i> Profile
                            </Link>
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

export default Navbar;
