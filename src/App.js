import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Header from './Header';
import AboutUs from './AboutUs';
import Services from './Services';
import ContentSection from './ContentSection';
import ContactUs from './ContactUs';
import Dashboard from './Dashboard';
import Login from './login';
import Signup from './Signup';
import "./style.css"

const contentPropsArray = {
  titleProp: "We'll help perfect your business model: Optimizing Strategies for Success",
};

const validPages = ["home", "login", "signup", "library"];

function App() {
  const [page, setPage] = useState("home");

  useEffect(() => {
    if (!validPages.includes(page.toLowerCase())) {
      setPage("home");
      alert("Invalid page set. Redirected to Home.");
    }
  }, [page]);

  const handleNavbarClick = (newPage) => {
    setPage(newPage.toLowerCase());
  };

  return (
    <div id="app">
      {page !== "library" && <Navbar onsetPageProp={handleNavbarClick} />}
      {page === "login" && <Login />}
      {page === "signup" && <Signup />}
      {page === "home" && (
        <>
          <Header />
          <AboutUs />
          <Services />
          <ContentSection {...contentPropsArray} />
          <ContactUs id="contact-us" />
        </>
      )}
      {page === "library" && (
        <Dashboard onPageChange={setPage} />
      )}
    </div>
  );
}

export default App;
