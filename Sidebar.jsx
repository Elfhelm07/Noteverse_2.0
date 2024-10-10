import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

const menuItemsArray = [
  { icon: 'fas fa-home', text: 'Home', link: '#' },
  { icon: 'fas fa-book', text: 'Library', link: '#' },
  { icon: 'fas fa-sticky-note', text: 'Notes', link: '#' },
  { icon: 'fas fa-cloud-upload-alt', text: 'Upload', link: '#' },
];

const footerItemArray = [
  { icon: 'fas fa-user', text: 'My Profile', link: '#' },
];

function Sidebar({ onPageChange }) {
  const handleClick = (e, page) => {
    e.preventDefault();
    onPageChange(page.toLowerCase());
  };

  return (
    <aside id="sidebar" className="bg-[#1c1c39] text-white p-5 overflow-y-auto transition-transform duration-300 ease-in-out">
      <nav>
        <h2 id="site-title" className="text-2xl font-bold">
          4Sync/
        </h2>
        <div id="menu-heading" className="pt-14 pl-5 mb-2">
          <h3 id="menu-title" className="text-lg font-medium">Menu</h3>
          <hr id="menu-line" className="mt-1 mb-2 border-t border-gray-600" />
        </div>
        <ul id="menu-list" className="list-none pl-5">
          {menuItemsArray.map(({ icon, text, link }, index) => (
            <li key={text} className="mb-2 text-sm">
              <a
                href={link}
                onClick={(e) => handleClick(e, text)}
                className="flex items-center text-white hover:text-gray-300"
              >
                <i aria-hidden="true" className={`mr-3 ${icon}`}></i> {text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <footer className="mt-auto pt-12">
        <h3 id="preferences" className="text-lg font-medium pl-4 mb-2">Preferences</h3>
        <hr id="heading-line" className="ml-4 mb-2 border-t border-gray-600" />
        <ul id="footer-list" className="list-none pl-5">
          {footerItemArray.map(({ icon, text, link }, index) => (
            <li key={text} className="mb-2 text-sm">
              <a
                href={link}
                onClick={(e) => e.preventDefault()} // Prevent default, but ensure this is intended
                className="flex items-center text-white hover:text-gray-300"
              >
                <i aria-hidden="true" className={`mr-3 ${icon}`}></i> {text}
              </a>
            </li>
          ))}
        </ul>
      </footer>
    </aside>
  );
}

export default Sidebar;
