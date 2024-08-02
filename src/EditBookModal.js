import React, { useState } from 'react';
import axios from 'axios';
import styles from './EditBookModal.module.css';

function EditBookModal({ book, onClose }) {
  const [editedBook, setEditedBook] = useState(book);

  const handleInputChange = (e) => {
    setEditedBook({ ...editedBook, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/books/${book._id}`, editedBook);
      onClose();
    } catch (error) {
      console.error('Error updating book:', error);
      alert('Error updating book. Please try again.');
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={editedBook.name}
            onChange={handleInputChange}
            placeholder="Book Name"
            required
          />
          <input
            type="text"
            name="author"
            value={editedBook.author}
            onChange={handleInputChange}
            placeholder="Author Name"
            required
          />
          <input
            type="date"
            name="publishingDate"
            value={editedBook.publishingDate.split('T')[0]}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="rating"
            value={editedBook.rating}
            onChange={handleInputChange}
            min="1"
            max="5"
            placeholder="Rating"
            required
          />
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default EditBookModal;