import React from 'react';
import penImage from '../images/pen.png';
import gifImage from '../images/Untitled design(1).gif';

const Header = () => (
  <header className="flex justify-between items-center bg-gradient-to-r from-[#5170ff] to-[#ff66c4] text-white p-5">
    <div className="flex-1 p-5">
      <h1 className="text-4xl text-gray-200 mb-2 flex items-center">
        NOTEVERSE
        <span className="ml-2">
          <img src={penImage} alt="Pen" className="w-9 h-auto" />
        </span>
      </h1>
      <h3 className="text-gray-200">Read With Ease</h3>
      <button className="bg-black text-white py-2 px-6 rounded-lg mt-7 transition-colors duration-300 hover:bg-[#3068c9]">
        Learn More
      </button>
    </div>
    <div className="flex items-center">
      <img src={gifImage} alt="Header GIF" className="w-[400px] h-[400px] m-5" />
    </div>
  </header>
);

export default Header;
