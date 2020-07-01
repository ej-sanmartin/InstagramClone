import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();

  const renderList = () => {
    if(state){
      return [
        <li key="1"><Link to="/profile">Profile</Link></li>,
        <li key="2"><Link to="/create">Create Post</Link></li>,
        <li key="3"><Link to="/subscriptions">Subscriptions</Link></li>,
        <li key="4">
          <button
              className="btn #c62828 red darken-3"
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "CLEAR" });
                history.push('/login');
              }}
          >Log Out</button>
        </li>
      ];
    } else {
      return [
        <li key="5"><Link to="/signup">Sign Up</Link></li>,
        <li key="6"><Link to="/login">Login</Link></li>
      ];
    }
  }

  return(
    <nav>
    <div className="nav-wrapper white">
      <Link to={ state? "/" : "/login" } className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right">
        {renderList()}
      </ul>
    </div>
  </nav>
  );
}

export default NavBar;
