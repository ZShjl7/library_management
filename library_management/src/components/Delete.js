import {React, useState} from 'react';
import axios from 'axios';
import './delete.css'; // Import CSS for styling

const Delete = ({ show, onClose }) => {
  const [bookId, setBookId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/^\d{4}$/.test(bookId)) {
      alert('Book ID must be exactly 4 digits.');
      return;
    }
    
    try {
      const response = await axios.delete('http://localhost:5000/delete', {
        data: { bookId },
      });
      if (response.data.success) {
        alert('Book deleted successfully');
        // Reset form fields after successful submission
        setBookId('');
        onClose();
      } 
    } catch (error) {
      console.error('There was an error deleting the book:', error);
      alert('Fail to delete the  because it is occupied');
    }
  };

  if (!show) return null; // Return null if the popup should not be displayed

  return (
    <div className="delete-overlay">
      <div className="delete-card">
        <h2>Delete Book</h2>
        <form>
          <div className="form-group">
            <label htmlFor="bookId">Book ID:</label>
            <input type="text" id="bookId" name="bookId" onChange={(e)=> setBookId(e.target.value)} value={bookId} required />
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

export default Delete;
