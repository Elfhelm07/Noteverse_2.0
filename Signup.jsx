import logo from "../images/logo.png";
import mainPhoto from "../images/mainPhoto.png";
import appleLogo from "../images/appleLogo.png";
import facebookLogo from "../images/facebookLogo.png";
import googleLogo from "../images/googleLogo.png";

const SignUp = () => {
  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <img alt="Logo" className="h-16 mb-4" src={logo} />
        <h1 className="text-4xl text-pink-200 mb-4">Note-Verse</h1>
        <p className="text-lg mb-8">Lets get started!</p>
        <h1 className="text-3xl text-pink-200 font-medium mb-6">Sign Up</h1>
        <form className="w-full max-w-md mx-auto">
          <input className="w-full bg-gray-800 border border-white rounded px-4 py-2 mb-4" placeholder="Email" type="email" />
          <input className="w-full bg-gray-800 border border-white rounded px-4 py-2 mb-4" placeholder="Create Password" type="password" />
          <input className="w-full bg-gray-800 border border-white rounded px-4 py-2 mb-4" placeholder="Confirm Password" type="password" />
          <button className="w-full bg-purple-700 border border-purple-700 rounded px-4 py-2 text-white text-lg">Sign Up</button>
        </form>
        <div className="mt-6 text-center">
          <h3 className="text-sm mb-2">Already have an account?</h3>
          <a className="text-pink-200" href="./login.html">Login</a>
        </div>
        <h3 className="text-lg mt-6 mb-2">Or</h3>
        <div className="flex justify-center space-x-4">
          <a href="#"><img alt="Apple" className="h-10" src={appleLogo} /></a>
          <a href="#"><img alt="Facebook" className="h-12" src={facebookLogo} /></a>
          <a href="#"><img alt="Google" className="h-10" src={googleLogo} /></a>
        </div>
      </div>
      <div className="flex-1">
        <img alt="Main" className="w-full h-full object-cover" src={mainPhoto} />
      </div>
    </div>
  );
}

export default SignUp;
