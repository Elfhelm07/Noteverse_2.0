import React from 'react';

const HeroSection = ({ title = "<4Sync/>", description, imageUrl }) => (
  <div className="">
    <section className="py-16 bg-black sm:pb-20 lg:pb-24 xl:pb-28">
      <div className="px-6 mx-auto sm:px-8 lg:px-10 max-w-7xl">
        <div className="relative flex flex-col md:flex-row items-center">
          <div className="lg:w-2/3 animate-fade-in">
            <h1 className="mt-4 text-5xl font-normal text-white sm:mt-8 sm:text-6xl lg:text-7xl xl:text-8xl transition-transform transform hover:scale-105">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-purple-500">{title}</span>
            </h1>
            <p className="max-w-lg mt-6 text-xl font-normal text-gray-400 sm:mt-8 animate-slide-in">
              <b>{title}</b> is a web app and browser extension for seamless file synchronization, allowing users to access annotated files across devices and browsers effortlessly.
            </p>
            <div className="relative inline-flex items-center justify-center mt-10 sm:mt-12 group">
              <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:shadow-lg group-hover:shadow-cyan-500/50"></div>
              <a href="#" title="Learn More" className="relative inline-flex items-center justify-center px-10 py-3 text-base font-normal text-white bg-black border border-transparent rounded-full transition-transform duration-300 transform hover:scale-105">
                Learn More
              </a>
            </div>

            <div className="inline-flex items-center pt-8 mt-12 border-t border-gray-800 sm:pt-10 sm:mt-14">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 7.00003H21M21 7.00003V15M21 7.00003L13 15L9 11L3 17" stroke="url(#a)" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="a" x1="3" y1="7.00003" x2="22.2956" y2="12.0274" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" style={{ stopColor: 'var(--color-cyan-500)' }} />
                    <stop offset="100%" style={{ stopColor: 'var(--color-purple-500)' }} />
                  </linearGradient>
                </defs>
              </svg>
              <p className="text-sm font-normal tracking-widest text-gray-300 uppercase ml-2">
                <b>A Hub for Readers and Learners</b>
              </p>
            </div>
          </div>

          <div className="mt-8 md:mt-0 md:ml-10 animate-fade-in">
            <img className="w-full max-w-xs mx-auto lg:max-w-lg xl:max-w-xl" src={imageUrl || "https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/1/3d-illustration.png"} alt={title} />
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default HeroSection;
