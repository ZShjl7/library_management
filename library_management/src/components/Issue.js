import {React, useState} from 'react';
import axios from 'axios';
import './issue.css'; // Import CSS for styling

const Issue = ({ show, onClose }) => {
  const [bookId, setBookId] = useState('');
  const [issuedTo, setIssuedTo] = useState('');
  const [message, setMessage] = useState('');

  if (!show) return null; // Return null if the popup should not be displayed
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/issue', { bookId, issuedTo });
      alert(response.data.message);
      setBookId("");
      setIssuedTo("");
      onClose();
    } catch (error) {
      setMessage(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="issue-overlay">
      <div className="issue-card">
        <h2>Issue Book</h2>
        <form >
          <div className="form-group">
            <label htmlFor="bookId">Book ID:</label>
            <input type="text" id="bookId" name="bookId" value={bookId} onChange={(e) => setBookId(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="issuedTo">Issued To:</label>
            <input type="text" id="issuedTo" name="issuedTo" value={issuedTo}
              onChange={(e) => setIssuedTo(e.target.value)} required />
          </div>
          <div className="form-actions">
            <button type="button" className="quit-btn" onClick={onClose}>Quit</button>
            <button type="submit" className="issue-btn" onClick={handleSubmit}>Issue</button>
          </div>
          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Issue;
