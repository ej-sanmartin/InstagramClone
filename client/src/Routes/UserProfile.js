import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../App';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const [ userProfile, setUserProfile ] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const { userid } = useParams();

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    })
    .then(res => res.json())
    .then(result => {
      setUserProfile(result);
    })
  }, []);

  const followUser = () => {
    fetch('/follow', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        followId: userid
      })
    })
    .then(res => res.json())
    .then(data => {
      dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } });
      localStorage.setItem("user", JSON.stringify(data));
      setUserProfile((prevState) => {
        return {
          ...prevState,
          user: data
        }
      })
    })
  }

  return(
    <>
    { userProfile ?

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
            <h4>{ userProfile.user.name }</h4>
            <h4>{ userProfile.user.email }</h4>
            <div style={{ display: "flex", justifyContent: "space-between", width: "110%" }}>
              <h6>{ userProfile.posts.length } Posts</h6>
              <h6>{ userProfile.user.followers.length } Followers</h6>
              <h6>{ userProfile.user.following.length } Following</h6>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={() => followUser()}
            >Follow</button>
          </div>
        </div>
        <div className="gallery">
          {
            userProfile.posts.map(item => {
              return(
                <img key={item._id} alt={item.title} className="item" src={item.photo} />
              );
            })
          }
        </div>
      </section>

    : <h2>Loading...</h2>}
    </>
  );
}

export default UserProfile;
