import React, { useState, useRef } from 'react';
import './login.css';
import twit from './images/twit.jpg';
import Lin from './images/in.jpg';
import fb from './images/fb.jpg';
import ReCAPTCHA from "react-google-recaptcha";
import { callApi, errorResponse, setSession } from './main';

function Login() {
    function onChange(value) {
        console.log("Captcha value:", value);
      }
    const [passwordInputType1, setPasswordInputType1] = useState("password");
    const [passwordInputType2, setPasswordInputType2] = useState("password");
    const [fullName, setFullName] = useState("");
    const [dob, setDob] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const switchCtn = useRef(null);
    const aContainer = useRef(null);
    const bContainer = useRef(null);
    const switchC1 = useRef(null);
    const switchC2 = useRef(null);

    const togglePasswordVisibility1 = () => {
        setPasswordInputType1(prevType => prevType === "password" ? "text" : "password");
    };

    const togglePasswordVisibility2 = () => {
        setPasswordInputType2(prevType => prevType === "password" ? "text" : "password");
    };

    const handleFullNameChange = (e) => {
        const value = e.target.value;
        // Validation for full name (only characters and spaces allowed)
        if (/^[a-zA-Z\s]*$/.test(value)) {
            setFullName(value);
        }
    };

    const handleMobileNoChange = (e) => {
        const value = e.target.value;
        // Validation for mobile number (only 10 digits allowed)
        if (/^\d{0,10}$/.test(value)) {
            setMobileNo(value);
        }
    };

    const register = () => {
        // Add further validation for all fields
        if (!fullName.trim()) {
            alert("Please enter your full name.");
            return;
        }
        if (!dob.trim()) {
            alert("Please enter your date of birth.");
            return;
        }
        if (mobileNo.length !== 10 || isNaN(mobileNo)) {
            alert("Mobile number must be 10 digits.");
            return;
        }
        if (!username.trim()) {
            alert("Please enter your username.");
            return;
        }
        if (!email.trim()) {
            alert("Please enter your email.");
            return;
        }
        if (!password.trim()) {
            alert("Please enter your password.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Password and confirm password must match.");
            return;
        }

        // Call the API for registration...
    };

    // Similar handleChange functions for other inputs...
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

    window.onload = function(){
        var login = document.getElementById('login');
        login.style.display="block";
    }
    
    function validate()
    {
        var T1=document.getElementById('T1');
        var T2=document.getElementById('T2');
    
        var url = "http://localhost:5000/login/signin";
        var data = JSON.stringify({
            username : T1.value,
            pwd : T2.value
        });
        callApi("POST", url, data, loginSuccess, errorResponse);
    }
    
    function loginSuccess(res)
    {
        var data = JSON.parse(res);
        if(data === 1){
            var T1=document.getElementById('T1');
            setSession("sid", T1.value, 0.5);
            window.location.replace("/mhn1");
        }
        else
            alert("Invalid Credentials!");
    }
    return (
        <div className='mmm'>
            <header className='lch'>
                <a href="/" className="logo">BidX</a>
                <nav>
                    <a className='bl' href="/">Home</a>
                    <a className='bl' href="contact">Contacts</a>
                    <a className='bl' href="about">Info</a>
                    <a className='bl' href="login">Sign In</a>
                </nav>
            </header>
            <div className='bdy'>
                <div className="main">
                    <div className="container a-container" id="login" ref={aContainer}>
                    <form className="form" id="b-form" >
                        <h2 className="form_title titles">User Sign In</h2>
                        <div className="form__icons"></div>
                        <div className="form__icons"><div className='imoo'><a class="me" href="https://twitter.com/Medam_Kowsik"><img className="form__icon" src={twit} alt="App Logo"/></a></div>
                        <a class="me" href="https://www.linkedin.com/in/medam-kowsik-975479282"><img className="form__icon" src={Lin} alt="App Logo"/></a>
                        <a class="me" href="https://www.facebook.com/profile.php?id=9290872450"><img className="form__icon" src={fb} alt="App Logo"/></a></div>
                        <br></br><input className="form__input" type="text" id='T1' placeholder="Username"/>
                        <div className="password-wrapper">
                            <input className="form__input" type={passwordInputType1} id='T2' placeholder="Password"/>
                            <span onClick={togglePasswordVisibility1} style={{cursor: 'pointer'}}>{passwordInputType1 === "password" ? "👁" : "🚫"}</span>
                        </div>
                        <br></br><br></br>
                        <ReCAPTCHA sitekey="6LfY_WwpAAAAAMvTSu4nCFyRKWjZm0HZ9dlnMxkE" onChange={onChange} />
                        <a href="ap1" className="form__link">Forgot your password?</a>
                        <button className="form__button button submit" onClick={validate} >SIGN IN</button>
                    </form>
                    </div>
                    <div className="container b-container" id="registration" ref={bContainer}>
                        <form className="form" id="a-form">
                            <h2 className="form_title titles">Create Account</h2>
                            <input className="form__input" type="text" value={fullName} onChange={handleFullNameChange} placeholder="Full Name" />
                            <input className="form__input" type="date" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="DOB" />
                            <input className="form__input" type="text" value={mobileNo} onChange={handleMobileNoChange} placeholder="Mobile No." />
                            <input className="form__input" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                            <input className="form__input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                            <div className="password-wrapper">
                                <input className="form__input" type={passwordInputType1} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                <span onClick={togglePasswordVisibility1} style={{ cursor: 'pointer' }}>{passwordInputType1 === "password" ? "👁" : "🚫"}</span>
                            </div>
                            <div className="password-wrapper">
                                <input className="form__input" type={passwordInputType2} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
                                <span onClick={togglePasswordVisibility2} style={{ cursor: 'pointer' }}>{passwordInputType2 === "password" ? "👁" : "🚫"}</span>
                            </div>
                            <button className="form__button button submit" onClick={register}>SIGN UP</button>
                        </form>
                    </div>
                    <div className="switch" id="switch-cnt" ref={switchCtn}>
                        <div className="switch__container" id="switch-c1" ref={switchC1}>
                            <h2 className="switch__title titles">Hello Friend !</h2>
                            <p className="switch__description descriptions">Enter your personal details and start journey with us</p>
                            <button className="switch__button button switch-btn" onClick={changeForm}>SIGN UP</button>
                        </div>
                        <div className="switch__container is-hidden" id="switch-c2" ref={switchC2}>
                            <h2 className="switch__title titles">Welcome !</h2>
                            <p className="switch__description descriptions">To keep connected with us please login with your personal info</p>
                            <button className="switch__button button switch-btn" onClick={changeForm}>SIGN IN</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div className="footer-content">
                    <div className="privacy-policy">
                        <a href="pp">Privacy Policy</a>
                    </div>
                    <div className="terms-conditions">
                        <a href="tc">Terms & Conditions</a>
                    </div>
                    <div className="terms-conditions">
                        <a href="/">BidX©</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
