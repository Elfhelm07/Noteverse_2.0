const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const Book = require('../models/Book'); // Assuming you'll create this model file

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = ['.pdf', '.epub', '.mobi'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, EPUB, and MOBI are allowed.'));
    }
  }
}).single('file');

router.post('/upload-book', (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(400).json({ error: 'Invalid file format. Only PDF, EPUB, and MOBI are allowed.' });
    }

    try {
      const { name, author, publishingDate, rating } = req.body;

      if (!name || !author || !publishingDate || !rating) {
        return res.status(400).json({ error: 'Validation failed. Name, author, publishingDate, and rating are required.' });
      }

      if (isNaN(rating) || rating < 0 || rating > 5) {
        return res.status(400).json({ error: 'Validation failed. Rating must be a number between 0 and 5.' });
      }

      const filePath = req.file.path;
      const coverImage = ''; // Set a default or implement cover image logic

      const book = new Book({
        name,
        author,
        publishingDate,
        rating,
        filePath,
        coverImage,
      });

      await book.save();
      res.status(201).json(book);
    } catch (error) {
      console.error('Error uploading book:', error);
      res.status(500).json({ error: 'Error uploading book' });
    }
  });
});

router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Error fetching books' });
  }
});

router.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Error fetching book' });
  }
});

router.put('/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Error updating book' });
  }
});

router.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (book.filePath) {
      await fs.unlink(book.filePath);
    }

    if (book.coverImage) {
      await fs.unlink(book.coverImage);
    }

    await Book.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Book and associated files deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Error deleting book', details: error.message });
  }
});

module.exports = router;