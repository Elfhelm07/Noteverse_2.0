import React, { useState } from 'react';
import axios from 'axios';

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            name="name"
            value={editedBook.name}
            onChange={handleInputChange}
            placeholder="Book Name"
            required
            className="mb-3 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="author"
            value={editedBook.author}
            onChange={handleInputChange}
            placeholder="Author Name"
            required
            className="mb-3 p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            name="publishingDate"
            value={editedBook.publishingDate.split('T')[0]}
            onChange={handleInputChange}
            required
            className="mb-3 p-2 border border-gray-300 rounded"
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
            className="mb-3 p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded mb-2 hover:bg-blue-600">
            Save Changes
          </button>
          <button type="button" onClick={onClose} className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBookModal;
