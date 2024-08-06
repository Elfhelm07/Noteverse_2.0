import React from 'react';
import gifImage2 from '../images/Untitled design.gif';
import dashboardImage from '../images/dashboard_12177001.png';

const AboutUs = () => (
  <section id="about-us" className="flex flex-wrap justify-between items-center p-5 min-h-[600px]">
    <div className="mr-5 w-1/2 overflow-hidden">
      <img src={gifImage2} alt="GIF" className="w-full h-auto" />
    </div>
    <div className="w-full max-w-[600px] text-center bg-[#8C52FF] text-white rounded-[30px] flex flex-col items-center p-5 overflow-hidden mx-auto">
      <img src={dashboardImage} alt="Dashboard" className="mb-5 w-[80px] max-w-full" />
      <p className="text-[25px] leading-relaxed m-0">
        Experience the transformative power of our platform, dedicated to simplifying your reading journey. Bid farewell to scattered documents as we seamlessly organize your reading materials, ensuring they're always at your fingertips. With centralized document storage, seamless synchronization, and intuitive annotation tools, unlock the full potential of your reading experience, anytime, anywhere.
      </p>
    </div>
  </section>
);

export default AboutUs;
