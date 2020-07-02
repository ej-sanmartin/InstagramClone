import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const Reset = () => {
  const history = useHistory();

  const emailChecker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [ email, setEmail ] = useState("");
  const PostData = () => {
    if(!emailChecker.test(email)){
      return M.toast({
        html: "Invalid Email",
        classes: "#c62828 red darken-3"
      });
    }
    fetch('/reset-password', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
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
      <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
              onClick={() => PostData()}
      >Reset Password</button>
      </div>
    </div>
  );
}

export default Reset;
