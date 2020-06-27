import React from 'react';
import { Link } from 'react-router-dom'

const SignUp = () => {
  return(
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2 className="logo-font">Instagram</h2>
          <input
            type="text"
            placeholder="name"
          />
        <input
          type="text"
          placeholder="email"
        />
        <input
          type="text"
          placeholder="password"
        />
      <button className="btn waves-effect waves-light #64b5f6 blue darken-1">Sign Up</button>
        <p>
          <Link to="/login">Already have an account?</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
