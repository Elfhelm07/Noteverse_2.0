const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
// const pdf = require('pdf-poppler');

const fs = require('fs').promises;
require('dotenv').config();

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'https://02qrjo-5173.ocws.app'],
  credentials: true
}));
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static('uploads'));

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
}).single('file');

app.post('/api/upload-book', (req, res) => {
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
      
      console.log('File uploaded:', filePath);
      
      let coverImage = '';
      if (process.env.NODE_ENV !== 'test' && path.extname(filePath).toLowerCase() === '.pdf') {
        // Commenting out pdf-poppler code for now
        
        // const opts = {
        //   format: 'png',
        //   out_dir: path.dirname(filePath),
        //   out_prefix: path.basename(filePath, '.pdf'),
        //   page: 1
        // }
        
        // await pdf.convert(filePath, opts);
        // coverImage = `uploads/${opts.out_prefix}-1.png`;
        
        coverImage = ''; 
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

app.put('/api/books/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Error updating book' });
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    console.log(`Attempting to delete book with ID: ${req.params.id}`);
    
    const book = await Book.findById(req.params.id);
    if (!book) {
      console.log(`Book with ID ${req.params.id} not found`);
      return res.status(404).json({ error: 'Book not found' });
    }

    const filePath = book.filePath;
    const coverImage = book.coverImage;

    if (filePath) {
      try {
        await fs.unlink(filePath);
        console.log(`Deleted file: ${filePath}`);
      } catch (fileError) {
        console.error(`Error deleting file ${filePath}:`, fileError);
      }
    }

    if (coverImage) {
      try {
        await fs.unlink(coverImage);
        console.log(`Deleted cover image: ${coverImage}`);
      } catch (imageError) {
        console.error(`Error deleting cover image ${coverImage}:`, imageError);
      }
    }

    const deleteResult = await Book.findByIdAndDelete(req.params.id);
    if (deleteResult) {
      console.log(`Book with ID ${req.params.id} successfully deleted from database`);
    } else {
      console.log(`Failed to delete book with ID ${req.params.id} from database`);
    }
    
    res.json({ message: 'Book and associated files deleted successfully', filePath, coverImage });
  } catch (error) {
    console.error('Error in delete book route:', error);
    res.status(500).json({ error: 'Error deleting book', details: error.message });
  }
});

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

async function connectToDatabase(uri) {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

function startServer(port) {
  return new Promise((resolve) => {
    const server = app.listen(port, '0.0.0.0', () => {
      console.log(`Server is running on port ${port}`);
      resolve(server);
    });
  });
}

async function initializeApp() {
  const mongoURI = process.env.NODE_ENV === 'test'
    ? (process.env.TEST_MONGO_URI || 'mongodb://localhost/noteverse-test')
    : (process.env.MONGO_DB_URI || 'mongodb://localhost/noteverse');

  await connectToDatabase(mongoURI);

  if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5000;
    await startServer(PORT);
  }
}

if (process.env.NODE_ENV !== 'test') {
  initializeApp();
}

module.exports = { app, connectToDatabase, startServer };