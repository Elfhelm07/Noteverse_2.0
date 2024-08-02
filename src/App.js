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
import UploadBook from './UploadBook';

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
      {page !== "library" && page !== "upload" && page !== "home" && (
        <>
          <Navbar onsetPageProp={handleNavbarClick} />
          {page === "login" && <Login />}
          {page === "signup" && <Signup />}
        </>
      )}
      {(page === "library" || page === "upload" || page === "home") && (
        <Dashboard onPageChange={setPage} currentPage={page} />
      )}
    </div>
  );
}

export default App;