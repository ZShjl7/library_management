import {React, useState} from 'react';
import './all.css'; // Import CSS file for styling

const Navbar = () => {
  const [toggle, settoggle] = useState(localStorage.getItem('token'))
  const logout = () =>{
    localStorage.removeItem('token')
    settoggle("")
    window.location.href = "/"
  }
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">Oxfo Library</span>
      </div>
      <div className="navbar-right">
       {toggle?<button className="navbar-login" onClick={logout}>Logout</button>:<a href= '/'><button className="navbar-login">Login</button></a>}
      </div>
    </nav>
  );
};

export default Navbar;
