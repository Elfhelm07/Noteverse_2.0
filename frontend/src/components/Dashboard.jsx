import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header1 from './Header1';
import MainContent from './MainContent';
import UploadBook from './UploadBook';

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Additional logic for page change can go here
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] h-screen">
      <Sidebar onPageChange={handlePageChange} />
      <div className="flex flex-col">
        <Header1 />
        <div className="flex-1 overflow-y-auto bg-gradient-to-r from-[#F8E7F0] to-[#FFFFFF] p-4 rounded-tl-lg">
          {(currentPage === 'library' || currentPage === 'home') && <MainContent />}
          {currentPage === 'upload' && <UploadBook />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;