import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const SignUp = () => {
  const history = useHistory();

  const emailChecker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [ name, setName ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ email, setEmail ] = useState("");
  const PostData = () => {
    if(!emailChecker.test(email)){
      return M.toast({
        html: "Invalid Email",
        classes: "#c62828 red darken-3"
      });
    }
    fetch('/signup', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
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
        M.toast({
          html: data.message,
          classes: "#43a047 green darken-1"
        });
        history.push('/login');
      }
    })
  }

  return(
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2 className="logo-font">Instagram</h2>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) =>setName(e.target.value)}
          />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) =>setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) =>setPassword(e.target.value)}
        />
      <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
              onClick={() => PostData()}
        >Sign Up</button>
        <p>
          <Link to="/login">Already have an account?</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
