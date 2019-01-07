import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Header.css';

const Header = () => {
  return(
    <div className="App-header">
      <Link className="link" to="/">Sign In</Link>
      <Link className="link" to="/search">Search</Link>
      <Link className="link" to="/Logout">Logout</Link>
    </div>
  )
}

export default Header;