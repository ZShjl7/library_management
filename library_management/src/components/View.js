import React, { useEffect, useState } from 'react';
import './view.css'; // Import CSS file for styling

const View = ({ show, onClose }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (show) {
      fetch('http://localhost:5000/view')
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error('Error fetching books:', error));
    }
  }, [show]);

  if (!show) return null; // Return null if the popup should not be displayed

  return (
    <div className="view-overlay">
      <div className="view-card">
        <h2>View Books</h2>
        <table className="books-table">
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.bookid}>
                <td>{book.bookid}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="form-actions">
          <button type="button" className="quit-btn" onClick={onClose}>Quit</button>
        </div>
      </div>
    </div>
  );
};

export default View;
