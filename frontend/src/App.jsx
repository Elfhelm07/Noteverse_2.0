import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import ContentSection from './components/ContentSection';
import ContactUs from './components/ContactUs';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import UploadBook from './components/UploadBook'; // Ensure correct path

const contentPropsArray = {
  titleProp: "We'll help perfect your business model: Optimizing Strategies for Success",
};

const validPages = ["home", "login", "signup", "library", "upload"];

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
      {(page !== "library" && page !== "upload") && (
        <>
          <Navbar onsetPageProp={handleNavbarClick} />
          {page === "home" && (
            <>
              <Header />
              <AboutUs />
              <Services />
              <ContentSection {...contentPropsArray} />
              <ContactUs id="contact-us" />
            </>
          )}
          {page === "login" && <Login />}
          {page === "signup" && <Signup />}
        </>
      )}
      {(page === "library" || page === "upload") && (
        <Dashboard onPageChange={setPage} currentPage={page} />
      )}
    </div>
  );
}

export default App;