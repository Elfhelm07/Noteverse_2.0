import React from 'react';
import styles from './Header1.module.css'; // Import CSS module
import Sidebar from './Sidebar';
import Header1 from './Header1';
import MainContent from './MainContent1';

export default function Dashboard({ onPageChange }) { // Accept onPageChange prop
  return (
    <div className={styles['main-container']}>
      <Sidebar onPageChange={onPageChange} /> {/* Pass onPageChange to Sidebar */}
      <div className={styles['right-container']}>
        <Header1 />
        <MainContent />
      </div>
    </div>
  );
}
