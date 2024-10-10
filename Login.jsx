import logo1 from "../images/logo.png";
import googleLogo from "../images/googleLogo.png";
import facebookLogo from "../images/facebookLogo.png";
import appleLogo from "../images/appleLogo.png";
import mainPhoto from "../images/WhatsApp Image 2024-05-03 at 19.32.10_42a3cd0a.jpg";


const Login = () => {
  return (
    <div className="flex h-screen bg-[#1C1C39] text-white">
      <div className="flex-1 flex flex-col justify-center items-center p-8 relative z-10">
        <img
          className="h-16 w-16 mb-4"
          src={logo1}
          alt="Logo"
        />
        <h1 className="text-[#FDDBBE] text-4xl font-semibold mb-2">
          Note-Verse
        </h1>
        <p className="text-white text-lg mb-8">
          Let's get started!
        </p>
        <h1 className="text-[#FDDBBE] text-2xl font-medium mb-8">
          Log In
        </h1>
        <form className="w-full max-w-md">
          <input
            className="w-full h-12 mb-4 px-4 border border-white rounded-md bg-transparent text-white"
            name="email"
            placeholder="Email"
            type="email"
          />
          <input
            className="w-full h-12 mb-4 px-4 border border-white rounded-md bg-transparent text-white"
            name="password"
            placeholder="Password"
            type="password"
          />
          <button
            className="w-full h-12 bg-[#593EA1] text-[#FDDBBE] border-2 border-[#593EA1] rounded-lg text-lg font-semibold mt-4"
            type="submit"
          >
            Login
          </button>
        </form>
        <div className="flex flex-col items-center mt-6">
          <h3 className="text-white text-sm font-light mb-2">
            Don't have an account?
          </h3>
          <a
            className="text-[#FDDBBE] text-sm font-semibold"
            href="./signUp.html"
          >
            Sign Up
          </a>
        </div>
        <h3 className="text-white text-base font-normal text-center mt-8 mb-4">
          Or
        </h3>
        <div className="flex space-x-4">
          <a href="#">
            <img
              className="h-8 w-8"
              src={googleLogo}
              alt="Google Logo"
            />
          </a>
          <a href="#">
            <img
              className="h-12 w-12"
              src={facebookLogo}
              alt="Facebook Logo"
            />
          </a>
          <a href="#">
            <img
              className="h-10 w-10"
              src={appleLogo}
              alt="Apple Logo"
            />
          </a>
        </div>
      </div>
      <div className="hidden lg:flex lg:flex-none lg:w-1/2 relative z-0">
        <img
          className="w-full h-full object-cover"
          src={mainPhoto}
          alt="Main"
        />
      </div>
    </div>
  );
}

export default Login;
