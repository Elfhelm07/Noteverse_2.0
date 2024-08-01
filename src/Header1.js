// Header.js

import React from 'react';
import styles from './Header1.module.css'; // Import CSS module

function Header1() {
  return (
    <header className={styles['right-header']}>
      <div className={styles['header-content']}>
        
        <div className={styles['search-bar']}>
          <input type="text" placeholder="Search Books" />
          <i className={`fas fa-search ${styles['search-icon']}`}></i>
        </div>
        <div className={styles['user-profile']}>
          <p>John Doe</p>
          <img src="./images/user.gif" alt="User Avatar" />
        </div>
        <div className={styles['sidebar-toggle']}>&#9776;</div>
      </div>
    </header>
  );
}

export default Header1;

