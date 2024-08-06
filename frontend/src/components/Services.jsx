import React from 'react';
import deviceImage from '../images/device1.png';
import img2 from '../images/img2.png';
import book2 from '../images/book2.png';
import ServiceCard from './ServiceCard';

const Services = () => (
  <section className="bg-black py-16 min-h-[650px] flex flex-col items-center">
    <h1 className="text-[#8C52FF] text-4xl mb-5">What's Inside?</h1>
    <div className="flex justify-center text-white">
      <ServiceCard 
        image={deviceImage} 
        title="ANY DEVICE" 
        text="Read your eBooks on any device! With our beautifully designed apps for Android, iOS and Web, we give you the freedom of reading on any device wherever life takes you." 
      />
      <ServiceCard 
        image={img2} 
        title="Organize and manage your ebooks" 
        text="Your digital library is now at your fingertips. Organize eBooks by author, genre and custom tags to find the perfect book with ease!" 
      />
      <ServiceCard 
        image={book2} 
        title="PICK WHERE YOU LEFT" 
        text="Continue exactly where you left off when you switch devices. Never lose track of your reading progress." 
      />
    </div>
  </section>
);

export default Services;
