import React from 'react';
import penImage from './images/pen.png';
import gifImage from './images/Untitled design(1).gif';
import headstyles from './Header.module.css'; // Importing header styles using headstyles

const Header = () => (
  <header className={headstyles.header}>
    <div className={headstyles['header-content']} id="header-content">
      <h1 className={headstyles['header-title']} id="header-title">
        NOTEVERSE<span><img src={penImage} alt="Pen" className={headstyles['pen-img']} /></span>
      </h1>
      <h3 className={headstyles['header-subtitle']} id="header-subtitle">Read With Ease</h3>
      <button className={headstyles['learn-more-btn']} id="learn-more-btn">Learn More</button>
    </div>
    <div className={headstyles['header-name']} id="header-name">
      <img src={gifImage} alt="Header GIF" className={headstyles['header-gif']} />
    </div>
  </header>
);

export default Header;
