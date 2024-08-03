const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const pdf = require('pdf-poppler');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost/noteverse', { useNewUrlParser: true, useUnifiedTopology: true });

const BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  publishingDate: Date,
  rating: Number,
  filePath: String,
  coverImage: String,
});

const Book = mongoose.model('Book', BookSchema);

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
});

app.post('/api/upload-book', upload.single('file'), async (req, res) => {
  try {
    const { name, author, publishingDate, rating } = req.body;
    const filePath = req.file.path;
    
    // Generate cover image from the first page of the PDF
    let coverImage = '';
    if (path.extname(filePath).toLowerCase() === '.pdf') {
      const opts = {
        format: 'png',
        out_dir: path.dirname(filePath),
        out_prefix: path.basename(filePath, '.pdf'),
        page: 1
      }
      
      await pdf.convert(filePath, opts);
      coverImage = `uploads/${opts.out_prefix}-1.png`;
    }

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
    console.error(error);
    res.status(500).json({ error: 'Error uploading book' });
  }
});

app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Error fetching books' });
  }
});

// Update a book
app.put('/api/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Error updating book' });
  }
});

// Delete a book
app.delete('/api/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Error deleting book' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));