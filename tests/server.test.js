const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const fs = require('fs').promises;
const path = require('path');

jest.setTimeout(30000); // Increase timeout to 30 seconds

describe('Book API', () => {
  let createdBookId;

  beforeAll(async () => {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost/noteverse-test');
    console.log('Connected to MongoDB');
  });

  afterAll(async () => {
    console.log('Closing MongoDB connection...');
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  });

  test('POST /api/upload-book - Upload a new book', async () => {
    console.log('Starting upload book test...');
    const response = await request(app)
      .post('/api/upload-book')
      .field('name', 'Test Book')
      .field('author', 'Test Author')
      .field('publishingDate', '2023-01-01')
      .field('rating', '4')
      .attach('file', 'tests/test-files/test.pdf');

    console.log('Upload response status:', response.statusCode);
    console.log('Upload response body:', response.body);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    createdBookId = response.body._id;
    console.log('Created book ID:', createdBookId);
  });

  test('GET /api/books/:id - Get a single book', async () => {
    const response = await request(app).get(`/api/books/${createdBookId}`);
    
    console.log('Response status:', response.statusCode);
    console.log('Response body:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id', createdBookId);
    expect(response.body).toHaveProperty('name', 'Test Book');
    expect(response.body).toHaveProperty('author', 'Test Author');
  });

  test('PUT /api/books/:id - Edit an existing book', async () => {
    const response = await request(app)
      .put(`/api/books/${createdBookId}`)
      .send({ name: 'Updated Test Book' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated Test Book');
  });

  test('GET /api/books - Get all books', async () => {
    const response = await request(app).get('/api/books');
    console.log('All books:', response.body);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('DELETE /api/books/:id - Delete a book and its files', async () => {
    const response = await request(app).delete(`/api/books/${createdBookId}`);
    expect(response.statusCode).toBe(200);

    // Verify that the file has been deleted
    if (response.body.filePath) {
      const filePath = path.join(__dirname, '..', response.body.filePath);
      try {
        await fs.access(filePath);
        throw new Error('File still exists');
      } catch (error) {
        expect(error.code).toBe('ENOENT'); // ENOENT means file does not exist
      }
    }

    // Verify that the book no longer exists in the database
    const getResponse = await request(app).get(`/api/books/${createdBookId}`);
    expect(getResponse.statusCode).toBe(404);
  });
});