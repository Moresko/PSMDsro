import React from "react";
import '../css/header.css';
import { NavLink } from 'react-router-dom'; 

const Header = () => {
    return (
        <nav className="navbar-cont">
            <div className="nav-left">
                <NavLink to="/home" className="logo">LOGO</NavLink>
            </div>

            <div className="nav-center">
                <ul className="nav-links">
                    <li><NavLink to="/home" className="nav-link" activeClassName="active">Domov</NavLink></li>
                    <li><NavLink to="/domamalovane" className="nav-link" activeClassName="active">Doma maľované</NavLink></li>
                    <li><NavLink to="/reality" className="nav-link" activeClassName="active">Reality</NavLink></li>
                </ul>
            </div>

            <div className="nav-right">
                <NavLink to="/contact" className="contact-button">Kontakt</NavLink>
            </div>
        </nav>
    );
};

export default Header;
