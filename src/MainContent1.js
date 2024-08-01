// MainContent.js

import React from 'react';
import styles from './Header1.module.css'; // Import CSS module

function MainContent() {
  // Define array of book data
  const bookArray = [
    {
      title: "Reaper's Gale",
      author: "Steven Erikson",
      image: "book-cover.png"
    },
    {
      title: "Cather",
      author: "Author Name",
      image: "cather.png"
    },
    {
      title: "Gatsby",
      author: "Author Name",
      image: "gastsby.png"
    },
    {
      title: "Image",
      author: "Author Name",
      image: "image.png"
    },
    {
      title: "Mocking",
      author: "Author Name",
      image: "mocking.png"
    },
    {
      title: "Pride",
      author: "Author Name",
      image: "pride.png"
    },
    // Add more book objects as needed
  ];

  return (
    <main className={styles['main-content']} id="bookList">
      {/* Render books using map function */}
      {bookArray.map((bookArray, index) => (
        <div className={styles['book-info']} key={index}>
          <div className={styles['book-content']}>
            {/* Adjust image path based on public folder */}
            <img src={`/images/${bookArray.image}`} alt="Book Cover" />
            <div className={styles['book-des']}>
              <p className={styles['book-title']}>{bookArray.title}</p>
              <p className={styles['author-name']}>{bookArray.author}</p>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}

export default MainContent;
