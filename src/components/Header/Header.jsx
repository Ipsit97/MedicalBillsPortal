import React from 'react';
import { NavLink } from 'react-router-dom';
import {PersonFill,HouseDoorFill } from 'react-bootstrap-icons';
import './Header.css';

function Header() {

    return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-container">
      <div className="container">
       <div className='truffle-health-logo'>
            <NavLink className="navbar-brand" to="/" >
                <div className="logo-container">    
                    <img src="/images/logo.png" alt="Logo" className="logo-img"/>
                    <div className="weight-bold gray-color logo-text"> Truffle Health</div>
                </div>
            </NavLink>
        </div>  

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav  ms-auto custom-text-links">
            <li className="nav-item">
              <NavLink className={(navData) => (navData.isActive ? "active-style nav-link" : 'nav-link none')} to="/home">
               <HouseDoorFill /> Home
              </NavLink>
            </li>  

            <li className="nav-item">
              <NavLink className={(navData) => (navData.isActive ? "active-style nav-link" : 'nav-link none')} to="/login">
              <PersonFill /> Login/Signup
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
}

export default Header;