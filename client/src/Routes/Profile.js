import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App';

const Profile = () => {
  const [ mypics, setPics ] = useState([])
  const { state, dispatch } = useContext(UserContext);

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

  return(
    <section style={{ maxWidth: "550px", margin: "0 auto" }}>
      <div style={{
          display: "flex",
          justifyContent: "space-around",
          margin: "2em 0",
          borderBottom: "1px solid grey"
        }}>
        <div>
          <img alt="Profile" style={{ width: "160px", height: "160px", borderRadius: "80px" }}
            src={state ? state.pic : "...loading"}
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
