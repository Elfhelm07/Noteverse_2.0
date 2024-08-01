import React from 'react';
import signupStyles from './signup.module.css'; // Import CSS module
import logo from "./images/logo.png";
import mainPhoto from "./images/mainPhoto.png";
import appleLogo from "./images/appleLogo.png";
import facebookLogo from "./images/facebookLogo.png";
import googleLogo from "./images/googleLogo.png";

const SignUp = () => {
  return (
    <div className={signupStyles.signUpContainer} id="siginUpContainer"> 
      <div id="leftContainer" className={signupStyles.leftContainer}>
        <img
          alt="Img not found"
          className={signupStyles.logo}
          id="logo"
          src={logo}
        />
        <h1 className={signupStyles.logoHeading} id="logoHeading">Note-Verse</h1>
        <p
          className={signupStyles.logoSlogan}
          id="logoSlogan"
        >
          Let's get started!
        </p>

        <h1 className={signupStyles.signUp} id="signUp">Sign Up</h1>
        <div className={signupStyles.formContainer} id="formContainer">
          <form
            action=""
            className={signupStyles.signupForm}
            id="signUpForm"
            method="post"
          >
            <input
              className={signupStyles.inputField}
              id="emailInput"
              name="email"
              placeholder="Email"
              type="email"
            />
            <input
              className={signupStyles.inputField}
              id="passwordInput"
              name="password"
              placeholder="Create Password"
              type="password"
            />
            <input
              className={signupStyles.inputField}
              id="confirmPasswordInput"
              name="confirm-password"
              placeholder="Confirm Password"
              type="password"
            />
            <button
              className={signupStyles.submitButton}
              id="submitButton"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>

        <div className={signupStyles.loginLinkContainer} id="loginLinkContainer">
          <h3 className={signupStyles.loginLine} id="loginLine">Already have an account?</h3>
          <a
            className={signupStyles.loginLink}
            href="./login.html"
            id="loginLink"
          >
            Login
          </a>
        </div>

        <h3 className={signupStyles.or} id="or">Or</h3>

        <div className={signupStyles.imageLinkContainer} id="imageLinkContainer">
          <a href="">
            <img
              alt=""
              id="appleLogo"
              src={appleLogo}
            />
          </a>
          <a href="">
            <img
              alt=""
              id="facebookLogo"
              src={facebookLogo}
            />
          </a>
          <a href="">
            <img
              alt=""
              id="googleLogo"
              src={googleLogo}
            />
          </a>
        </div>
      </div>

      <div className={signupStyles.rightContainer} id="rightContainer">
        <img
          alt="Img not found"
          className={signupStyles.mainPhoto}
          id="mainPhoto"
          src={mainPhoto}
        />
      </div>
    </div>
  );
}

export default SignUp;
