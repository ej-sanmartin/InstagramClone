import React, { useState, useContext } from 'react';
import { UserContext } from '../App';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const Login = () => {
  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();

  const emailChecker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [ password, setPassword ] = useState("");
  const [ email, setEmail ] = useState("");
  const PostData = () => {
    if(!emailChecker.test(email)){
      return M.toast({
        html: "Invalid Email",
        classes: "#c62828 red darken-3"
      });
    }
    fetch('/signin', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password,
        email
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        M.toast({
          html: data.error,
          classes: "#c62828 red darken-3"
        });
      } else {
        localStorage.setItem("jwt", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch({ type: "USER", payload: data.user })
        M.toast({
          html: "Logged In",
          classes: "#43a047 green darken-1"
        });
        history.push('/');
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  return(
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2 className="logo-font">Instagram</h2>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) =>setPassword(e.target.value)}
          />
      <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
              onClick={() => PostData()}
      >Login</button>
          <p>
            <Link to="/signup">New around here?</Link>
          </p>
      </div>
    </div>
  );
}

export default Login;
