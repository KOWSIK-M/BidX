import React from 'react';
import { Link } from 'react-router-dom';
import '../mhn1.css';

const HS4 = {"float": "right", "paddingRight": "10px", "justifyContent": "right", "marginTop": "7px", "fontSize": "14px"};
const HS5 = {"float": "right", "height": "28px", "width": "28px", "borderRadius": "50%", "marginRight": "10px", "marginTop": "3px"};

const Header = () =>{

    return(
        <div>
                        <label id='HL1' style={HS4}></label>
                        <img id='IM1' src='' alt='' style={HS5} className='imgstyle' />
        </div>
    );
};
export default Header;