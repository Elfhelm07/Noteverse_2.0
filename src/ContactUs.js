import React from 'react';
import contactUsImage from './images/contactus.png';
import socialMedia1 from './images/social-media_13716973.png';
import socialMedia2 from './images/social-media_13716962.png';
import cameraImage from './images/camera_8466655.png';
import './ContactUs.css';

const ContactUs = () => (
  <section className="content-section" id="contact-us">
    <div className="contact-image">
      <img src={contactUsImage} alt="Contact Us Img"/>
    </div>
    <div className="contact-content">
      <h2>Contact Us</h2>
      <h3>Phone</h3>
      <p>+1 123-456-7890</p>
      <h3>Email</h3>
      <p>info@example.com</p>
      <h3>Social</h3>
      <p>
        <img src={socialMedia1} alt=""/>
        <img src={socialMedia2} alt=""/>
        <img src={cameraImage} alt=""/>
      </p>
    </div>
  </section>
);

export default ContactUs;