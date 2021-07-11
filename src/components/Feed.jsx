import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {

    const fetchingPosts = async () => {
    
      const res = username
    
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/" + user._id);
      
        setPosts(
        res.data.sort((param1, param2) => {
          return new Date(param2.createdAt) - new Date(param1.createdAt);
        })
      );
    };
    fetchingPosts();
  }, [username, user._id]);

  return (
    <div className="feed">

      <div className="feedWraping">
      
        {(!username || username === user.username) && <Share />}
      
        {posts.map((po) => (
          <Post key={po._id} post={po} />
        ))}
      
      </div>
    </div>
  );
}