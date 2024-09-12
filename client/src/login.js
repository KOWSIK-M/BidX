import React, { useState, useRef, useEffect } from 'react';
import './login.css';
import twit from './images/twit.jpg';
import Lin from './images/in.jpg';
import fb from './images/fb.jpg';
import { callApi, errorResponse, setSession } from './main';

function Login() {
    const [passwordInputType, setPasswordInputType] = useState("password");
    const [passwordInputType1, setPasswordInputType1] = useState("password");
    const [passwordInputType2, setPasswordInputType2] = useState("password");
    const [mobileNo, setMobileNo] = useState("");
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const switchCtn = useRef(null);
    const switchCircle = useRef(null);
    const aContainer = useRef(null);
    const bContainer = useRef(null);
    const switchC1 = useRef(null);
    const switchC2 = useRef(null);

    const togglePasswordVisibility = () => {
        setPasswordInputType(prevType => prevType === "password" ? "text" : "password");
    };

    const togglePasswordVisibility1 = () => {
        setPasswordInputType1(prevType => prevType === "password" ? "text" : "password");
    };

    const togglePasswordVisibility2 = () => {
        setPasswordInputType2(prevType => prevType === "password" ? "text" : "password");
    };

    const handleFullNameChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) {
            setFullName(value);
        }
    };

    const handleMobileNoChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,10}$/.test(value)) {
            setMobileNo(value);
        }
    };

    const changeForm = () => {
        const isGxClass = "is-gx";
        const isTxrClass = "is-txr";
        const isHiddenClass = "is-hidden";
        const isTxlClass = "is-txl";
        const isZ200Class = "is-z200";

        switchCtn.current.classList.add(isGxClass);
        setTimeout(() => {
            switchCtn.current.classList.remove(isGxClass);
        }, 1500);

        switchCtn.current.classList.toggle(isTxrClass);
        aContainer.current.classList.toggle(isTxlClass);
        bContainer.current.classList.toggle(isTxlClass);
        bContainer.current.classList.toggle(isZ200Class);
        switchC1.current.classList.toggle(isHiddenClass);
        switchC2.current.classList.toggle(isHiddenClass);
    };

    const register = (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page

        const RT1 = document.getElementById('RT1');
        const RT2 = document.getElementById('RT2');
        const RT3 = document.getElementById('RT3');
        const RT4 = document.getElementById('RT4');
        const RT5 = document.getElementById('RT5');
        const RT6 = document.getElementById('RT6');
        const RT7 = document.getElementById('RT7');

        if (RT1.value === "" || RT2.value === "" || RT3.value === "" || RT4.value === "" || RT5.value === "" || RT6.value === "" || RT7.value === "" || RT6.value !== RT7.value) {
            alert("Please fill in all fields correctly");
            return;
        }

        const url = "http://localhost:5000/registration/signup";
        const data = JSON.stringify({
            fullname: RT1.value,
            dob: RT2.value,
            mobileno: RT3.value,
            username: RT4.value,
            email: RT5.value,
            pwd: RT6.value,
            imgurl: "default.jpg"
        });

        callApi("POST", url, data, registeredSuccess, errorResponse);

        RT1.value = "";
        RT2.value = "";
        RT3.value = "";
        RT4.value = "";
        RT5.value = "";
        RT6.value = "";
        RT7.value = "";

        document.getElementById('login').style.display = 'block';
        document.getElementById('registration').style.display = 'none';
    }

    const registeredSuccess = (res) => {
        const data = JSON.parse(res);
        alert(data.message || "Registered successfully");
    }

    function validate(e) {
        e.preventDefault(); // Prevent form submission from reloading the page
        
        const T1 = document.getElementById('T1');
        const T2 = document.getElementById('T2');

        const url = "http://localhost:5000/login/signin";
        const data = JSON.stringify({
            username: T1.value,
            pwd: T2.value // Ensure 'pwd' is used here to match the backend
        });

        callApi("POST", url, data, loginSuccess, errorResponse);
    }

    function loginSuccess(res) {
        const data = JSON.parse(res);

        if (data.success) {
            const T1 = document.getElementById('T1');
            setSession("sid", T1.value, 0.5); // Store session with username
            
            window.location.href = 'http://localhost:3000/BidX/mhn1';
        } else {
            alert(data.message); // Show error message if login failed
        }
    }

    function errorResponse(err) {
        alert("An error occurred during the login process.");
    }

    useEffect(() => {
        const login = document.getElementById('login');
        login.style.display = "block";
    }, []);

    return (
        <div className='mmm'>
            <header className='lch'>
                <a href="/BidX" className="logo">BidX</a>
                <nav>
                    <a className='bl' href="/BidX">Home</a>
                    <a className='bl' href="/BidX/contact">Contacts</a>
                    <a className='bl' href="/BidX/about">Info</a>
                    <a className='bl' href="/BidX/login">Sign In</a>
                </nav>
            </header>
            <div className='bdy'> 
                <div className="main">
                    <div className="container a-container" id="login" ref={aContainer}>
                        <form className="form" id="b-form">
                            <h2 className="form_title titles">User Sign In</h2>
                            <div className="form__icons">
                                <a className="me" href="https://twitter.com/Medam_Kowsik"><img className="form__icon" src={twit} alt="App Logo"/></a>
                                <a className="me" href="https://www.linkedin.com/in/medam-kowsik-975479282"><img className="form__icon" src={Lin} alt="App Logo"/></a>
                                <a className="me" href="https://www.facebook.com/profile.php?id=9290872450"><img className="form__icon" src={fb} alt="App Logo"/></a>
                            </div>
                            <input className="form__input" type="text" id='T1' placeholder="Username" />
                            <div className="password-wrapper">
                                <input className="form__input" type={passwordInputType1} id='T2' placeholder="Password" />
                                <span onClick={togglePasswordVisibility1} style={{ cursor: 'pointer' }}>
                                    {passwordInputType1 === "password" ? "👁" : "🚫"}
                                </span>
                            </div>
                            <a href="/BidX/validatePhoneno" className="form__link">Forgot your password?</a>
                            <button className="form__button button submit" onClick={validate}>SIGN IN</button>
                        </form>
                    </div>
                    <div className="container b-container" id="registration" ref={bContainer}>
                        <form className="form" id="a-form">
                            <h2 className="form_title titles">Create Account</h2>
                            <input className="form__input" type="text" id='RT1' value={fullName} onChange={handleFullNameChange} placeholder="Full Name" />
                            <input className="form__input" type="date" id='RT2' placeholder="DOB" />
                            <input className="form__input" type="text" id='RT3' value={mobileNo} onChange={handleMobileNoChange} placeholder="Mobile No." />
                            <input className="form__input" type="text" id='RT4' value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                            <input className="form__input" type="text" id='RT5' placeholder="Email" />
                            <div className="password-wrapper">
                                <input className="form__input" type={passwordInputType} id='RT6' placeholder="Password" />
                                <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                                    {passwordInputType === "password" ? "👁" : "🚫"}
                                </span>
                            </div>
                            <div className="password-wrapper">
                                <input className="form__input" type={passwordInputType2} id='RT7' placeholder="Confirm Password" />
                                <span onClick={togglePasswordVisibility2} style={{ cursor: 'pointer' }}>
                                    {passwordInputType2 === "password" ? "👁" : "🚫"}
                                </span>
                            </div>
                            <button className="form__button button submit" onClick={register}>SIGN UP</button>
                        </form>
                    </div>
                    <div className="switch" id="switch-cnt" ref={switchCtn}>
                        <div className="switch__circle" ref={switchCircle}></div>
                        <div className="switch__circle switch__circle--t" ref={switchCircle}></div>
                        <div className="switch__container" id="switch-c1" ref={switchC1}>
                            <h2 className="switch__title titles">Hello Friend!</h2>
                            <p className="switch__description descriptions">Enter your personal details and start your journey with us</p>
                            <button className="switch__button button switch-btn" onClick={changeForm}>SIGN UP</button>
                        </div>
                        <div className="switch__container is-hidden" id="switch-c2" ref={switchC2}>
                            <h2 className="switch__title titles">Welcome!</h2>
                            <p className="switch__description descriptions">To keep connected with us please login with your personal info</p>
                            <button className="switch__button button switch-btn" onClick={changeForm}>SIGN IN</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="footer-content">
                    <div className="privacy-policy">
                        <a href="/BidX/pp">Privacy Policy</a>
                    </div>
                    <div className="terms-conditions">
                        <a href="/BidX/tc">Terms & Conditions</a>
                    </div>
                    <div className="terms-conditions">
                        <a href="/BidX">BidX©</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
