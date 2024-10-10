import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
const navItemsArray = [
  { href: "", text: "Home" },
  { href: "#about-us", text: "About Us" },
  { href: "#contact-us", text: "Services" },
  { href: "library", text: "Library", page: "Library" },
];

const Navbar = ({ onsetPageProp }) => {
  const [activeNav, setActiveNav] = useState("");

  const handleNavClick = (href, page) => {
    setActiveNav(href);
    onsetPageProp(page);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 fixed w-full z-50 shadow-lg flex items-center justify-between">
      <ul className="hidden lg:flex lg:items-center lg:space-x-6">
        {navItemsArray.map((navItemObject, index) => (
          <li
            key={index}
            className={`transition-colors duration-300 ${activeNav === navItemObject.href ? 'text-[#007bff] font-bold' : 'text-white'}`}
          >
            <a
              className="hover:text-[#007bff] text-base font-medium"
              href={navItemObject.href}
              onClick={() => handleNavClick(navItemObject.href, navItemObject.page || "Home")}
            >
              {navItemObject.text}
            </a>
          </li>
        ))}
      </ul>
      <div className="hidden lg:flex lg:items-center lg:space-x-4">
        <button
          onClick={() => onsetPageProp('login')}
          className="bg-white text-black py-2 px-4 rounded-md font-semibold transition-colors duration-300 hover:bg-gray-200"
        >
          Login
        </button>
        <button
          onClick={() => onsetPageProp('SignUp')}
          className="bg-white text-black py-2 px-4 rounded-md font-semibold transition-colors duration-300 hover:bg-gray-200"
        >
          Sign Up
        </button>
      </div>
      <div className="lg:hidden flex items-center">
        <div className="menu-icon cursor-pointer">
          <div className="bar bg-white w-6 h-0.5 mb-1"></div>
          <div className="bar bg-white w-6 h-0.5 mb-1"></div>
          <div className="bar bg-white w-6 h-0.5"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
