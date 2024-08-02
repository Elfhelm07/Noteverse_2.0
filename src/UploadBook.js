import React, { useState } from 'react';
import axios from 'axios';
import styles from './Header1.module.css';

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
      const response = await axios.post('http://localhost:3001/api/upload-book', formData, {
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
    <div className={styles['upload-book-container']}>
      <h2>Upload a Book</h2>
      {message && <p className={styles['message']}>{message}</p>}
      <form onSubmit={handleSubmit} className={styles['upload-form']}>
        <input type="text" name="name" value={bookData.name} placeholder="Book Name" onChange={handleInputChange} required />
        <input type="text" name="author" value={bookData.author} placeholder="Author Name" onChange={handleInputChange} required />
        <input type="date" name="publishingDate" value={bookData.publishingDate} onChange={handleInputChange} required />
        <input type="number" name="rating" value={bookData.rating} min="1" max="5" placeholder="Rating" onChange={handleInputChange} required />
        <input type="file" name="file" accept=".pdf,.epub" onChange={handleFileChange} required />
        <button type="submit">Upload Book</button>
      </form>
    </div>
  );
}

export default UploadBook;