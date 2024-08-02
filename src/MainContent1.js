import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MainContent1.module.css';
import EditBookModal from './EditBookModal';

function MainContent() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/books');
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Error fetching books. Please try again later.');
      setLoading(false);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleDelete = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`http://localhost:3001/api/books/${bookId}`);
        fetchBooks(); // Refresh the book list
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Error deleting book. Please try again.');
      }
    }
  };

  const handleCloseEdit = () => {
    setEditingBook(null);
    fetchBooks(); // Refresh the book list after editing
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <main className={styles.mainContent} id="bookList">
      {books.length === 0 ? (
        <div className={styles.noBooks}>No books available. Try uploading some!</div>
      ) : (
        <div className={styles.bookGrid}>
          {books.map((book) => (
            <div className={styles.bookCard} key={book._id}>
              <div className={styles.bookHeader}>
                <h3 className={styles.bookTitle}>{book.name}</h3>
                <div className={styles.bookMenu}>
                  <button onClick={() => handleEdit(book)}>⋮</button>
                  <div className={styles.bookMenuOptions}>
                    <button onClick={() => handleEdit(book)}>Edit</button>
                    <button onClick={() => handleDelete(book._id)}>Delete</button>
                  </div>
                </div>
              </div>
              <div className={styles.bookCover}>
                {book.coverImage ? (
                  <img src={`http://localhost:3001/${book.coverImage}`} alt={`${book.name} cover`} />
                ) : (
                  <div className={styles.noCover}>No Cover</div>
                )}
              </div>
              <div className={styles.bookInfo}>
                <p className={styles.bookAuthor}>by {book.author}</p>
                <p className={styles.bookDate}>Published: {new Date(book.publishingDate).toLocaleDateString()}</p>
                <div className={styles.bookRating}>
                  Rating: {book.rating}/5
                  <span className={styles.stars}>
                    {'★'.repeat(Math.round(book.rating))}
                    {'☆'.repeat(5 - Math.round(book.rating))}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {editingBook && <EditBookModal book={editingBook} onClose={handleCloseEdit} />}
    </main>
  );
}

export default MainContent;