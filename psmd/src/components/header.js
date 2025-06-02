import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom'; 
import { IoKeyOutline } from "react-icons/io5";
import { auth } from './firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import AdminLogin from '../components/login';
import '../css/header.css';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAdmin(false);
      console.log('Admin logged out successfully.');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <nav className="navbar-cont">
        <div className="nav-left">
          <NavLink to="/home" className="logo">LOGO</NavLink>
        </div>

        <div className="nav-center">
          <ul className="nav-links">
            <li><NavLink to="/home" className="nav-link" activeClassName="active">Domov</NavLink></li>
            <li><NavLink to="/domamalovane" className="nav-link" activeClassName="active">Doma maľované</NavLink></li>
            <li><NavLink to="/reality" className="nav-link" activeClassName="active">Reality</NavLink></li>
            {!isAdmin && (
              <li 
                onClick={() => setShowLogin(true)} 
                style={{ cursor: 'pointer' }}
                title="Admin login"
              >
                <IoKeyOutline size={20} />
              </li>
            )}
          </ul>
        </div>

        <div className="nav-right">
          <NavLink to="/contact" className="contact-button">Kontakt</NavLink>
          {isAdmin && (
            <button 
              className="logout-button" 
              onClick={handleLogout}
              style={{marginLeft: '10px'}}
            >
              Odhlásiť sa
            </button>
          )}
        </div>
      </nav>

      {showLogin && !isAdmin && (
        <div className="login-overlay">
          <div className="login-popup">
            <button className="close-btn" onClick={() => setShowLogin(false)}>×</button>
            <AdminLogin 
              onLogin={() => {
                setIsAdmin(true);
                setShowLogin(false);
              }} 
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
