import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const SignUp = () => {
  const history = useHistory();

  const emailChecker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [ name, setName ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ image, setImage ] = useState("");
  const [ url, setUrl ] = useState(undefined);

  useEffect(() => {
    if(url){
      uploadFields();
    }
  }, [url]);

  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "instagramClone");
    data.append("cloud_name", "dngusdtwg");
    fetch("	https://api.cloudinary.com/v1_1/dngusdtwg/image/upload", {
      method: "post",
      body: data
    })
    .then(res => res.json())
    .then(data => {
      setUrl(data.secure_url);
    })
    .catch(err => {
      console.log(err);
    })
  }

  const uploadFields = () => {
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
        email,
        pic: url
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

  const PostData = () => {
    if(image){
      uploadPic();
    } else {
      uploadFields();
    }
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
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) =>setPassword(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn #64b5f6 blue darken-1">
            <span>Upload Pic</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
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
