const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const pdf = require('pdf-poppler');
const fs = require('fs').promises; // Add this at the top of your file if not already present

const app = express();
app.use(cors()); // Added this line to enable CORS
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB for both test and non-test environments
const mongoURI = process.env.NODE_ENV === 'test' 
  ? (process.env.MONGO_URI || 'mongodb://localhost/noteverse-test')
  : 'mongodb://localhost/noteverse';

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

const BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  publishingDate: Date,
  rating: Number,
  filePath: String,
  coverImage: String,
  bookmarks: { type: [Number], default: [] }, // Add this line
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
    console.log('Received upload request');
    const { name, author, publishingDate, rating } = req.body;
    const filePath = req.file.path;
    
    console.log('File uploaded:', filePath);
    
    let coverImage = '';
    if (process.env.NODE_ENV !== 'test' && path.extname(filePath).toLowerCase() === '.pdf') {
      const opts = {
        format: 'png',
        out_dir: path.dirname(filePath),
        out_prefix: path.basename(filePath, '.pdf'),
        page: 1
      }
      
      await pdf.convert(filePath, opts);
      coverImage = `uploads/${opts.out_prefix}-001.png`;
    } 

    const book = new Book({
      name,
      author,
      publishingDate,
      rating,
      filePath,
      coverImage,
    });

    console.log('Saving book to database...');
    await book.save();
    console.log('Book saved successfully');
    res.status(201).json(book);
  } catch (error) {
    console.error('Error uploading book:', error);
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
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const filePath = book.filePath;
    const coverImage = book.coverImage;

    // Delete the associated file
    if (filePath) {
      try {
        await fs.unlink(filePath);
        console.log(`Deleted file: ${filePath}`);
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.warn(`File not found, skipping deletion: ${filePath}`);
        } else {
          console.error(`Error deleting file: ${error.message}`);
        }
      }
    }

    // Delete the cover image if it exists
    if (coverImage) {
      try {
        await fs.unlink(coverImage);
        console.log(`Deleted cover image: ${coverImage}`);
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.warn(`File not found, skipping deletion: ${coverImage}`);
        } else {
          console.error(`Error deleting cover image: ${error.message}`);
        }
      }
    }

    // Remove the book from the database
    await Book.findByIdAndDelete(req.params.id);
    
    res.json({ message: 'Book and associated files deleted successfully', filePath, coverImage });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Error deleting book' });
  }
});

// Get a single book
app.get('/api/books/:id', async (req, res) => {
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

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;