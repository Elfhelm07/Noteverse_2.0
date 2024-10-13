import React from 'react';
import gifImage2 from '../images/Untitled design.gif';
import dashboardImage from '../images/dashboard_12177001.png';
const AboutUs = () => (
  <section id="about-us" className="flex flex-wrap justify-between items-center p-5 min-h-[400px]">
    <div className="mr-5 w-[40%] overflow-hidden">
      <div className="relative">
        <img 
          src={gifImage2} 
          alt="GIF" 
          className="w-full h-auto transition-opacity duration-500" 
        />
      </div>
    </div>
    <div className="w-full max-w-[700px] bg-gradient-to-r from-purple-600 to-purple-400 transition-transform duration-500 transform hover:scale-105 hover:rotate-2 text-center text-white rounded-[30px] flex flex-col items-center p-5 overflow-hidden mx-auto mt-12">
      <div className="relative transition-transform duration-500 transform hover:scale-110 hover:rotate-2 mb-6">
        <img 
          src={dashboardImage} 
          alt="Dashboard" 
          className="w-[60px] max-w-full transition-transform duration-300 transform hover:scale-125" 
        />
      </div>
      <p className="text-[25px] leading-relaxed m-0 transition-opacity duration-300 hover:opacity-80">
        Experience the transformative power of our platform, designed to simplify your reading journey. Say goodbye to scattered documents as we organize your reading materials, keeping them always at your fingertips. With centralized document storage, seamless synchronization, and intuitive annotation tools, unlock the full potential of your reading experience anytime, anywhere.
      </p>
    </div>
  </section>
);
export default AboutUs;
