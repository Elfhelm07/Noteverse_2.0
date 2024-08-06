
import contactUsImage from '../images/contactus.png';
import socialMedia1 from '../images/social-media_13716973.png';
import socialMedia2 from '../images/social-media_13716962.png';
import cameraImage from '../images/camera_8466655.png';


const ContactUs = () => (
  <section id="contact-us" className="flex flex-row justify-between items-center py-12 px-20 bg-black text-[#8C52FF]">
    <div className="flex-1 pr-16">
      <img src={contactUsImage} alt="Contact Us Img" className="max-w-full h-auto" />
    </div>
    <div className="flex-1 pr-16">
      <h2 className="mb-24">Contact Us</h2>
      <h3 className="mb-2">Phone</h3>
      <p className="text-white mb-5">+1 123-456-7890</p>
      <h3 className="mb-2">Email</h3>
      <p className="text-white mb-5">info@example.com</p>
      <h3 className="mb-2">Social</h3>
      <p>
        <img src={socialMedia1} alt="" className="mr-2" />
        <img src={socialMedia2} alt="" className="mr-2" />
        <img src={cameraImage} alt="" className="mr-2" />
      </p>
    </div>
  </section>
);

export default ContactUs;