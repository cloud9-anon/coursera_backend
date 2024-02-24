const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  // Write code to check if the username is valid
  // For example, you can check if it meets certain criteria
  return true; // Modify this based on your validation logic
};

const authenticatedUser = (username, password) => {
  // Write code to check if the username and password match the records
  // For example, you can compare them with the existing users array
  const user = users.find((user) => user.username === username && user.password === password);
  return !!user; // Return true if a matching user is found, else false
};

// Only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if the username is valid
  if (!isValid(username)) {
    return res.status(400).json({ message: "Invalid username" });
  }

  // Check if the username and password match the records
  if (!authenticatedUser(username, password)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate a JWT token for the authenticated user
  const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });

  // Include the token in the response
  return res.status(200).json({ token });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  // Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
