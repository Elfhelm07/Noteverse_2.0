import React from 'react';
import contactUsImage from '../images/contactus.png';
import socialMedia1 from '../images/social-media_13716973.png';
import socialMedia2 from '../images/social-media_13716962.png';
import cameraImage from '../images/camera_8466655.png';

const ContactUs = () => (
  <div>
    <section id="contact-us" className="flex flex-row justify-between items-center py-6 px-20 bg-black text-[#8C52FF]">
      <div className="flex-1 pr-8">
        <img 
          src={contactUsImage} 
          alt="Contact Us Img" 
          className="max-w-full h-auto transition-transform duration-300 transform hover:scale-105" 
        />
      </div>
      <div className="flex-1 pr-8">
        <h2 className="mb-2 text-3xl font-bold transition-transform duration-300 transform hover:scale-105">Contact Us</h2>
        <h3 className="mb-1">Phone</h3>
        <p className="text-white mb-3 transition-opacity duration-300 hover:opacity-80">+1 123-456-7890</p>
        <h3 className="mb-1">Email</h3>
        <p className="text-white mb-3 transition-opacity duration-300 hover:opacity-80">info@example.com</p>
        <h3 className="mb-1">Social</h3>
        <div className="flex items-center">
          <img src={socialMedia1} alt="Social Media 1" className="w-8 h-8 transition-transform duration-300 transform hover:scale-125 mr-2" />
          <img src={socialMedia2} alt="Social Media 2" className="w-8 h-8 transition-transform duration-300 transform hover:scale-125 mr-2" />
          <img src={cameraImage} alt="Camera" className="w-8 h-8 transition-transform duration-300 transform hover:scale-125" />
        </div>
      </div>
    </section>
    <footer className="bg-[#8C52FF] text-white py-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-5">
        <div className="transition-transform duration-300 transform hover:scale-105">
          <h4 className="text-lg font-bold">About Us</h4>
          <p className="text-sm">Learn more about our mission and values.</p>
        </div>
        <div className="transition-transform duration-300 transform hover:scale-105">
          <h4 className="text-lg font-bold">Links</h4>
          <ul className="text-sm">
            <li><a href="#home" className="hover:underline">Home</a></li>
            <li><a href="#about-us" className="hover:underline">About Us</a></li>
            <li><a href="#services" className="hover:underline">Services</a></li>
            <li><a href="#library" className="hover:underline">Library</a></li>
          </ul>
        </div>
        <div className="transition-transform duration-300 transform hover:scale-105">
          <h4 className="text-lg font-bold">Follow Us</h4>
          <div className="flex">
            <img src={socialMedia1} alt="Social Media 1" className="w-8 h-8 mr-2 transition-transform duration-300 transform hover:scale-125" />
            <img src={socialMedia2} alt="Social Media 2" className="w-8 h-8 mr-2 transition-transform duration-300 transform hover:scale-125" />
            <img src={cameraImage} alt="Camera" className="w-8 h-8 transition-transform duration-300 transform hover:scale-125" />
          </div>
        </div>
      </div>
      <div className="text-center text-sm mt-2 transition-opacity duration-300 hover:opacity-80">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  </div>
);

export default ContactUs;
