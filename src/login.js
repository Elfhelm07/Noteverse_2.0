import React from 'react';
import loginStyle from './login.module.css'; // Import CSS module
import logo1 from "./images/logo.png"
import googleLogo from "./images/googleLogo.png"
import facebookLogo from "./images/facebookLogo.png"
import appleLogo from "./images/appleLogo.png"
import mainPhoto from "./images/WhatsApp Image 2024-05-03 at 19.32.10_42a3cd0a.jpg"

const Login = () => {
  return (
    <div className={loginStyle.main_container} id="mainContainer">
      <div className={loginStyle.left_container} id="leftContainer">
        <img
          className={loginStyle.logo}
          id="logo"
          src={logo1}
          alt="Img not found"
        />
        <h1
          className={loginStyle.logoHeading}
          id="logoHeading"
        >
          Note-Verse
        </h1>
        <p
          className={loginStyle.logo_slogan}
          id="logoSlogan"
        >
          Let's get started!
        </p>

        <h1
          className={loginStyle.signUp}
          id="signIn"
        >
          Log In
        </h1>
        <div
          className={loginStyle.form_container}
          id="formContainer"
        >
          <form
            className={loginStyle.signup_form}
            id="signInForm"
            action=""
            method="post"
          >
            <input
              className={loginStyle.inputField}
              id="email"
              name="email"
              placeholder="Email"
              type="email"
            />
            <input
              className={loginStyle.inputField}
              id="password"
              name="password"
              placeholder="Password"
              type="password"
            />
            <button
              className={loginStyle.submitButton}
              type="submit"
            >
              Login
            </button>
          </form>
        </div>

        <div
          className={loginStyle.login_link_container}
          id="loginLinkContainer"
        >
          <h3
            className={loginStyle.loginLine}
            id="loginLine"
          >
            Don't have an account?
          </h3>
          <a
            className={loginStyle.loginLink}
            id="loginLink"
            href="./signUp.html"
          >
            Sign Up
          </a>
        </div>

        <h3
          className={loginStyle.or}
          id="or"
        >
          Or
        </h3>

        <div
          className={loginStyle.image_link_container}
          id="imageLinkContainer"
        >
          <a href="">
            <img
              className={loginStyle.googleLogo}
              id="googleLogo"
              src={googleLogo}
              alt=""
            />
          </a>
          <a href="">
            <img
              className={loginStyle.facebookLogo}
              id="facebookLogo"
              src={facebookLogo}
              alt=""
            />
          </a>
          <a href="">
            <img
              className={loginStyle.appleLogo}
              id="appleLogo"
              src={appleLogo}
              alt=""
            />
          </a>
        </div>
      </div>

      <div
        className={loginStyle.right_container}
        id="rightContainer"
      >
        <img
          className={loginStyle.mainPhoto}
          id="mainPhoto"
          src={mainPhoto}
          alt="Img not found"
        />
      </div>
    </div>
  );
}

export default Login;
