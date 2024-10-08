import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import EditBookModal from './EditBookModal';

function MainContent() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/books');
      setBooks(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Failed to fetch books. Please try again later.');
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`/books/${bookId}`);
      setBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));
    } catch (error) {
      console.error('Error deleting book:', error);
      setError('Failed to delete book. Please try again later.');
    }
  };

  const handleCloseEdit = () => {
    setEditingBook(null);
  };

  const handleBookUpdated = (updatedBook) => {
    setBooks(prevBooks => prevBooks.map(book => 
      book._id === updatedBook._id ? updatedBook : book
    ));
    setEditingBook(null);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="p-5">
      {books.length === 0 ? (
        <div className="text-center text-lg mt-5">No books available. Try uploading some!</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {books.map((book) => (
            <div key={book._id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-1">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-bold">{book.name}</h3>
                <div className="relative group">
                  <button className="text-xl cursor-pointer">⋮</button>
                  <div className="absolute right-0 top-full bg-white border border-gray-300 rounded-md hidden group-hover:flex flex-col z-10">
                    <button className="px-4 py-2 bg-transparent border-none text-left cursor-pointer hover:bg-gray-100" onClick={() => handleEdit(book)}>Edit</button>
                    <button className="px-4 py-2 bg-transparent border-none text-left cursor-pointer hover:bg-gray-100" onClick={() => handleDelete(book._id)}>Delete</button>
                  </div>
                </div>
              </div>
              <div className="h-48 overflow-hidden">
                {book.coverImage ? (
                  <img src={`http://localhost:3001/${book.coverImage}`} alt={`${book.name} cover`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">No Cover</div>
                )}
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-2">by {book.author}</p>
                {book.publishingDate && (
                  <p className="text-gray-500 text-sm mb-2">Published: {new Date(book.publishingDate).toLocaleDateString()}</p>
                )}
                {book.rating && (
                  <div className="flex items-center justify-between mt-2">
                    <span>Rating: {book.rating}/5</span>
                    <span className="text-yellow-500">
                      {'★'.repeat(Math.round(book.rating))}
                      {'☆'.repeat(5 - Math.round(book.rating))}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {editingBook && (
        <EditBookModal
          book={editingBook}
          onClose={handleCloseEdit}
          onBookUpdated={handleBookUpdated}
        />
      )}
    </main>
  );
}

export default MainContent;