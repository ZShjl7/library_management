const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'library', // Replace with your MySQL database name
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(cors());
app.use(bodyParser.json());

// Secret key for JWT
const JWT_SECRET = 'idontknow';

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  connection.query(
    'SELECT * FROM login WHERE email = ?',
    [email],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const user = results[0];

      // Check password
        if (password == user.password) {
        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
      }
      else{
        return res.status(401).json({ message: 'Invalid credentials' });
      };
    }
  );
});

/* add */
app.post('/add', (req, res) => {
  const { bookId, title, author} = req.body;
  const status = 'available'; // Set default status to 'available'
  const query = 'INSERT INTO books (bookid, title, author, status) VALUES (?, ?, ?, ?)';

  connection.query(query, [bookId, title, author, status], (err, result) => {
    if (err) {
      console.error('Error adding book:', err);
      res.status(500).json({ success: false, message: 'Failed to add book' });
    } else {
      res.json({ success: true, message: 'Book added successfully' });
    }
  });
});

/* delete */ 
app.delete('/delete', (req, res) => {
  const bookId = req.body.bookId;

  // Check if the book is occupied
  connection.query('SELECT status FROM books WHERE bookid = ?', [bookId], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const book = results[0];
    if (book.status === 'occupied') {
      return res.status(400).json({ message: 'Book cannot be deleted because it is currently occupied' });
    }

    // Proceed with deletion if the book is available
    connection.query('DELETE FROM books WHERE bookid = ?', [bookId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Book not found' });
      }

      // Update the book_availability in books_issued table
      connection.query('UPDATE books_issued SET book_availability = "not available" WHERE bookid = ?', [bookId], (err) => {
        if (err) {
          console.error('Error updating books_issued:', err);
          return res.status(500).json({ error: err.message });
        }

        res.status(200).json({ success: true, message: 'Book deleted successfully' });
      });
    });
  });
});



/* view */
app.get('/view', (req, res) => {
  const viewquery = 'SELECT * FROM books';
  connection.query(viewquery, (err, result) => {
    if(err){
      return res.status(500).json({error: err.message});
    } else{
      return res.status(200).json(result)
    }
  });
});

/* issue */
app.post('/issue', (req, res) => {
  const { bookId, issuedTo } = req.body;

  if (!bookId || !issuedTo) {
    return res.status(400).json({ error: 'Book ID and Issued To are required' });
  }

  // Check if the book is available
  connection.query('SELECT * FROM books WHERE bookid = ?', [bookId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const book = results[0];

    if (book.status !== 'available') {
      return res.status(400).json({ error: 'Book is not available' });
    }

    // Check if the user has issued this book before
    connection.query('SELECT * FROM books_issued WHERE bookid = ? AND issuedto = ?', [bookId, issuedTo], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length > 0) {
        // User has issued this book before, increment the issue_count
        const previousIssue = results[0];
        const newIssueCount = previousIssue.issue_count + 1;

        connection.query('UPDATE books_issued SET issue_count = ?, status = ?, book_availability = ? WHERE bookid = ? AND issuedto = ?', [newIssueCount, 'held', 'available', bookId, issuedTo], (err) => {
          if (err) return res.status(500).json({ error: err.message });

          // Update book status
          connection.query('UPDATE books SET status = ? WHERE bookid = ?', ['occupied', bookId], (err) => {
            if (err) return res.status(500).json({ error: err.message });

            res.status(200).json({ message: `Book reissued successfully. You have issued this book ${newIssueCount} times.` });
          });
        });
      } else {
        // First time issuing this book
        connection.query('INSERT INTO books_issued (bookid, issuedto, status, book_availability, issue_count) VALUES (?, ?, ?, ?, ?)', [bookId, issuedTo, 'held', 'available', 1], (err) => {
          if (err) return res.status(500).json({ error: err.message });

          // Update book status
          connection.query('UPDATE books SET status = ? WHERE bookid = ?', ['occupied', bookId], (err) => {
            if (err) return res.status(500).json({ error: err.message });

            res.status(200).json({ message: 'Book issued successfully.' });
          });
        });
      }
    });
  });
});

/* return */ 
app.post('/return', (req, res) => {
  const { bookId } = req.body;

  if (!bookId) {
    return res.status(400).json({ error: 'Book ID is required' });
  }

  // Update the status in books_issued to 'returned'
  connection.query('UPDATE books_issued SET status = ?, book_availability = ? WHERE bookid = ?', ['returned', 'available', bookId], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Update the status in books to 'available'
    connection.query('UPDATE books SET status = ? WHERE bookid = ?', ['available', bookId], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(200).json({ message: 'Book returned successfully' });
    });
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
