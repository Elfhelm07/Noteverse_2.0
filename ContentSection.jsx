import React from 'react';
import gifImage3 from '../images/gif2.gif';

const ContentSection = ({ idProp, imageProp, titleProp, textProp }) => (
  <section className="flex flex-wrap justify-between items-center p-5 min-h-[600px] bg-black overflow-hidden animate-fade-in">
    <h4 className="text-xl font-semibold text-[#8C52FF] mb-4">{idProp}</h4>
    <div className="flex flex-col items-center bg-[#8C52FF] text-white text-center rounded-3xl p-5 w-[90%] max-w-[600px] transition-transform duration-300 transform hover:scale-105 overflow-hidden">
      <img src={imageProp} alt="Icon" className="w-[80px] mb-5 max-w-full transition-transform duration-300 transform hover:scale-125" />
      <h2 className="text-2xl font-bold mb-3 transition-opacity duration-300 hover:opacity-80">{titleProp}</h2>
      <p className="text-xl m-0 transition-opacity duration-300 hover:opacity-80">{textProp}</p>
    </div>
    <div className="w-[50%] overflow-hidden ml-5 transition-transform duration-500 transform hover:scale-105">
      <img src={gifImage3} alt="GIF" className="w-full h-auto transition-transform duration-500" />
    </div>
  </section>
);

const styles = `
  @keyframes fade-in {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fade-in 0.5s ease forwards;
  }
`;

export default ContentSection;
