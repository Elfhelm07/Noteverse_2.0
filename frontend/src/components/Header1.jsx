import React, { useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import userAvatar from '../assets/user.gif';

function Header1() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/books/search', {
        params: { query: searchQuery }
      });
      // Handle search results, e.g., update the book list
    } catch (error) {
      console.error('Error searching books:', error);
    }
  };

  return (
    <header className="bg-[#1c1c39] text-white p-5">
      <div className="flex justify-between items-center">
        <div className="relative w-2/5 mx-5 h-10">
          <input
            type="text"
            placeholder="Search Books"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full pl-10 pr-4 border border-gray-300 rounded-full text-center text-base xl:w-1/2 lg:w-1/2"
          />
          <i className="fas fa-search absolute top-1/2 left-2 transform -translate-y-1/2 text-black text-lg" onClick={handleSearch}></i>
        </div>
        <div className="flex items-center">
          <p className="pr-2">John Doe</p>
          <img src={userAvatar} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
        </div>
        <div className="hidden">&#9776;</div>
      </div>
    </header>
  );
}

export default Header1;
