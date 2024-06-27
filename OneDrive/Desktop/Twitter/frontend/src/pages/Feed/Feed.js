import React, { useEffect, useState } from "react";
import "../../page.css";

import TweetBox from "./TweetBox";
import Post from "./Post";

const Feed = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/post", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setPost(data);
      });
  });
  return (
    <div className="page">
      <h1 className="page-title">Home</h1>
      <TweetBox />
      <div
        style={{ width: "100%", overflow: "scroll", objectFit: "contain" }}
        className="posted_Data"
      >
        {post.map((data, index) => {
          return <Post key={index} data={data}></Post>;
        })}
      </div>
    </div>
  );
};

export default Feed;
