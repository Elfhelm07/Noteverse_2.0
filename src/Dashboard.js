import React from 'react';
import styles from './Header1.module.css';
import Sidebar from './Sidebar';
import Header1 from './Header1';
import MainContent from './MainContent1';
import UploadBook from './UploadBook';

export default function Dashboard({ onPageChange, currentPage }) {
  return (
    <div className={styles['main-container']}>
      <Sidebar onPageChange={onPageChange} />
      <div className={styles['right-container']}>
        <Header1 />
        {(currentPage === 'library' || currentPage === 'home') && <MainContent />}
        {currentPage === 'upload' && <UploadBook />}
      </div>
    </div>
  );
}