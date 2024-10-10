import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import ContentSection from './components/ContentSection';
import ContactUs from './components/ContactUs';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import UploadBook from './components/UploadBook'; 
import PDFViewer from './components/PDFViewer';

const contentPropsArray = {
  titleProp: "We'll help perfect your business model: Optimizing Strategies for Success",
};

const validPages = ["home", "login", "signup", "library"];

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const isViewerPage = location.pathname.startsWith('/viewer');

  const handleNavbarClick = (page) => {
    if (validPages.includes(page)) {
      navigate(`/${page === 'home' ? '' : page}`);
    }
  };

  return (
    <div id="app">
      {!isViewerPage && <Navbar onsetPageProp={handleNavbarClick} />}
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <AboutUs />
            <Services />
            <ContentSection {...contentPropsArray} />
            <ContactUs id="contact-us" />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/library" element={<Dashboard currentPage="library" />} />
        <Route path="/upload" element={<Dashboard currentPage="upload" />} />
        <Route path="/viewer/:id" element={<PDFViewer />} />
      </Routes>
    </div>
  );
}

export default App;