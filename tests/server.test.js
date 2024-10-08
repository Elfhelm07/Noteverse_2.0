const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app, connectToDatabase, startServer } = require('../index');
const Book = require('../models/Book');
const fs = require('fs').promises;
const path = require('path');

let mongoServer;
let createdBookId;
let server;

async function cleanupUploads() {
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  try {
    const files = await fs.readdir(uploadsDir);
    for (const file of files) {
      await fs.unlink(path.join(uploadsDir, file));
    }
    console.log('Cleaned up uploads directory');
  } catch (error) {
    console.error('Error cleaning up uploads directory:', error);
  }
}

beforeAll(async () => {
  // Create an in-memory MongoDB instance
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Connect to the in-memory database
  await connectToDatabase(mongoUri);
  console.log('Connected to in-memory MongoDB');

  // Start the server
  server = await startServer(0); // Use port 0 to get a random available port
  console.log(`Test server started on port ${server.address().port}`);
});

afterAll(async () => {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
    console.log('Test server closed');
  }
  if (mongoServer) {
    await mongoServer.stop();
    console.log('In-memory MongoDB stopped');
  }
  await cleanupUploads();
});

describe('Book API', () => {
  test('POST /api/upload-book - Upload a new book', async () => {
    console.log('Starting upload book test...');
    const response = await request(app)
      .post('/api/upload-book')
      .field('name', 'Test Book')
      .field('author', 'Test Author')
      .field('publishingDate', '2023-01-01')
      .field('rating', '4')
      .attach('file', 'tests/test-files/test.pdf');

    console.log('Upload response:', {
      status: response.status,
      headers: response.headers,
      body: response.body
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    createdBookId = response.body._id;
    console.log('Created book ID:', createdBookId);
  });

  test('GET /api/books/:id - Get a single book', async () => {
    if (!createdBookId) {
      console.log('Skipping test: createdBookId is undefined');
      return;
    }
    const response = await request(app).get(`/api/books/${createdBookId}`);
    
    console.log('Response status:', response.status);
    console.log('Response body:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id', createdBookId);
    expect(response.body).toHaveProperty('name', 'Test Book');
    expect(response.body).toHaveProperty('author', 'Test Author');
  });

  test('PUT /api/books/:id - Edit an existing book', async () => {
    if (!createdBookId) {
      console.log('Skipping test: createdBookId is undefined');
      return;
    }
    const response = await request(app)
      .put(`/api/books/${createdBookId}`)
      .send({ name: 'Updated Test Book' });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated Test Book');
  });

  test('GET /api/books - Get all books', async () => {
    // First, try to upload a book if there are no books
    if (!createdBookId) {
      const uploadResponse = await request(app)
        .post('/api/upload-book')
        .field('name', 'Test Book for GET')
        .field('author', 'Test Author')
        .field('publishingDate', '2023-01-01')
        .field('rating', '4')
        .attach('file', 'tests/test-files/test.pdf');
      
      console.log('Upload response for GET test:', uploadResponse.statusCode, uploadResponse.body);
    }

    const response = await request(app).get('/api/books');
    console.log('All books:', JSON.stringify(response.body, null, 2));
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('DELETE /api/books/:id - Delete a book and its files', async () => {
    if (!createdBookId) {
      console.log('Skipping test: createdBookId is undefined');
      return;
    }
    const response = await request(app).delete(`/api/books/${createdBookId}`);
    expect(response.statusCode).toBe(200);

    // Verify that the book has been deleted from the database
    const deletedBook = await Book.findById(createdBookId);
    expect(deletedBook).toBeNull();

    // Check if the response indicates successful deletion
    expect(response.body.message).toBe('Book and associated files deleted successfully');
  });

  // test('POST /api/upload-book - Upload with wrong file format', async () => {
  //   const testFilePath = path.join(__dirname, 'test.jpg');
  //   const response = await request(app)
  //     .post('/api/upload-book')
  //     .attach('file', testFilePath)
  //     .field('name', 'Test Book')
  //     .field('author', 'Test Author')
  //     .field('publishingDate', '2023-01-01')
  //     .field('rating', '4')
  //     .timeout(5000);

  //   expect(response.statusCode).toBe(400);
  //   expect(response.body).toHaveProperty('error');
  //   expect(response.body.error).toContain('Invalid file format');
  // }, 10000);

  test('POST /api/upload-book - Upload with incorrect data format', async () => {
    console.log('Starting upload book with incorrect data format test...');
    const response = await request(app)
      .post('/api/upload-book')
      .attach('file', 'tests/test-files/test.pdf')
      .field('name', 'Test Book')
      .field('author', 'Test Author')
      .field('publishingDate', 'invalid-date')
      .field('rating', 'invalid-rating');

    console.log('Upload response:', {
      status: response.status,
      headers: response.headers,
      body: response.body
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('Validation failed');
  });
});