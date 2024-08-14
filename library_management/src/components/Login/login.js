import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; // Import CSS file for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const { token } = response.data;
      console.log(token)
      
      // Store the token (e.g., in localStorage)
      localStorage.setItem('token', token);
    

      // Redirect to the home page
      window.location.href = '/home';
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email" className='logintext'>Email ID:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="xyz@gmail.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className='logintext'>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="----------"
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="form-actions">
            <button type="submit" className="login-btn">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
