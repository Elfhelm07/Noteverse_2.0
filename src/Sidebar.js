import React from 'react';
import styles from './Header1.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const menuItemsArray = [
  { icon: 'fas fa-home', text: 'Home', link: '#' },
  { icon: 'fas fa-book', text: 'Library', link: '#' },
  { icon: 'fas fa-sticky-note', text: 'Notes', link: '#' },
  { icon: 'fas fa-cloud-upload-alt', text: 'Upload', link: '#' },
];

const footerItemArray = [
  { icon: 'fas fa-user', text: 'My Profile', link: '#' },
];

function Sidebar({ onPageChange }) {
  const handleClick = (e, page) => {
    e.preventDefault();
    onPageChange(page.toLowerCase());
  };

  return (
    <aside id="sidebar" className={styles.sidebar}>
      <nav>
        <h2 id="site-title">Noteverse</h2>
        <div id="menu-heading" className={styles['menu-heading']}>
          <h3 id="menu-title">Menu</h3>
          <hr id="menu-line" className={styles['menu-line']} />
        </div>
        <ul id="menu-list">
          {menuItemsArray.map((item, index) => (
            <li id={`menu-item-${index}`} key={index}>
              <a
                id={`menu-link-${index}`}
                href={item.link}
                onClick={(e) => handleClick(e, item.text)}
              >
                <i id={`menu-icon-${index}`} className={item.icon}></i> {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <footer>
        <h3 id="preferences" className={styles.preferences}>Preferences</h3>
        <hr id="heading-line" className={styles['heading-line']} />
        <ul id="footer-list">
          {footerItemArray.map((item, index) => (
            <li id={`footer-item-${index}`} key={index}>
              <a
                id={`footer-link-${index}`}
                href={item.link}
                onClick={(e) => e.preventDefault()}
              >
                <i id={`footer-icon-${index}`} className={item.icon}></i> {item.text}
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </aside>
  );
}

export default Sidebar;