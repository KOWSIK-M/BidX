import React from "react";
import { useEffect } from "react";
import './mhn1.css';
import { callApi, errorResponse, setSession, getSession } from './main';

class Mhn1 extends React.Component {
    constructor({ changeColor }) {
        super();
        this.sid = getSession("sid");
        if (this.sid === "")
            window.location.replace("/");
        
        this.state = {
            products: [],
            cart: []
        };
    }
    
    componentDidMount() {
        const { changeColor } = this.props;
        changeColor("#ffffff");

        this.initApp();
    }

    logout() {
        setSession("sid", "", -1);
        window.location.replace("/");
    }
    addDataToHTML = () => {
        const { products } = this.state;
        const listProductHTML = document.querySelector('.listProduct');
        
        if (products.length > 0) {
            products.forEach(product => {
                const newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = `
                    <img src="${product.image}" alt="">
                    <h2>${product.name}</h2>
                    <div class="price">$${product.price}</div>
                    <button class="addCart">Add To Cart</button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }

    initApp = () => {
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                this.setState({ products: data }, () => {
                    this.addDataToHTML();
                });

                if (localStorage.getItem('cart')) {
                    const cart = JSON.parse(localStorage.getItem('cart'));
                    this.setState({ cart });
                }
            });
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
                        <a class="nav-link" href="/mhn1" style={{ color:"black"}}>
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
                        <a class="nav-link" href="/myBid">
                            <i class="bi bi-bookmarks"></i> My Biddings
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <i class="bi bi-people"></i> Users
                        </a>
                    </li>
                </ul>
                
                <hr class="navbar-divider my-5 opacity-20"/>
                
                <ul class="navbar-nav"  style={{ flexDirection:"column"}}>
                    <li class="nav-item">
                        <a class="nav-link" href="/profile">
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
        <div className="outlet">
        <h1>Dashboard</h1>
        <header>
        <h1 class="title">PRODUCT LIST</h1>
        </header>
        <div class="listProduct">

        </div>
    </div>
    </div>
    );
}}
export default Mhn1;