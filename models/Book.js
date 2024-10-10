const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  author_name: [String],
  cover_i: String,
  pdf_url: String // URL to the PDF file
});

// Check if the model already exists
const Book = mongoose.models.Book || mongoose.model('Book', bookSchema);

module.exports = Book;
