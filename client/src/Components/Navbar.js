import React, { useContext, useRef, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import M from 'materialize-css';

const NavBar = () => {
  const searchModel = useRef(null);
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [ search, setSearch ] = useState('');
  const [ userDetails, setUserDetails ] = useState([]);

  useEffect(() => {
    M.Modal.init(searchModel.current)
  }, []);

  const renderList = () => {
    if(state){
      return [
        <li key="0"><i data-target="modal1" className="large material-icons modal-trigger" style={{ color: "black" }}>search</i></li>,
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

  const fetchUsers = (query) => {
    setSearch(query);
    fetch('/search-users', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query
      })
    })
    .then(res => res.json())
    .then(results => {
      setUserDetails(results.user);
    })
  }

  return(
    <nav>
    <div className="nav-wrapper white">
      <Link to={ state? "/" : "/login" } className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right">
        {renderList()}
      </ul>
    </div>
    <div id="modal1" className="modal" ref={searchModel} style={{ color: "black" }}>
      <div className="modal-content">
        <input
          type="text"
          placeholder="search users"
          value={search}
          onChange={(e) => fetchUsers(e.target.value)}
        />
        <ul className="collection">
          {userDetails.map(item => {
            return <Link to={item._id !== state._id ? "/profile/" + item._id : "/profile"} onClick={() => {
                M.Modal.getInstance(searchModel.current).close();
                setSearch("");
              }}><li className="collection-item">{item.email}</li></Link>
          })}
        </ul>
      </div>
      <div className="modal-footer">
        <button href="#!" class="modal-close waves-effect waves-green btn-flat" onClick={() => setSearch()}>Close</button>
      </div>
    </div>
  </nav>
  );
}

export default NavBar;
