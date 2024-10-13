import React, { useState } from 'react';
import axios from 'axios';
function UploadBook() {
  const [bookData, setBookData] = useState({
    name: '',
    author: '',
    publishingDate: '',
    rating: '',
    file: null,
  });
  const [message, setMessage] = useState('');
  const handleInputChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    setBookData({ ...bookData, file: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in bookData) {
      formData.append(key, bookData[key]);
    }
    try {
      const response = await axios.post('https://02qrjo-5173.ocws.app/api/upload-book', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Book uploaded successfully!');
      console.log('Book uploaded successfully:', response.data);
      // Reset form
      setBookData({
        name: '',
        author: '',
        publishingDate: '',
        rating: '',
        file: null,
      });
    } catch (error) {
      setMessage('Error uploading book. Please try again.');
      console.error('Error uploading book:', error);
    }
  };
  return (
    <div className="p-5 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Upload a Book</h2>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={bookData.name}
          placeholder="Book Name"
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="author"
          value={bookData.author}
          placeholder="Author Name"
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          name="publishingDate"
          value={bookData.publishingDate}
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="rating"
          value={bookData.rating}
          min="1"
          max="5"
          placeholder="Rating"
          onChange={handleInputChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="file"
          name="file"
          accept=".pdf,.epub"
          onChange={handleFileChange}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
        >
          Upload Book
        </button>
      </form>
    </div>
  );
}
export default UploadBook;
