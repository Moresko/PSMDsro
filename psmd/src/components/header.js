import React from "react";
import '../css/header.css';
import LG from '../img/logo.png';
import { NavLink } from 'react-router-dom'; // Import NavLink

const Header = () => {
    return (
        <nav className="navigator">
            <a href="/home" className="nav-logo">
                <img src={LG} className="LogoImg" alt="Logo" />
            </a>
            <ul className="nav-menu">
                <li className="nav-item">
                    <NavLink 
                        to="/home" 
                        className="nav-link" 
                        activeClassName="active" // Class for active link
                    >
                        Domov
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink 
                        to="/domamalovane" 
                        className="nav-link" 
                        activeClassName="active"
                    >
                        Doma Maľované
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink 
                        to="/reality" 
                        className="nav-link" 
                        activeClassName="active"
                    >
                        Reality
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink 
                        to="/contact" 
                        className="nav-link" 
                        activeClassName="active"
                    >
                        Kontakt
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Header;