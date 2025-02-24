import React from "react";
import '../css/header.css';
import LG from '../img/logo.png'

const Header = () => {

    return (
        <nav className="navigator">
            <a href="/home" className="nav-logo">
                 <img src={LG}  className="LogoImg" alt="Logo"/>
            </a>
            <ul  className="nav-menu">
                <li className="nav-item">
                    <a href="/home" className="nav-link">Doma Maľované</a>
                </li>
                <li className="nav-item">
                    <a href="/home" className="nav-link">Reality</a>
                </li>
                <li className="nav-item">
                    <a href="/home" className="nav-link">Kontakt</a>
                </li>
            </ul>
        </nav>
    );
};

export default Header;