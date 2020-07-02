import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App';

const Profile = () => {
  const [ mypics, setPics ] = useState([])
  const { state, dispatch } = useContext(UserContext);
  const [ image, setImage ] = useState("");

  useEffect(() => {
    fetch('/myposts', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(res => res.json())
    .then(result => {
      setPics(result.myPost);
    })
  }, [])

  useEffect(() => {
    if(image){
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
        fetch('/updatepic', {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
          body: JSON.stringify({
            pic: data.url
          })
        })
        .then(res => res.json())
        .then(result => {
          console.log(result);
          localStorage.setItem("user", JSON.stringify({ ...state, pic: data.pic }));
          dispatch({ type: "UPDATEPIC", payload: result.pic });
        })
      })
      .catch(err => {
        console.log(err);
      })
    }
  }, [image]);

  const UpdatePhoto = (file) => {
    setImage(file);
  }

  return(
    <section style={{ maxWidth: "550px", margin: "0 auto" }}>
      <div style={{
          margin: "2em 0",
          borderBottom: "1px solid grey"
        }}>
        <div style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "2em 0",
            borderBottom: "1px solid grey"
          }}>
          <div>
            <img alt="Profile" style={{ width: "160px", height: "160px", borderRadius: "80px" }}
              src={ state ? state.pic : "loading" }
            />
          </div>
          <div>
            <h4>{ state ? state.name : "Loading.." }</h4>
            <h5>{ state ? state.email : "Loading.." }</h5>
            <div style={{ display: "flex", justifyContent: "space-between", width: "110%" }}>
              <h6>{ mypics.length } Posts</h6>
              <h6>{ state ? state.followers.length : "0" } Followers</h6>
              <h6>{ state ? state.following.length : "0" } Following</h6>
            </div>
          </div>
        </div>
          <div className="file-field input-field" style={{ margin: "10px" }}>
            <div className="btn #64b5f6 blue darken-1">
              <span>Update Pic</span>
              <input type="file" onChange={(e) => UpdatePhoto(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </div>
      <div className="gallery">
        {
          mypics.map(item => {
            return(
              <img key={item._id} alt={item.title} className="item" src={item.photo} />
            );
          })
        }
      </div>
    </section>
  );
}

export default Profile;
