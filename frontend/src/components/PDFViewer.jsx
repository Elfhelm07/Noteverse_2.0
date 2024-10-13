import React, { useState, useEffect, useRef } from 'react';
import * as pdfjs from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';
import axios from 'axios';

// Set the worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PDFViewer({ bookId, onClose }) {
  const [pdf, setPdf] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarkPopup, setShowBookmarkPopup] = useState(false);
  const [bookmarkText, setBookmarkText] = useState('');
  const canvasRef = useRef(null);

  useEffect(() => {
    fetchBookAndRender();
    fetchBookmarks();
  }, [bookId]);

  const fetchBookAndRender = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/books/${bookId}`);
      const book = response.data;
      const loadingTask = pdfjs.getDocument(`http://localhost:3001/${book.filePath}`);
      const pdf = await loadingTask.promise;
      setPdf(pdf);
      renderPage(1);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/books/${bookId}/bookmarks`);
      setBookmarks(response.data);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  const renderPage = async (num) => {
    const page = await pdf.getPage(num);
    const scale = 1.5;
    const viewport = page.getViewport({ scale });
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    await page.render(renderContext);
  };

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(prevPageNumber => prevPageNumber - 1);
      renderPage(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < pdf.numPages) {
      setPageNumber(prevPageNumber => prevPageNumber + 1);
      renderPage(pageNumber + 1);
    }
  };

  const handleAddBookmark = async () => {
    try {
      await axios.post(`http://localhost:3001/api/books/${bookId}/bookmarks`, {
        text: bookmarkText,
        page: pageNumber
      });
      setShowBookmarkPopup(false);
      setBookmarkText('');
      fetchBookmarks();
    } catch (error) {
      console.error('Error adding bookmark:', error);
    }
  };

  const handleGoToBookmark = (page) => {
    setPageNumber(page);
    renderPage(page);
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <button onClick={onClose} className="text-xl">← Library</button>
        <div className="flex items-center">
          <button onClick={() => setShowBookmarkPopup(true)} className="mr-4">Bookmark</button>
          <select onChange={(e) => handleGoToBookmark(Number(e.target.value))} className="bg-gray-700 text-white">
            <option value="">Bookmarks</option>
            {bookmarks.map((bookmark, index) => (
              <option key={index} value={bookmark.page}>{bookmark.text} (Page {bookmark.page})</option>
            ))}
          </select>
        </div>
      </nav>
      <div className="flex-grow overflow-auto flex justify-center items-start p-4">
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="bg-gray-200 p-4 flex justify-between items-center">
        <button onClick={handlePrevPage} disabled={pageNumber <= 1}>Previous</button>
        <span>Page {pageNumber} of {pdf?.numPages || 'N/A'}</span>
        <button onClick={handleNextPage} disabled={pageNumber >= (pdf?.numPages || 1)}>Next</button>
      </div>
      {showBookmarkPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded">
            <input
              type="text"
              value={bookmarkText}
              onChange={(e) => setBookmarkText(e.target.value)}
              placeholder="Enter bookmark text"
              className="border p-2 mb-2 w-full"
            />
            <div className="flex justify-end">
              <button onClick={() => setShowBookmarkPopup(false)} className="mr-2">Cancel</button>
              <button onClick={handleAddBookmark} className="bg-blue-500 text-white px-4 py-2 rounded">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PDFViewer;
