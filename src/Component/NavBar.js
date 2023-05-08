import React from "react";
import "./NavBar.css";
import logo from '../assets/logo.png'
import { Link } from 'react-scroll';

function Click() {
  var navbar = document.querySelector(".main-nav ul");
  navbar.classList.toggle("active");
}
function NavBar() {
  return (
  
    <header className="main-header">
      <a href="/">
        <div className="brand-logo">
          <img src={logo} alt='logo'/>
        </div>
      </a>
      <div href="#" className="toggle-button" onClick={Click}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div> 
      <nav className="main-nav" >
        <ul>
          <li>
            <Link to="about" smooth={true} className="link">About</Link>
          </li>
          <li>
		    <Link to="services" smooth={true} className="link">Services</Link>
          </li>
          <li>
            <Link to="features" smooth={true} className="link">Features</Link>
          </li>
          <li>
            <Link to="team" smooth={true} className="link">Team</Link>
          </li>
          <li>
            <Link to="contact" smooth={true} className="link">Contact Us</Link>
          </li>
		  <li>
	        <a href="/login" className="link" >Login</a>		  
          </li>
        </ul>
      </nav>
    </header>
	
  );
}

export default NavBar;
