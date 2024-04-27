import React, { useState } from 'react';
import axios from 'axios';
import './validatephoneno.css'; // Import the CSS file

const ValidatePhoneNo = () => {
    const [username, setUsername] = useState('');
    const [mobileno, setMobileno] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/validate-phone', {
                username: username,
                mobileno: mobileno
            });
            if (response.status === 200) {
                // Redirect to the 'BidX/ap1' page upon successful validation
                window.location.href = 'http://localhost:3000/BidX/ap1'; // Assuming React app runs on port 3000
            }
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <div className='center-container' style={{"color":"black"}}>
        <div className='cpcontent'>
            <h3>VALIDATING</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type='text'
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Enter Username'
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mobileno">Mobile Number:</label>
                    <input
                        type='text'
                        id="mobileno"
                        value={mobileno}
                        onChange={(e) => setMobileno(e.target.value)}
                        placeholder='Enter Phone Number'
                    />
                </div>
                {errorMessage && <div className='error'>{errorMessage}</div>}
                <button type='submit' className='bbbb2'>Validate</button>
            </form>
        </div>
    </div>
    );
};

export default ValidatePhoneNo;
