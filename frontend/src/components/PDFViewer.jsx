import React, { useState, useEffect } from 'react';
import PDFObject from 'react-pdfobject';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function PDFViewer() {
  const { id } = useParams();
  const [bookmarks, setBookmarks] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchBookData();
    }
  }, [id]);

  const fetchBookData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/books/${id}`);
      const filePath = response.data.filePath.replace(/\\/g, '/');
      setFile(`http://localhost:3001/${filePath}`);
      setBookmarks(response.data.bookmarks || []);
    } catch (error) {
      console.error('Error fetching book data:', error);
    }
  };

  const addBookmark = async () => {
    // You'll need to implement a way to get the current page from PDFObject
    // For now, we'll just add a placeholder bookmark
    const newBookmark = bookmarks.length + 1;
    if (!bookmarks.includes(newBookmark)) {
      const updatedBookmarks = [...bookmarks, newBookmark];
      setBookmarks(updatedBookmarks);
      try {
        await axios.put(`http://localhost:3001/api/books/${id}`, { bookmarks: updatedBookmarks });
      } catch (error) {
        console.error('Error updating bookmarks:', error);
      }
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="top-bar" style={{ padding: '10px', background: '#f0f0f0' }}>
        <button onClick={() => navigate('/library')}>Library</button>
        <button onClick={addBookmark}>Bookmark</button>
        <div className="dropdown">
          <button className="dropbtn">Bookmarks</button>
          <div className="dropdown-content">
            {bookmarks.map((page, index) => (
              <a key={index} onClick={() => console.log(`Go to page ${page}`)}>Page {page}</a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        {file && <PDFObject url={file} height="100%" />}
      </div>
    </div>
  );
}

export default PDFViewer;