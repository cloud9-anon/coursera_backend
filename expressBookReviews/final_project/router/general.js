const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const jwt = require('jsonwebtoken');

// Register Route
// Register Route
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Validate if the username is unique
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Add the new user to the users array
  users.push({ username, password });

  // Generate a JWT token for the newly registered user
  const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });

  return res.status(200).json({ message: "Registration successful", token });
});

// Get Book List Route
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Get Book Details by ISBN Route
public_users.get("/:isbn", (req, res) => {
  const isbn = req.params.isbn;

  // Retrieve the book using the provided ISBN
  const book = books[isbn];

  // Check if the book exists
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.status(200).json(book);
});

// Get Book Details by Author Route
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const booksByAuthor = books.filter(b => b.author === author);

  if (booksByAuthor.length === 0) {
    return res.status(404).json({ message: "No books found for the author" });
  }

  return res.status(200).json(booksByAuthor);
});

// Get All Books by Title Route
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const booksByTitle = books.filter(b => b.title === title);

  if (booksByTitle.length === 0) {
    return res.status(404).json({ message: "No books found with the title" });
  }

  return res.status(200).json(booksByTitle);
});

// Get Book Review Route
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books.find(b => b.isbn === isbn);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const review = book.review || "No reviews available";

  return res.status(200).json({ review });
});

module.exports.general = public_users;
