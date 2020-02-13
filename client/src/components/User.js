import React, { useState, useEffect } from "react";
import axios from "axios";


function User(props) {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${props.id}`)
      .then(res => {
        setUser(res.data);
        // console.log(res);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${props.id}/posts`)
      .then(res => {
        setPosts(res.data);
        // console.log(res);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div>
      <p>{user.name}</p>
      <h1>Posts</h1>
      {posts.map(post => {
          return <p>{post.text}</p>
      })}
    </div>
  );
}

export default User;
