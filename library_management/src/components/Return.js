import {React, useState} from 'react';
import axios from 'axios';
import './delete.css'; // Import CSS for styling

const Return = ({ show, onClose }) => {
  const [bookId, setBookId] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/return', { bookId });

      if (response.data.message) {
        alert('Book returned successfully');
        setBookId(''); // Clear the input field
        onClose(); // Close the popup
      } 
    } catch (error) {
      console.error('There was an error returning the book:', error);
      alert('Failed to return the book');
    }
  };
  if (!show) return null; // Return null if the popup should not be displayed

  return (
    <div className="delete-overlay">
      <div className="delete-card">
        <h2>Return Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="bookId">Book ID:</label>
            <input type="text" id="bookId" name="bookId" value={bookId}
              onChange={(e) => setBookId(e.target.value)} required />
          </div>
          <div className="form-actions">
            <button type="button" className="quit-btn" onClick={onClose}>Quit</button>
            <button type="submit" className="submit-btn" >Return</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Return;
