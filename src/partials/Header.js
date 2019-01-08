import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Header.css';

const Header = () => {
  const handleLogout = () => {
    localStorage.setItem('userName', '')
    localStorage.setItem('userUrl', '')
  }

  return(
    <div className="App-header">
      {
        !localStorage.getItem('userName') && <Link className="link" to="/">Sign In</Link>
      }
      {
        localStorage.getItem('userName') && <Link className="link" to="/search">Search</Link>
      }
      {
        localStorage.getItem('userName') && <Link className="link" to='/' onClick={handleLogout}>Logout</Link>
      }

    </div>
  )
}

export default Header;