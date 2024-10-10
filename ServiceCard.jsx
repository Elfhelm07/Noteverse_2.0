import React from 'react';

const ServiceCard = ({ image, title, text }) => (
  <div className="transition-transform transform hover:scale-105 bg-gray-800 rounded-lg overflow-hidden shadow-lg h-100 w-80">
    <img src={image} alt={title} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="mt-2 text-gray-400">{text}</p>
    </div>
  </div>
);

export default ServiceCard;
