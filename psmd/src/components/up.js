import React from "react";
import '../css/up.css';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';

const Up = () => {
  return (
    <div className="header-container">
        <div className="social-icons">
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
        </a>
        </div>
  </div>

  );
}

export default Up;
