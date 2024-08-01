import React from 'react';
import gifImage3 from './images/gif2.gif';
import './ContentSection.css';


const ContentSection = ({
  idProp,
   imageProp, 
   titleProp, 
   textProp 
}) => (
  <section className="content-section">
    <h4> {idProp} </h4>
    <div className="text-div">
      <img src={imageProp} alt="Dashboard"/>
      <h2>{titleProp}</h2>
      <p>{textProp}</p>
    </div>
    <div className="image-div">
      <img src={gifImage3} alt="GIF"/>
    </div>
  </section>
);

export default ContentSection;