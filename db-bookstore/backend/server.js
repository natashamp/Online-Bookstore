// Backend for Online Bookstore (Node.js + Express.js)

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'gYx1fz010903?',
  database: process.env.DB_NAME || 'Bookstore'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database...');
});

// API Endpoint to fetch all books
app.get('/bookstore/books', (req, res) => {
  db.query('SELECT * FROM Books', (err, results) => { // Fetch all columns
    if (err) {
      console.error('Error fetching books:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// API Endpoint to handle login
app.post('/bookstore/userAccounts/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM UserAccounts WHERE Username = ? AND Password = ?', [username, password], (err, results) => {
    if (err) {
      console.error('Error fetching user account:', err);
      res.status(500).send('Server error');
    } else if (results.length === 0) {
      res.status(401).send('Invalid username or password');
    } else {
      res.json(results[0]);
    }
  });
});

// API Endpoint to fetch a specific user by ID
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  db.query('SELECT * FROM Users WHERE UserID = ?', [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results[0]);
    }
  });
});

// API Endpoint to fetch all orders
app.get('/bookstore/orders', (req, res) => {
  db.query('SELECT * FROM Orders', (err, results) => { // Fetch all columns
    if (err) {
      console.error('Error fetching orders:', err);
      res.status(500).send('Server error');
    } else {
      res.json(results);
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});