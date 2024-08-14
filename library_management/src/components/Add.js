import {React, useState} from 'react';
import axios from 'axios';
import './add.css'; // Import CSS for styling

const Add = ({ show, onClose }) => {
  const [bookId, setBookId] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{4}$/.test(bookId)) {
      alert('Book ID must be exactly 4 digits.');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5000/add', {
        bookId,
        title,
        author,
        status: status.toLowerCase(), // Ensure status is lowercase
      });

      if (response.data.success) {
        alert('Book added successfully');
        // Reset form fields after successful submission
        setBookId('');
        setTitle('');
        setAuthor('');
        setStatus('');
        onClose();
      } else {
        alert('Failed to add book');
      }
    } catch (error) {
      console.error('There was an error adding the book:', error);
    }
  };
  if (!show) return null; // Return null if the popup should not be displayed

  return (
    <div className="add-overlay">
      <div className="add-card">
        <h2>Add Book Detail</h2>
        <form>
          <div className="form-group">
            <label htmlFor="bookId">Book ID:</label>
            <input type="text" id="bookId" name="bookId" maxLength= "4" value={bookId} onChange={(e) => setBookId(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" value={title}
              onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author:</label>
            <input type="text" id="author" name="author" value={author}
              onChange={(e) => setAuthor(e.target.value)} required />
          </div>
          <div className="form-actions">
            <button type="button" className="quit-btn" onClick={onClose}>Quit</button>
            <button type="submit" className="submit-btn" onClick={handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
