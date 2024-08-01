import React from 'react';
import gifImage2 from './images/Untitled design.gif';
import dashboardImage from './images/dashboard_12177001.png';

const AboutUs = () => (
  <section id="about-us" className="content-section">
    <div className="image-div" id="about-us-image-div">
      <img src={gifImage2} alt="GIF" id="about-us-gif" />
    </div>
    <div className="text-div" id="about-us-text-div">
      <img src={dashboardImage} alt="Dashboard" id="about-us-dashboard" />
      <p id="about-us-text">
        Experience the transformative power of our platform, dedicated to simplifying your reading journey. Bid farewell to scattered documents as we seamlessly organize your reading materials, ensuring they're always at your fingertips. With centralized document storage, seamless synchronization, and intuitive annotation tools, unlock the full potential of your reading experience, anytime, anywhere.
      </p>
    </div>
  </section>
);

export default AboutUs;