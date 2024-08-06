import gifImage3 from '../images/gif2.gif';

const ContentSection = ({ idProp, imageProp, titleProp, textProp }) => (
  <section className="flex flex-wrap justify-between items-center p-5 min-h-[600px]">
    <h4 className="text-xl font-semibold">{idProp}</h4>
    <div className="flex flex-col items-center bg-[#8C52FF] text-white text-center rounded-3xl p-5 w-[90%] max-w-[600px] overflow-hidden">
      <img src={imageProp} alt="Dashboard" className="w-[80px] mb-5 max-w-full" />
      <h2 className="text-2xl font-bold mb-3">{titleProp}</h2>
      <p className="text-3xl m-0">{textProp}</p>
    </div>
    <div className="w-[50%] overflow-hidden ml-5">
      <img src={gifImage3} alt="GIF" className="w-full h-auto" />
    </div>
  </section>
);

export default ContentSection;
