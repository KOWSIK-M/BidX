import React, { useState } from "react";

import { callApi, errorResponse, getSession } from './main';
import './fp.css';

function FP() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("weak");
    const [passwordMatch, setPasswordMatch] = useState(true);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // Calculate password strength
        let strength = 'weak';
        if (newPassword.length > 5 && newPassword.match(/\d+/g)) strength = 'medium';
        if (newPassword.length > 6 && newPassword.match(/[^\w\s]/gi)) strength = 'strong';
        setPasswordStrength(strength);

        // Check if passwords match
        setPasswordMatch(newPassword === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);

        // Check if passwords match
        setPasswordMatch(password === newConfirmPassword);
    };

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        const inputType = e.target.previousSibling.type;
        e.target.previousSibling.type = inputType === 'password' ? 'text' : 'password';
    };


function updatePwd()
{
    var U1 = document.getElementById("U1");
    var url = "http://localhost:5000/login/signin";
    var data = JSON.stringify({
        username: U1.value
    });
    
    callApi("POST", url, data, validatePwd, errorResponse);
}

function validatePwd(res)
{
    var data = JSON.parse(res);
    if(data === 0)
        alert("Invalid Credentials...");
    else
    {
        var U1 = document.getElementById('U1');
        var T2 = document.getElementById('T2');
        var T3 = document.getElementById('T3');
        if(T2.value !== T3.value)
        {
            alert("New password and Re-Type password are not matched");
            return;
        }
        var url = "http://localhost:5000/login/fp";
        var input = JSON.stringify({
            username:U1.value,
            pwd: T2.value
        });
        
        callApi("POST", url, input, updatePwdSuccess, errorResponse);
    }
}

function updatePwdSuccess(res)
{
    window.location.replace("login");
    var data = JSON.parse(res);
    alert(data);
}



    return (
        <div className="fps">
        <header className='lch1'>
        <a href="/" class="logo">BidX</a>
        <nav>
            <a className='blll' href="login">Go Back &#8617;</a>
        </nav>
    </header>
        <div id="box">
            <form id="myform-search" method="post" autoComplete="off">
                <h1>Change Password <span>choose a good one!</span></h1>
                <div>
                    <input placeholder="Username" id="U1" className="Usn"></input>
                </div>
                <div>
                    <input type="password" value={password} placeholder="Enter Password" className="password" onChange={handlePasswordChange} id="T2"/>
                    <button className="unmask" type="button" onClick={togglePasswordVisibility}></button>
                </div>
                <div>
                    <input type="password" value={confirmPassword} placeholder="Confirm Password" className="password" onChange={handleConfirmPasswordChange} id="T3"/>
                    <button className="unmask" type="button" onClick={togglePasswordVisibility}></button>
                </div><br></br>
                <div id="strong" className="mkk"><span className={passwordStrength}>{passwordStrength}</span></div>
                {!passwordMatch && <div id="valid">Passwords Don't Match</div>}
                <br></br>
                <button onClick={updatePwd} className="button-1">Update!</button>
                <small>Must be 6+ characters long and contain at least 1 upper case letter, 1 number, 1 special character</small>
            </form>
        </div>
        </div>
    );
}

export default FP;
