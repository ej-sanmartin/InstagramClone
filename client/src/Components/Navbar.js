import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return(
    <nav>
    <div className="nav-wrapper white">
      <Link to="/" className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right">
        <li><Link to="/signup">Login</Link></li>
        <li><Link to="/login">Sign Up</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </div>
  </nav>
  );
}

export default NavBar;
