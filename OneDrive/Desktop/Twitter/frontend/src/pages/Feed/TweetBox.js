import { Avatar, Button } from "@mui/material";
import React, { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "axios";
import "./TweetBox.css";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import useHooks from "../Hooks/useHooks";

const TweetBox = () => {
  const [user] = useAuthState(auth);
  const [post, setPost] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  // const [profile, setProfile] = useState("");
  // console.log(user.email);
  const gmail = user.email;
  // console.log(user.providerData[0].providerId==='password');

  //set Profile
  const [loggedUser] = useHooks();
  const userProfileImage = loggedUser.profileImage
    ? loggedUser.profileImage
    : "https://images.unsplash.com/photo-1464863979621-258859e62245?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const handleTweet = (e) => {
    e.preventDefault();
    if (user.providerData[0].providerId === "password") {
      fetch(`http://localhost:5000/logged?email=${gmail}`)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setEmail(data.email);
          setName(data.name);
          setUsername(data.email.split("@")[0]);
        });
    } else {
      setEmail(user.email);
      setName(user.displayName);
      setUsername(user.email.split("@")[0]);
    }
    if (!post || !imageUrl) {
      return alert("Please Add All Fields");
    }
    if (name) {
      fetch("http://localhost:5000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: post,
          content: imageUrl,
          username: username,
          name: name,
          email: email,
          profile: userProfileImage,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            alert(data.message);
          } else {
            alert(data.error);
          }
        });
    }
  };

  // Handle the image Uploading for the URL
  const handleImageUploading = (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      const formData = new FormData();
      formData.set("image", image);
      //let create a api to Upload the image
      axios
        .post(
          "https://api.imgbb.com/1/upload?key=bb4204e97ced7db982cc64e2cbd65db8",
          formData
        )
        .then((res) => {
          setImageUrl(res.data.data.display_url);
        });
    }
  };

  return (
    <div className="tweetBox">
      <form className="form-Element" onSubmit={handleTweet}>
        <div className="tweetBox_input">
          <Avatar></Avatar>
          <input
            type="text"
            className="tweetBox_inputText"
            placeholder="What's Happening?"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
        </div>
        <div className="imageIcon_tweetButton">
          <label htmlFor="image" className="imageIcon">
            <AddPhotoAlternateIcon
              className="imageIcon-btn"
              style={{ color: "aqua", cursor: "pointer" }}
            />
          </label>
          <input
            type="file"
            id="image"
            className="imageInput"
            onChange={handleImageUploading}
          />
          <Button
            variant="outlined"
            className="tweetButton"
            style={{
              backgroundColor: "rgba(10%,11%,60%,1)",
              color: "white",
              fontWeight: "600",
              fontSize: "14px",
            }}
            type="submit"
          >
            Tweet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TweetBox;
