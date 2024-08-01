import React from 'react';
import './Servicecard.css';


const ServiceCard = ({ image, title, text }) => (
  <div className="card">
    <img src={image} alt={title}/>
    <h4 style={{textAlign: 'center', color: '#8C52FF'}}>{title}</h4>
    <div className="card-text">
      <p style={{fontSize: '1.2rem'}}>{text}</p>
    </div>
  </div>
);

export default ServiceCard;