const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  publishingDate: { type: Date, required: true },
  rating: { type: Number, required: true },
  filePath: { type: String, required: true },
  coverImage: { type: String },
  currentPage: { type: Number, default: 1 },
  bookmarks: { type: Map, of: String, default: {} }
});

module.exports = mongoose.models.Book || mongoose.model('Book', BookSchema);