const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory array to store books
let books = [];
let nextId = 1;

// GET /books – Return all books
app.get('/books', (_req, res) => {
  res.json(books);
});

// POST /books – Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  const newBook = {
    id: nextId++,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id – Update a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// GET /books/:id – Get a book by ID
app.get('/books/:id', (req, res) => { 
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  res.json(book);
})

// DELETE /books/:id – Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const deletedBook = books.splice(index, 1)[0];
  res.json(deletedBook);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
