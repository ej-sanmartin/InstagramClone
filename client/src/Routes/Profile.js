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
            src="https://images.unsplash.com/photo-1515463892140-58a22e37ff72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=820&q=80"
          />
        </div>
        <div>
          <h4>{ state ? state.name : "Loading.." }</h4>
          <div style={{ display: "flex", justifyContent: "space-between", width: "110%" }}>
            <h6>127 Posts</h6>
            <h6>4587 Followers</h6>
            <h6>120 Following</h6>
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
