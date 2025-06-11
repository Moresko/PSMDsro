import React from "react";
import '../css/contactPage.css';
import Header from '../components/header';

const Contact = () => {
  return (
   <div>
        <header>
            <Header/>
        </header>
        <div className="contact-start">
            <div className="contact-box">
              <h1>Reality</h1>
            </div>
            <div className="contact-box">
              <h1>Doma maľované</h1>
            </div>
        </div>
   </div>
  );
}

export default Contact;
