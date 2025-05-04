import React from "react";
import '../css/header.css';
import { NavLink } from 'react-router-dom'; 

const Header = () => {
    return (
        <nav className="navbar-cont">
            <ul>
                <li className="nav-item">
                    <NavLink 
                        to="/home" 
                        className="nav-link" 
                        activeClassName="active" 
                    >
                        DOMOV
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink 
                        to="/domamalovane" 
                        className="nav-link" 
                        activeClassName="active"
                    >
                        DOMA MAĽOVANÉ
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink 
                        to="/reality" 
                        className="nav-link" 
                        activeClassName="active"
                    >
                        REALITY
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink 
                        to="/contact" 
                        className="nav-link" 
                        activeClassName="active"
                    >
                        KONTAKT
                    </NavLink>
                </li>
            </ul>
      </nav>
    );
};

export default Header;