const Book = require('../models/Book');

// Fetch all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search books by title
exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    const books = await Book.find({ title: new RegExp(query, 'i') });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch a book by ID
exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
