import React,{useEffect} from "react";
import './contact.css';
import wa from './images/whatsapp.png';

function Contact({changeColor}){
    useEffect(() => {
        changeColor("#181818");
      }, [changeColor]);
    return(
        <div>
        <header className="ch">
        <a href="/BidX" class="alogo">BidX</a>
        <nav>
            <a className="rt" href="/BidX">Home</a>
        </nav>
        </header>
        <div className="cont" > 
            <br></br><br></br><br></br>
        <h3>For any Queries, you can feel free to contact us 😊</h3>

<div class="contact-link1">

        <a class="me" href="whatsapp://send?phone=9346339305">Contact Us via WhatsApp </a>&nbsp;<img src={wa} alt="" height="30" widtht="35"></img>
    </div>
    <div class="contact-link2">
        <i class="fa2" ></i>

        <a class="m" href="mailto:2200030358@kluniversity.in?subject=Your%20Subject&body=Your%20Message%20Here" >Contact us via Email✉️</a>
    </div>
    </div>
    </div>
    );
}

export default Contact;