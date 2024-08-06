import React from 'react';
import Sidebar from './Sidebar';
import Header1 from './Header1';
import MainContent from './MainContent';
import UploadBook from './UploadBook';

export default function Dashboard({ onPageChange, currentPage }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] h-screen">
      <Sidebar onPageChange={onPageChange} />
      <div className="flex flex-col">
        <Header1 />
        <div className="flex-1 overflow-y-auto bg-gradient-to-r from-[#F8E7F0] to-[#FFFFFF] p-4 rounded-tl-lg">
          {(currentPage === 'library' || currentPage === 'home') && <MainContent />}
          {currentPage === 'upload' && <UploadBook />}
        </div>
      </div>
    </div>
  );
}
