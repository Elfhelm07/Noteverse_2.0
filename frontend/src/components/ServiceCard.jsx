import React from 'react';

const ServiceCard = ({ image, title, text }) => (
  <div className="bg-black h-[650px] pt-[60px] flex justify-center">
    <div className="bg-[#2b2828] border border-[#ccc] rounded-lg overflow-hidden m-2 w-[330px] h-[380px] flex flex-col items-center text-white animate-card">
      <img src={image} alt={title} className="w-[100px] h-[100px] mb-5 mt-2" />
      <h4 className="text-[#8C52FF] text-center">{title}</h4>
      <div className="p-2 text-center">
        <p className="text-[1.2rem]">{text}</p>
      </div>
    </div>
  </div>
);

export default ServiceCard;
