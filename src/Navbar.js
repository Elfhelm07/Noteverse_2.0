// Navbar.js

import React, { useState } from 'react';
import navStyles from './Navbar.module.css';

const navItemsArray = [
  { href: "", text: "Home" },
  { href: "#about-us", text: "About Us" },
  { href: "#contact-us", text: "Services", },
  { href: "#library", text: "Library", page: "Library" },
];

const Navbar = ({ onsetPageProp }) => {
  const [activeNav, setActiveNav] = useState("");

  const handleNavClick = (href, page) => {
    setActiveNav(href);
    onsetPageProp(page); 
  };

  return (
    <nav className={navStyles.nav} id="navbar">
      <div className={navStyles.navbarMenu} id="navbar-menu">
        <ul className={navStyles.navbar} id="navbar-list">
          {navItemsArray.map((navItemObject, index) => (
            <li
              key={index}
              id={`nav-item-${index}`}
              className={
                activeNav === navItemObject.href
                  ? `${navStyles.navItem} ${navStyles.active}`
                  : navStyles.navItem
              }
            >
              <a
                className={navStyles.navLink}
                href={navItemObject.href}
                id={navItemObject.id || `nav-link-${index}`}
                onClick={() => handleNavClick(navItemObject.href, navItemObject.page || "Home")}
              >
                {navItemObject.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={navStyles.buttons} id="buttons">
        <button onClick={() => onsetPageProp('login')} id="login-button"> {/* Set page to 'Login' */}
          Login
        </button>
        <button onClick={() =>onsetPageProp('SignUp')} id="signup-button">
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
